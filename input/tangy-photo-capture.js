import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../style/tangy-common-styles.js'
import '../style/tangy-element-styles.js'
import '@polymer/iron-icon/iron-icon.js'
import '@polymer/paper-button/paper-button.js'


    /**
     * `tangy-checkbox`
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
      img {
        width: 100%;
      }
    </style>
    <img id="image"/>
    <paper-button on-click="capturePhoto"><iron-icon icon="camera-enhance"></iron-icon> capture photo </paper-buton>

    `
  }

  static get is () {
    return 'tangy-photo-capture'
  }

  static get properties () {
    return {
      name: {
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
      hidden: {
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
      incomplete: {
        type: Boolean,
        value: true,
        reflectToAttribute: true
      },
      value: {
        type: String,
        value: ''
      }
     }
  }

  connectedCallback () {
    super.connectedCallback()
    navigator.mediaDevices.getUserMedia({video: true})
      .then(mediaStream => this.gotMedia(mediaStream))
      .catch(error => console.error('getUserMedia() error:', error));
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

}
window.customElements.define(TangyPhotoCapture.is, TangyPhotoCapture)
