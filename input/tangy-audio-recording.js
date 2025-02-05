import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { t } from "../util/t.js";
import "../style/tangy-common-styles.js";
import "../style/tangy-element-styles.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/paper-button/paper-button.js";
import { TangyInputBase } from "../tangy-input-base.js";

export class TangyAudioRecording extends TangyInputBase {
  static get template() {
    return html`
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <style>
             .hint-text {
               margin-top: 6px;
               margin-left: 4px;
             }
             #buttons {
               margin: 15px 0px;
             }
             #recording-time{
                 text-align:center;
                 font-size: 24px;
                 font-style bold;
                 color: var(--accent-color, #ccc);;

             }
            :host(:not([show-button])) #signature-pad {
                display:none;
            }
            :host([show-button]) paper-button {
                display:block;
            }
             paper-button {
               background-color: var(--accent-color, #ccc);
             }
             paper-button[disabled] {
               opacity: 0.2;
             }
      </style>
      <p id="recording-time">[[recordingTime]]</p>
      <div id="buttons">
        <paper-button id="startRecording" on-click="startRecording"
          ><iron-icon icon="settings-voice"></iron-icon> [[t.record]]
        </paper-button>
        <paper-button id="stopRecording" on-click="stopRecording"
          ><iron-icon icon="av:stop"></iron-icon> [[t.stop]]
        </paper-button>
        <paper-button ="playRecording" on-click="playRecording" disabled="[[!audioBlob]]"
          ><iron-icon icon="av:play-circle-filled"></iron-icon> [[t.play]]
        </paper-button>
        <paper-button id="deleteRecordings" on-click="deleteRecording" disabled="[[!audioBlob]]"
          ><iron-icon icon="delete"></iron-icon> [[t.delete]]
        </paper-button>
      </div>
      <audio id="audioPlayback" controls></audio>
    `;
  }

  static get properties() {
    return {
      name: {
        type: String,
        value: "",
      },
      hintText: {
        type: String,
        value: "",
        reflectToAttribute: true,
      },
      label: {
        type: String,
        observer: "reflect",
        value: "",
      },
      errorText: {
        type: String,
        value: "",
      },
      private: {
        type: Boolean,
        value: false,
      },
      disabled: {
        type: Boolean,
        value: false,
        observer: "onDisabledChange",
        reflectToAttribute: true,
      },
      hidden: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
      },
      skipped: {
        type: Boolean,
        value: false,
        observer: "onSkippedChange",
        reflectToAttribute: true,
      },
      invalid: {
        type: Boolean,
        value: false,
        observer: "onInvalidChange",
        reflectToAttribute: true,
      },
      incomplete: {
        type: Boolean,
        value: true,
        reflectToAttribute: true,
      },
      value: {
        type: String,
        value: "",
        observer: "onValueChange",
      },
      identifier: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
      },
      mediaRecorder: Object,
      audioChunks: {
        type: Array,
        value: () => [],
      },
      audioBlob: {
        type: Object,
        value: null
      },
    };
  }
  connectedCallback() {
    super.connectedCallback();
  }

  ready() {
    super.ready();
    this.t = {
      record: t("record"),
      stop: t("stop"),
      play: t("play"),
      delete: t("delete"),
    };
    this.recordingTime = '00:00'
    this.shadowRoot.querySelector('#stopRecording').style.display = 'none';
  }
  startRecording() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        this.audioBlob = null
        this.value = null
        this.shadowRoot.querySelector('#startRecording').style.display = 'none';
        this.shadowRoot.querySelector('#stopRecording').style.display = 'inline-flex';
        this.recordingInterval = setInterval(() => {
          const currentTime = new Date().getTime();
          const elapsedTime = currentTime - this.startTime;
          const minutes = Math.floor(elapsedTime / 60000);
          const seconds = Math.floor((elapsedTime % 60000) / 1000);
          this.recordingTime = `${String(minutes).padStart(2, "0")}:${String(
            seconds
          ).padStart(2, "0")}`;
        }, 1000);
        this.startTime = new Date().getTime();
        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };
      })
      .catch((error) => {
        console.error("Error accessing microphone", error);
      });
  }

  stopRecording() {
    this.mediaRecorder.stop();
    clearInterval(this.recordingInterval)
    this.shadowRoot.querySelector('#stopRecording').style.display = 'none';
    this.shadowRoot.querySelector('#startRecording').style.display = 'inline-flex';
    this.mediaRecorder.onstop = () => {
      this.audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
      this.audioChunks = [];
      const audioURL = URL.createObjectURL(this.audioBlob);
      this.value = audioURL;
      this.dispatchEvent(
        new CustomEvent("TANGY_MEDIA_UPDATE", { detail: { value: this } })
      );
      this.$.audioPlayback.src = audioURL;
    };
  }

  playRecording() {
    this.$.audioPlayback.play();
  }

  deleteRecording() {
    this.audioBlob = null;
    this.recordingTime = '00:00'
    this.$.audioPlayback.src = "";
  }
}

window.customElements.define("tangy-audio-recording", TangyAudioRecording);
