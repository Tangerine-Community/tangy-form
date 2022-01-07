import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../style/tangy-common-styles.js'
import '../style/tangy-element-styles.js'
import '@polymer/iron-icon/iron-icon.js'
import '@polymer/paper-button/paper-button.js'
import { TangyInputBase } from '../tangy-input-base.js'


    /**
     * `tangy-checkbox`
     *
     *
     * @customElement
     * @polymer
     * @demo demo/index.html
     */
export class TangyPhotoCapture extends TangyInputBase {
  static get template () {
    return html`
    <style include="tangy-common-styles"></style>
    <style include="tangy-element-styles"></style>
    <style>
      img {
        width: 100%;
      }
      .hint-text{
        margin-top:6px;
        margin-left:4px;
      }
    </style>
    <div class="flex-container m-y-25">
      <div id="qnum-number"></div>
      <div id="qnum-content">
        <img id="image"/>
        <paper-button on-click="capturePhoto"><iron-icon icon="camera-enhance"></iron-icon> capture photo </paper-button>
        <label class="hint-text"></label>
        <div id="error-text"></div>
        <div id="warn-text"></div>
        <div id="discrepancy-text"></div>
      </div>
    </div>
    `
  }

  static get is() {
    return 'tangy-photo-capture'
  }

  static get properties() {
    return {
      name: {
        type: String,
        value: ''
      },
      hintText: {
        type: String,
        observer: 'onHintTextChange',
        value: ''
      },
      errorText: {
        type: String,
        value: ''
      },
      private: {
        type: Boolean,
        value: false
      },
      disabled: {
        type: Boolean,
        value: false,
        observer: 'onDisabledChange',
        reflectToAttribute: true
      },
      hasWarning: {
        type: Boolean,
        value: false,
        observer: 'onWarnChange',
        reflectToAttribute: true
      },
      hasDiscrepancy: {
        type: Boolean,
        value: false,
        observer: 'onDiscrepancyChange',
        reflectToAttribute: true
      },
      hidden: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      skipped: {
        type: Boolean,
        value: false,
        observer: 'onSkippedChange',
        reflectToAttribute: true
      },
      invalid: {
        type: Boolean,
        value: false,
        observer: 'onInvalidChange',
        reflectToAttribute: true
      },
      incomplete: {
        type: Boolean,
        value: true,
        reflectToAttribute: true
      },
      value: {
        type: String,
        value: ''
      },
      warnText: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      discrepancyText: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      identifier: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
     }
  }

  connectedCallback () {
    super.connectedCallback()
    navigator.mediaDevices.getUserMedia({video: true})
      .then(mediaStream => this.gotMedia(mediaStream))
      .catch(error => console.error('getUserMedia() error:', error));
    this.shadowRoot.querySelector('#qnum-number').innerHTML = this.hasAttribute('question-number') 
      ? `<label>${this.getAttribute('question-number')}</label>`
      : ''
  }

  onHintTextChange(value) {
    this.shadowRoot.querySelector('.hint-text').innerHTML = value
  }

  onInvalidChange(value) {
    this.shadowRoot.querySelector('#error-text').innerHTML = this.invalid
      ? `<iron-icon icon="error"></iron-icon> <div> ${ this.hasAttribute('error-text') ? this.getAttribute('error-text') : ''} </div>`
      : ''
  }

  validate() {
    if (this.hasAttribute('required') && !this.value) {
      this.invalid = true
      return false
    } else {
      this.invalid = false
      return true
    }
  }
  
  gotMedia(mediaStream) {
    const mediaStreamTrack = mediaStream.getVideoTracks()[0];
    this.imageCapture = new ImageCapture(mediaStreamTrack);
  }    

  async capturePhoto() {
    let blob = await this.imageCapture.takePhoto()
    this.value = btoa(blob)
    this.$.image.src = URL.createObjectURL(blob);
    this.$.image.onload = () => { URL.revokeObjectURL(this.src); }
  }

  downscaleImage(dataUrl, newWidth, imageType, imageArguments) {
    var image, oldWidth, oldHeight, newHeight, canvas, ctx, newDataUrl;

    // Provide default values
    imageType = imageType || "image/jpeg";
    imageArguments = imageArguments || 0.7;

    // Create a temporary image so that we can compute the height of the downscaled image.
    image = new Image();
    image.src = dataUrl;
    oldWidth = image.width;
    oldHeight = image.height;
    newHeight = Math.floor(oldHeight / oldWidth * newWidth)

    // Create a temporary canvas to draw the downscaled image on.
    canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Draw the downscaled image on the canvas and return the new data URL.
    ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
    newDataUrl = canvas.toDataURL(imageType, imageArguments);
    return newDataUrl;
  }

  onDiscrepancyChange(value) {
    this.shadowRoot.querySelector('#discrepancy-text').innerHTML = this.hasDiscrepancy
      ? `<iron-icon icon="flag"></iron-icon> <div> ${ this.hasAttribute('discrepancy-text') ? this.getAttribute('discrepancy-text') : ''} </div>`
      : ''
  }

  onWarnChange(value) {
    this.shadowRoot.querySelector('#warn-text').innerHTML = this.hasWarning
      ? `<iron-icon icon="warning"></iron-icon> <div> ${ this.hasAttribute('warn-text') ? this.getAttribute('warn-text') : ''} </div>`
      : ''
  }

  onSkippedChange(newValue, oldValue) {
    if (newValue === true) {
      this.value = this.constructor.properties.value.value
    }
  }

}
window.customElements.define(TangyPhotoCapture.is, TangyPhotoCapture)
