import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
// Note this is a custom build and publish because what the maintainer of this library was publishing didn't work for a Polymer project. See issue for updates https://github.com/zxing-js/library/issues/139
import { BrowserMultiFormatReader } from 'zxing-js-es6/es6';
import '@polymer/paper-input/paper-textarea.js'
import '@polymer/polymer/lib/elements/dom-if.js';
import '../style/tangy-common-styles.js'
import '../style/tangy-element-styles.js'
import '@polymer/iron-icon/iron-icon.js'
import '@polymer/iron-icons/image-icons.js'
import { t } from '../util/t.js'
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

      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <style>
        :host {
          display: block;
        }
        
        #canvas {
          width:100%;
          border-color: black;
          border-style: solid;
          border-width: 0px;
        }
        :host([just-found-data]) #canvas {
          border-color: red;
        }
        :host([hide-output]) #output {
          display:none;
        }
        label {
          display: block;
          font-size: 1.2em;
          margin-bottom: 15px;
          color: var(--primary-text-color);
          margin-bottom: 15px;
        }
        #scan-icon, #container, #canvans {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      </style>
    <div class="flex-container m-y-25">
      <div id="qnum-number"></div>
      <div id="qnum-content">
    
        <label id="label"></label>
        <paper-card>
            <div class="card-content">
            <div id="container">
                <iron-icon id="scan-icon" icon="image:center-focus-weak"></iron-icon>
            </div>
            <paper-textarea value="[[value]]" placeholder="[[statusMessage]]" id="output" readonly></paper-textarea>
            </div>
            <div class="card-actions">
            <template is="dom-if" if="{{notScanning}}">
                <paper-button id="start-scan-button" on-click="startScanning">{{t.scan}}</paper-button>
            </template>
            <template is="dom-if" if="{{isScanning}}">
                <paper-button id="stop-scan-button" on-click="stopScanning">{{t.cancel}}</paper-button>
            </template>
            </div>
        </paper-card>
        <label class="hint-text"></label>
        <div id="error-text"></div>
      </div>
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
      isScanning: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      notScanning: {
        type: Boolean,
        value: true,
        reflectToAttribute: true
      },
      required: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      invalid: {
        type: Boolean,
        value: false,
        observer: 'onInvalidChange',
        reflectToAttribute: true
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      statusMessage: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      label: {
        type: String,
        value: '',
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
    this.t = {
      'scan': t('scan'),
      'scanning': t('scanning'),
      'cancel': t('cancel')

    }
    this.shadowRoot.querySelector('.hint-text').innerHTML = this.hasAttribute('hint-text')
        ? this.getAttribute('hint-text')
        : ''
    this.shadowRoot.querySelector('#label').innerHTML = this.hasAttribute('label')
        ? this.getAttribute('label')
        : ''
    this.shadowRoot.querySelector('#qnum-number').innerHTML = this.hasAttribute('question-number') 
      ? `<label>${this.getAttribute('question-number')}</label>`
      : ''
  }

  onInvalidChange(value) {
    this.shadowRoot.querySelector('#error-text').innerHTML = this.invalid && this.hasAttribute('error-text')
      ? `<iron-icon icon="error"></iron-icon> <div> ${this.getAttribute('error-text')} </div>`
      : ''
  }

  stopScanning() {
    this.statusMessage = ""
    this.notScanning = true
    this.isScanning = false
    this.dispatchEvent(new CustomEvent('cancel'))
  }

  startScanning() {
    this.value = ''
    this.statusMessage = `${this.t.scanning}...`
    this.notScanning = false 
    this.isScanning = true
    this.$.container.innerHTML = `
      <canvas id="canvas"></canvas>
    `
    var video = document.createElement("video");
    var canvasElement = this.shadowRoot.querySelector("canvas");
    var canvas = canvasElement.getContext("2d");

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
    async function tick() {
      if (component.value) {
        return video.srcObject.getTracks()[0].stop()
      }
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        //var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const imageEl = document.createElement('img')
        imageEl.setAttribute('src', canvasElement.toDataURL())
        const codeReader = new BrowserMultiFormatReader();
        try {
          const result = await codeReader.decodeFromImageElement(imageEl)
          drawLine(result.resultPoints[0], result.resultPoints[1], "#FF3B58");
          drawLine(result.resultPoints[1], result.resultPoints[2], "#FF3B58");
          drawLine(result.resultPoints[2], result.resultPoints[3], "#FF3B58");
          drawLine(result.resultPoints[3], result.resultPoints[0], "#FF3B58");
          if (component.value !== result.text) {
            component.value = result.text 
            component.stopScanning()
            component.dispatchEvent(new Event('change'))
          }
        } catch (e) {
          // No result yet...
        }
      }
      if (component.isScanning) {
        requestAnimationFrame(tick);
      }
    }
    this.dispatchEvent(new CustomEvent('scanning'))
  }

  validate() {
    if (this.required && !this.value) {
      this.invalid = true
      return false
    } else {
      this.invalid = false
      return true
    } 
  }
}

window.customElements.define('tangy-qr', TangyQr);