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

import AudioMotionAnalyzer from 'audiomotion-analyzer';

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
        paper-button[disabled] {
          opacity: 0.2;
        }
        paper-button#startRecording {
            height: 48px;
            width: 100%;
        }
        paper-button#startRecording {
            height: 48px;
            width: 100%;
        }
        paper-button {
           background-color: var(--accent-color, #ccc);
        }
        audio#audioPlayback {
           display: none;
        }
      </style>
      <div id="qnum-number"></div>
      <div id="qnum-content">
        <label id="label"></label>
        <label id="hintText" class="hint-text"></label>
        <label id="error-text"></label>
        <div>
          <paper-button id="startRecording" on-click="startRecording"
            ><iron-icon icon="settings-voice"></iron-icon> [[t.record]]
          </paper-button>
          <div id="audio-motion-container" style="width: 100%; max-height: 48px;"></div>
        <div id="buttons">
          <paper-button id="stopRecording" on-click="stopRecording"
            ><iron-icon icon="av:stop"></iron-icon> [[t.stop]]
          </paper-button>
          <paper-button id="playRecording"
            on-click="playRecording"
            disabled="[[!audioBlob]]"
            ><iron-icon icon="av:play-arrow"></iron-icon> [[t.play]]
          </paper-button>
          <paper-button
            id="deleteRecording"
            on-click="deleteRecording"
            disabled="[[!audioBlob]]"
            ><iron-icon icon="delete"></iron-icon> [[t.delete]]
          </paper-button>
          <span id="recording-time">[[recordingTime]]</span>
          <audio id="audioPlayback" controls></audio>
        </div>
      </div>
    `;
  }
  static get is() {
    return 'tangy-audio-recording'
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
        value: null,
      },
      isRecording: {
        type: Boolean,
        value: false,
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

    this.recordingTime = "00:00";
    this.shadowRoot.querySelector("#stopRecording").style.display = "none";
    this.shadowRoot.querySelector("#playRecording").style.display = "none";
    this.shadowRoot.querySelector("#deleteRecording").style.display = "none";
    this.shadowRoot.querySelector("#recording-time").style.display = "none";
    this.shadowRoot.querySelector("#audio-motion-container").style.display = "none";
  }
  reflect() {
    this.shadowRoot.querySelector("#qnum-number").innerHTML = this.hasAttribute(
      "question-number"
    )
      ? `<label>${this.getAttribute("question-number")}</label>`
      : "";
    this.shadowRoot.querySelector("#hintText").innerHTML = this.hintText;
    this.shadowRoot.querySelector("#label").innerHTML = this.label;

    this.micStream = null;
    this.audioPlaybackSource = null;
    // Options pulled from https://audiomotion.dev/demo/fluid.html -- click the getOptions() button and see the console
    const audioMotionContainer = this.shadowRoot.getElementById('audio-motion-container')
    const options = {
      "alphaBars": false,
      "ansiBands": false,
      "barSpace": 0.25,
      "bgAlpha": 0.7,
      "channelLayout": "single",
      "colorMode": "bar-level",
      "fadePeaks": false,
      "fftSize": 8192,
      "fillAlpha": 1,
      "frequencyScale": "log",
      //"gradient": "orangered", // defined below
      "gravity": 3.8,
      "ledBars": false,
      "linearAmplitude": true,
      "linearBoost": 1.6,
      "lineWidth": 0,
      "loRes": false,
      "lumiBars": false,
      "maxDecibels": -25,
      "maxFPS": 0,
      "maxFreq": 16000,
      "minDecibels": -85,
      "minFreq": 30,
      "mirror": 0,
      "mode": 2,
      "noteLabels": false,
      "outlineBars": false,
      "overlay": false,
      "peakFadeTime": 750,
      "peakHoldTime": 500,
      "peakLine": false,
      "radial": false,
      "radialInvert": false,
      "radius": 0.3,
      "reflexAlpha": 1,
      "reflexBright": 1,
      "reflexFit": true,
      "reflexRatio": 0.5,
      "roundBars": true,
      "showBgColor": true,
      "showFPS": false,
      "showPeaks": false,
      "showScaleX": false,
      "showScaleY": false,
      "smoothing": 0.7,
      "spinSpeed": 0,
      "splitGradient": false,
      "trueLeds": false,
      "useCanvas": true,
      "volume": 1,
      "weightingFilter": "D"
    }
    this.audioMotion = new AudioMotionAnalyzer(
      audioMotionContainer, options
    );
    this.audioMotion.registerGradient( 'tangyGradient', {
      bgColor: '#eee', // background color (optional) - defaults to '#111'
      dir: 'h',           // add this property to create a horizontal gradient (optional)
      colorStops: [       // list your gradient colors in this array (at least one color is required)
          { color: 'orangered', pos: .6 }, // in an object, use `pos` to adjust the offset (0 to 1) of a colorStop
          { color: 'orange', level: .5 }  // use `level` to set the max bar amplitude (0 to 1) to use this color
      ]
    });
    this.audioMotion.gradient = 'tangyGradient';

  }

  onInvalidChange(value) {
    if (this.shadowRoot.querySelector('#error-text')) {
      this.shadowRoot.querySelector('#error-text').innerHTML = this.invalid
        ? `<iron-icon icon="error"></iron-icon> <div> ${ this.hasAttribute('error-text') ? this.getAttribute('error-text') : ''} </div>`
        : ''
    }
  }
  onSkippedChange(newValue, oldValue) {
    if (newValue === true) {
      this.value = this.constructor.properties.value.value
    }
  }
  validate() {
    if(this.isRecording){
      alert(t('Please stop the recording to continue.'))
    }
    if (this.hasAttribute('required') && !this.value) {
      this.invalid = true
      return false
    } else {
      this.invalid = false
      return true
    }
  }
  
  startRecording() {
    this.isRecording = true;
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        this.audioBlob = null;
        this.value = null;
        this.shadowRoot.querySelector("#startRecording").style.display = "none";
        this.shadowRoot.querySelector("#stopRecording").style.display = "inline-flex";
        this.shadowRoot.querySelector("#audio-motion-container").style.display = "inline-flex";

        // create stream using audioMotion audio context
        this.micStream = this.audioMotion.audioCtx.createMediaStreamSource( stream );
        // connect microphone stream to analyzer
        this.audioMotion.connectInput( this.micStream );
        // mute output to prevent feedback loops from the speakers
        this.audioMotion.volume = 0;

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
    this.isRecording = false;
    this.mediaRecorder.stop();
    clearInterval(this.recordingInterval);
    this.shadowRoot.querySelector("#stopRecording").style.display = "none";
    this.shadowRoot.querySelector("#startRecording").style.display = "none";
    this.shadowRoot.querySelector("#playRecording").style.display = "inline-flex";
    this.shadowRoot.querySelector("#deleteRecording").style.display = "inline-flex";
    this.shadowRoot.querySelector("#recording-time").style.display = "inline-flex";
    // this.shadowRoot.querySelector("#audio-motion-container").style.display = "none";

    this.mediaRecorder.onstop = () => {
      this.audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
      this.audioChunks = [];
      const audioURL = URL.createObjectURL(this.audioBlob);
      this.value = audioURL;
      this.dispatchEvent(
        new CustomEvent("TANGY_MEDIA_UPDATE", { detail: { value: this } })
      );
      this.$.audioPlayback.src = audioURL;

      this.audioMotion.disconnectInput( this.micStream );

      if (!this.audioPlaybackSource) {
        this.audioPlaybackSource = this.audioMotion.audioCtx.createMediaElementSource(this.$.audioPlayback);
        this.audioMotion.connectInput(this.audioPlaybackSource);
      }
      this.audioMotion.volume = 1; // restore volume to normal
    };



  }

  playRecording() {
    if (this.audioBlob) {
      this.$.audioPlayback.play();
    } else {
      console.warn("No audio recording available to play.");
    }
  }

  deleteRecording() {
    this.audioBlob = null;
    this.recordingTime = "00:00";
    this.$.audioPlayback.src = "";

    this.shadowRoot.querySelector("#startRecording").style.display = "inline-flex";
    this.shadowRoot.querySelector("#stopRecording").style.display = "none";
    this.shadowRoot.querySelector("#playRecording").style.display = "none";
    this.shadowRoot.querySelector("#deleteRecording").style.display = "none";
    this.shadowRoot.querySelector("#recording-time").style.display = "none";
    this.shadowRoot.querySelector("#audio-motion-container").style.display = "none";
  }
}

window.customElements.define("tangy-audio-recording", TangyAudioRecording);
