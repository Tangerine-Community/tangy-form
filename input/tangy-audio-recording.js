import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { t } from "../util/t.js";
import "../style/tangy-common-styles.js";
import "../style/tangy-element-styles.js";
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/av-icons.js';
import '@polymer/iron-icons/editor-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import "@polymer/paper-button/paper-button.js";
import { TangyInputBase } from "../tangy-input-base.js";
import { getWaveBlob } from "../util/webmToWavConverter.js";
import AudioMotionAnalyzer from 'audiomotion-analyzer';

export class TangyAudioRecording extends TangyInputBase {
  static get template() {
    return html`
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <style>
        .hint-text { margin-top: 6px; margin-left: 4px; }
        #recording-time { font-size: 12px; font-weight: bold; }
        paper-button { background-color: var(--accent-color, #ccc); }
        paper-button[disabled] { opacity: 0.2; }
        audio#audioPlayback { display: none; }
        .audio-row { display: flex; align-items: center; gap: 4px; min-height: 50px; }
        #startRecording { width: 100%; }
        [hidden] { display: none !important; }
        #error-text { color: red; margin-top: 8px; display: flex; align-items: center; gap: 4px; }
      </style>

      <div id="qnum-number"></div>
      <div id="qnum-content">
        <label id="label"></label>
        <label id="hintText" class="hint-text"></label>
        
        <div id="buttons">
          <paper-button id="startRecording" on-click="startRecording" hidden$="[[_hideStart(value, isRecording)]]" disabled$="[[disabled]]">
            <iron-icon icon="settings-voice"></iron-icon> [[t.record]]
          </paper-button>

          <div class="audio-row" hidden$="[[_hideControls(value, isRecording)]]">
            <paper-button id="stopRecording" on-click="stopRecording" hidden$="[[!isRecording]]" disabled$="[[disabled]]">
              <iron-icon icon="av:stop"></iron-icon>
            </paper-button>

            <paper-button id="playRecording" on-click="playRecording" hidden$="[[_hidePlay(isRecording, isPlaying, value)]]" disabled$="[[disabled]]">
              <iron-icon icon="av:play-arrow"></iron-icon>
            </paper-button>

            <paper-button id="pausePlayback" on-click="pausePlayback" hidden$="[[!isPlaying]]" disabled$="[[disabled]]">
              <iron-icon icon="av:pause"></iron-icon>
            </paper-button>

            <paper-button id="deleteRecording" on-click="deleteRecording" hidden$="[[isRecording]]" disabled$="[[disabled]]">
              <iron-icon icon="delete"></iron-icon>
            </paper-button>

            <span id="audio-motion-container"></span>
            <span id="recording-time">[[recordingTime]]</span>
          </div>
        </div>

        <audio id="audioPlayback" src$="[[value]]"></audio>
        <div id="error-text"></div>
      </div>
    `;
  }

  static get is() { return 'tangy-audio-recording'; }

  static get properties() {
    return {
      value: { type: String, value: "", notify: true },
      isRecording: { type: Boolean, value: false },
      isPlaying: { type: Boolean, value: false },
      recordingTime: { type: String, value: "00:00" },
      durationSeconds: { type: Number, value: 0 },
      // EXPOSED SETTING: Set this in HTML as min-duration="seconds"
      minDuration: { type: Number, value: 2, reflectToAttribute: true },
      audioBlob: { type: Object, value: null },
      hintText: String,
      label: String,
      invalid: { type: Boolean, value: false, observer: "onInvalidChange", reflectToAttribute: true },
      errorText: { type: String, value: "" },
      disabled: { type: Boolean, value: false, reflectToAttribute: true }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._setupQuestionNumber();
    this.audioChunks = [];
  }

  ready() {
    super.ready();
    this.t = { record: t("record"), stop: t("stop"), play: t("play"), delete: t("delete") };
    this.$.hintText.innerHTML = this.hintText || '';
    this.$.label.innerHTML = this.label || '';
    this._initAudioMotion();
  }

  _initAudioMotion() {
    const container = this.shadowRoot.getElementById('audio-motion-container');
    this.audioMotion = new AudioMotionAnalyzer(container, {
      mode: 10,
      overlay: true, 
      showBgColor: false,
      bgAlpha: 0,
      useCanvas: true,
      showScaleX: false,
      showScaleY: false,
      fftSize: 2048,
      maxFPS: 30,
      lineWidth: 2,
      fillAlpha: 0,
      reflexRatio: 0,
      lumiBars: false,
      showPeaks: false,
      minDecibels: -85,
      maxDecibels: -25,
      smoothing: 0.6
    });
    
    this.audioMotion.registerGradient('simpleOrange', { colorStops: [{ color: 'orangered' }] });
    this.audioMotion.gradient = 'simpleOrange';
    
    this.audioPlaybackSource = this.audioMotion.audioCtx.createMediaElementSource(this.$.audioPlayback);
    this.audioMotion.connectInput(this.audioPlaybackSource);
  }

  async startRecording() {
    if (this.isRecording) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaStream = stream;
      this.audioChunks = []; 
      
      if (this.audioMotion.audioCtx.state === 'suspended') {
        await this.audioMotion.audioCtx.resume();
      }

      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) this.audioChunks.push(e.data); };

