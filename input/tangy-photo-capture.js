import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { t } from '../util/t.js'
import '../style/tangy-common-styles.js'
import '../style/tangy-element-styles.js'
import '@polymer/iron-icon/iron-icon.js'
import '@polymer/paper-button/paper-button.js'

import ImageBlobReduce from 'image-blob-reduce'

    /**
     * `tangy-photo-capture`
     *
     *
     * @customElement
     * @polymer
     * @demo demo/index.html
     */
export class TangyPhotoCapture extends PolymerElement {

  static get template () {
    return html`
    <style include="tangy-common-styles"></style>
    <style include="tangy-element-styles"></style>

    <style>
      video,img {
        width: 100%;
      }

      .hint-text{
        margin-top:6px;
        margin-left:4px;
      }

      #buttons {
        margin: 15px 0px;
      }

      paper-button {
        background-color: var(--accent-color, #CCC);
      }

      paper-button[disabled] {
        opacity: .2;
      }
    </style>
    <div class="flex-container m-y-25">
      <div id="qnum-number"></div>
      <div id="qnum-content">
        <label id="label"></label>
        <div>
          <video autoplay id="video"></video>
          <img src="[[value]]" style='display:none' id="image"/>
        </div>
        <div id="buttons">
          <paper-button id="capture-button" on-click="capturePhoto"><iron-icon icon="camera-enhance"></iron-icon> [[t.capture]] </paper-button>
          <paper-button id="accept-button" on-click="acceptPhoto" disabled><iron-icon icon="done"></iron-icon> [[t.accept]] </paper-button>
          <paper-button id="toggle-button" on-click="toggleCamera"><iron-icon icon="image:switch-camera"></iron-icon> [[t.switch]] </paper-button>
          <paper-button id="clear-button" on-click="clearPhoto" disabled><iron-icon icon="delete"></iron-icon> [[t.clear]] </paper-button>
        </div>


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
      maxSizeInKb: {
        type: Number,
        value: 256,
        reflectToAttribute: true
      },
      label: {
        type: String,
        observer: 'reflect',
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
      },
      front: {
        type: Boolean,
        value: true,
        reflectToAttribute: true
      },
     }
  }

  connectedCallback () {
    super.connectedCallback()
    this.shadowRoot.querySelector('#qnum-number').innerHTML = this.hasAttribute('question-number') 
      ? `<label>${this.getAttribute('question-number')}</label>`
      : ''
    let supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
    let devices = navigator.mediaDevices.enumerateDevices().then(function(devices) {
      var arrayLength = devices.length;
    })
    this.constraints = {video: { facingMode: { exact: "environment" } }}
  }

  ready() {
    super.ready();
    this.t = {
      capture: t('capture'),
      accept: t('accept'),
      clear: t('clear')
    }
    this.shadowRoot.querySelector('#label').innerHTML = this.label
    // Start streaming video
    const constraints = this.getConstraints()
    navigator.mediaDevices.getUserMedia(constraints)
    .then(mediaStream => {
      this.shadowRoot.querySelector('video').srcObject = mediaStream;
      const track = mediaStream.getVideoTracks()[0];
      this.imageCapture = new ImageCapture(track);
    }).catch(error => {
          if (error.constraint && error.constraint === 'facingMode') {
            navigator.mediaDevices.getUserMedia({video: true})
                .then(mediaStream => {
                  this.shadowRoot.querySelector('video').srcObject = mediaStream;
                  const track = mediaStream.getVideoTracks()[0];
                  this.imageCapture = new ImageCapture(track);
                });
          } else {
            console.log("error: " + error)
          }
        }
      )

    if (this.value) {
      this.shadowRoot.querySelector('video').style.display = 'none'
      this.shadowRoot.querySelector('#image').style.display = 'block'
      this.enableButtons(["#accept-button","#clear-button"])
      this.disableButtons(["#capture-button"])
    }
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

  disableButtons(ids) {
    ids.forEach( (id) =>
      this.shadowRoot.querySelector(id).setAttribute('disabled', '')
    )
  }

  enableButtons(ids) {
    ids.forEach( (id) =>
      this.shadowRoot.querySelector(id).removeAttribute('disabled')
    )
  }
  
  async capturePhoto() {
    const { imageWidth, imageHeight } = await this.imageCapture.getPhotoCapabilities();
    this.blob = await this.imageCapture.takePhoto({
      imageWidth: imageWidth.max,
      imageHeight: imageHeight.max
    })
    const ImageReducer = new ImageBlobReduce()
    // Forces the output to be a JPG of .8 quality
    ImageReducer._create_blob = function (env) {
      return this.pica.toBlob(env.out_canvas, 'image/jpeg', 0.8)
        .then(function (blob) {
          env.out_blob = blob;
          return env;
        });
    };
    this.blob = await ImageReducer.toBlob(this.blob, {max: this.maxSizeInKb})
    this.$.image.src = URL.createObjectURL(this.blob);
    this.$.image.onload = () => { URL.revokeObjectURL(this.src); }
    this.shadowRoot.querySelector('video').style.display = 'none'
    this.shadowRoot.querySelector('#image').style.display = 'block'
    this.enableButtons(["#accept-button","#clear-button"])
    this.disableButtons(["#capture-button"])
  }

  clearPhoto() {
    this.value = null;
    this.$.image.src = ''
    this.enableButtons(["#capture-button"])
    this.disableButtons(["#accept-button","#clear-button"])
    this.shadowRoot.querySelector('video').style.display = 'block'
    this.shadowRoot.querySelector('#image').style.display = 'none'
  }

  async acceptPhoto() {
    // Convert blob to base64 string
    // https://stackoverflow.com/questions/18650168/convert-blob-to-base64/61226119#61226119
    const reader = new FileReader();
    reader.readAsDataURL(this.blob);
    this.value = await new Promise(resolve => {
      reader.onloadend = () => resolve(reader.result);
    });
    
    this.shadowRoot.querySelector('#capture-button').setAttribute('disabled', '')
    this.shadowRoot.querySelector('#accept-button').setAttribute('disabled', '')
  }



  getConstraints() {
    if (this.front) {
      return {video: { facingMode: { exact: "user" } }}
    } else {
      return {video: { facingMode: { exact: "environment" } }}
    }
  }

  toggleCamera() {
    if (this.front) {
      this.front = false
    } else {
      this.front = true
    }
    const constraints = this.getConstraints()
    navigator.mediaDevices.getUserMedia(constraints)
        .then(mediaStream => {
          this.shadowRoot.querySelector('video').srcObject = mediaStream;
          const track = mediaStream.getVideoTracks()[0];
          this.imageCapture = new ImageCapture(track);
        })
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
