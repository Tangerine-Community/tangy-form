import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
// @todo Make an ES6 compatible build of jsQR. https://github.com/cozmo/jsQR/issues/111
//import jsQR from "./jsQR/index.js";
/**
 * `tangy-scan`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TangyQr extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        
        #canvas {
          width:100%;
          border-color: black;
          border-style: solid;
          border-width: 5px;
        }
        :host([just-found-data]) #canvas {
          border-color: red;
        }
        :host([hide-output]) #output {
          display:none;
        }
      </style>
      <div id="loadingMessage">🎥 Unable to access video stream (please make sure you have a webcam enabled)</div>
      <canvas id="canvas" hidden></canvas>
      <div id="output">
      </div>
    `;
  }
  static get properties() {
    return {
      name: {
        type: String,
        value: ''
      },
      value: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      justFoundData: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      scanning: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      hideOutput: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    };
  }

  connectedCallback() {
    super.connectedCallback()
    this.scan()
    this.addEventListener('click', () => {
      if (!this.scanning) {
        this.value = ''
        this.shadowRoot.querySelector("#output").innerText = ''
        this.scan()
      }
    })
  }

  scan() {
    this.scanning = true

    var video = document.createElement("video");
    var canvasElement = this.shadowRoot.querySelector("canvas");
    var canvas = canvasElement.getContext("2d");
    var loadingMessage = this.shadowRoot.querySelector("#loadingMessage");
    var outputContainer = this.shadowRoot.querySelector("#output");

    function drawLine(begin, end, color) {
      canvas.beginPath();
      canvas.moveTo(begin.x, begin.y);
      canvas.lineTo(end.x, end.y);
      canvas.lineWidth = 4;
      canvas.strokeStyle = color;
      canvas.stroke();
    }

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.play();
      requestAnimationFrame(tick);
    });

    const component = this
    function tick() {
      loadingMessage.innerText = "⌛ Loading video..."
      if (component.value) {
        return video.srcObject.getTracks()[0].stop()
      }
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        loadingMessage.hidden = true;
        canvasElement.hidden = false;

        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
          drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
          drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
          drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
          if (component.value !== code.data) {
            outputContainer.innerText = code.data;
            component.value = code.data
            component.dispatchEvent(new Event('change'))
            component.justFoundData = true
            component.scanning = false
            setTimeout(() => {
              component.justFoundData = false
            }, 100)
            console.log('change')
          }

        } 
      }
      requestAnimationFrame(tick);
    }
  }
}

window.customElements.define('tangy-qr', TangyQr);