      this.mediaRecorder.onstop = async () => {
        const webmBlob = new Blob(this.audioChunks, { type: this.mediaRecorder.mimeType });
        if (webmBlob.size === 0) return;

        try {
          const buffer = await webmBlob.arrayBuffer();
          const audioBuffer = await this.audioMotion.audioCtx.decodeAudioData(buffer);
          this.audioBlob = getWaveBlob(audioBuffer, false);
          this.value = URL.createObjectURL(this.audioBlob);
          this.dispatchEvent(new CustomEvent("TANGY_MEDIA_UPDATE", { detail: { value: this } }));
          this.validate(); // Run validation immediately after processing
        } catch (err) {
          console.error("Audio conversion failed", err);
        } finally {
          if (this.mediaStream) this.mediaStream.getTracks().forEach(track => track.stop());
          if (this.micStream) {
            this.audioMotion.disconnectInput(this.micStream);
            this.audioMotion.volume = 1;
          }
        }
      };

      this.isRecording = true;
      this.mediaRecorder.start(1000);
      this._startTimer();

      this.micStream = this.audioMotion.audioCtx.createMediaStreamSource(stream);
      this.audioMotion.connectInput(this.micStream);
      this.audioMotion.volume = 0;

    } catch (err) {
      console.error("Mic access denied", err);
      this.isRecording = false;
    }
  }

  stopRecording() {
    if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') return;
    this.mediaRecorder.stop();
    this.isRecording = false;
    clearInterval(this.recordingInterval);
  }

  playRecording() {
    if (!this.value || this.isPlaying) return;
    this.isPlaying = true;
    this.$.audioPlayback.play();
    this.$.audioPlayback.addEventListener('ended', () => { this.isPlaying = false; }, { once: true });
  }

  pausePlayback() {
    this.$.audioPlayback.pause();
    this.isPlaying = false;
  }

  deleteRecording() {
    this.pausePlayback();
    if (this.value && this.value.startsWith('blob:')) URL.revokeObjectURL(this.value);
    this.value = "";
    this.audioBlob = null;
    this.recordingTime = "00:00";
    this.durationSeconds = 0;
    this.invalid = false; // Clear validation errors on delete
  }

  _startTimer() {
    const startTime = Date.now();
    this.durationSeconds = 0;
    this.recordingInterval = setInterval(() => {
      const delta = Date.now() - startTime;
      this.durationSeconds = Math.floor(delta / 1000);
      const mins = Math.floor(delta / 60000).toString().padStart(2, '0');
      const secs = Math.floor((delta % 60000) / 1000).toString().padStart(2, '0');
      this.recordingTime = `${mins}:${secs}`;
    }, 1000);
  }

  _hideStart(val, rec) { return !!val || rec; }
  _hideControls(val, rec) { return !val && !rec; }
  _hidePlay(rec, play, val) { return rec || play || !val; }

  _setupQuestionNumber() {
    const qNum = this.getAttribute("question-number");
    this.shadowRoot.querySelector("#qnum-number").innerHTML = qNum ? `<label>${qNum}</label>` : "";
  }

  onInvalidChange() {
    const errorDiv = this.shadowRoot.querySelector('#error-text');
    if (errorDiv) {
      errorDiv.innerHTML = this.invalid
        ? `<iron-icon icon="error"></iron-icon> <div>${this.hasAttribute('error-text') ? this.getAttribute('error-text') : this.errorText}</div>`
        : '';
    }
  }

  validate() {
    if (this.isRecording) {
      this.errorText = t("Stop the recording before continuing");
      this.invalid = true;
      return false;
    }
    if (this.hasAttribute('required') && !this.value) {
      this.errorText = t("Recording is required");
      this.invalid = true;
      return false;
    }
    // Check minimum duration setting
    if (this.value && this.durationSeconds < this.minDuration) {
      this.errorText = `${t("Recording must be at least")} ${this.minDuration} ${t("seconds long")}`;
      this.invalid = true;
      return false;
    }
    this.errorText = "";
    this.invalid = false;
    return true;
  }

  validate_back() {
    if (this.isRecording) {
      this.errorText = t("Stop the recording before continuing");
      this.invalid = true;
      return false;
    }
    return true;
  }

  disconnectedCallback() {
    this.stopRecording();
    if (this.audioMotion) this.audioMotion.destroy();
    if (this.value && this.value.startsWith('blob:')) URL.revokeObjectURL(this.value);
    super.disconnectedCallback();
  }
}

window.customElements.define(TangyAudioRecording.is, TangyAudioRecording);