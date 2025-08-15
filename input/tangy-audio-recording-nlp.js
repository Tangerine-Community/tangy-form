import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { t } from "../util/t.js";
import "../style/tangy-common-styles.js";
import "../style/tangy-element-styles.js";
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/av-icons.js';
import '@polymer/iron-icons/editor-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-progress/paper-progress.js";
import { TangyAudioRecording } from "./tangy-audio-recording.js";

export class TangyAudioRecordingNlp extends TangyAudioRecording {
  static get template() {
    return html`
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <style>
        .nlp-section {
          margin-top: 15px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: #f9f9f9;
        }
        .nlp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .processing-indicator {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #666;
          font-style: italic;
        }
        .nlp-results {
          margin-top: 10px;
          padding: 10px;
          background-color: white;
          border-radius: 4px;
        }
        .nlp-error {
          color: #f44336;
          border-left-color: #f44336;
        }
        .reprocess-button {
          margin-top: 10px;
        }
        .result-section {
          margin: 15px 0;
          padding: 10px;
          background-color: #f8f9fa;
          border-radius: 4px;
          border-left: 3px solid #f26f10;
        }
        .result-section h5 {
          margin: 0 0 8px 0;
          color: #f26f10;
          font-size: 14px;
          font-weight: 600;
        }
        .result-section p {
          margin: 5px 0;
          line-height: 1.4;
        }
        .cer-score {
          font-size: 18px;
          font-weight: bold;
          color: #dc3545;
          text-align: center;
          padding: 10px;
          background-color: #f8d7da;
          border-radius: 4px;
          margin: 10px 0;
        }
        .csr-score {
          font-size: 18px;
          font-weight: bold;
          color: #28a745;
          text-align: center;
          padding: 10px;
          background-color: #d4edda;
          border-radius: 4px;
          margin: 10px 0;
        }
        .reference-text {
          background-color: #e9ecef;
          padding: 8px;
          border-radius: 4px;
          font-style: italic;
          margin: 5px 0;
        }
        .hypothesis-text {
          background-color: #fff3cd;
          padding: 8px;
          border-radius: 4px;
          margin: 5px 0;
        }
        paper-progress {
          width: 100%;
          margin-top: 5px;
        }
        .hidden {
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
        <div class="audio-row">
          <paper-button id="stopRecording" on-click="stopRecording"
            ><iron-icon icon="av:stop"></iron-icon>
          </paper-button>
          <paper-button id="playRecording"
              on-click="playRecording"
              disabled="[[!audioBlob]]"
              ><iron-icon icon="av:play-arrow"></iron-icon>
          </paper-button>
          <paper-button id="pausePlayback" on-click="pausePlayback"
            ><iron-icon icon="av:pause"></iron-icon>
          </paper-button>
          <paper-button
            id="deleteRecording"
            on-click="deleteRecording"
            disabled="[[!audioBlob]]"
            ><iron-icon icon="delete"></iron-icon>
          </paper-button>
          <span id="audio-motion-container"></span>
          <span id="recording-time">[[recordingTime]]</span>
        </div>
         
        <audio id="audioPlayback" src="[[value]]"></audio>

        
        <div class="nlp-section" id="nlpSection">
          <div class="nlp-header">
            <h4>Results</h4>
          </div>
          
          <!-- Processing Indicator -->
          <div class="processing-indicator" id="processingIndicator">
            <iron-icon icon="hourglass-empty"></iron-icon>
            <span>[[t.processingAudio]]</span>
            <paper-progress indeterminate></paper-progress>
          </div>
          
          <div class="nlp-results" id="nlpResults">
            <div id="nlpContent"></div>
            <paper-button 
              class="process-button"
              id="processButton"
              on-click="processAudioWithNlp"
              disabled="[[processing]]"
              style="display:none;">
              <iron-icon icon="arrow-forward"></iron-icon>
              Process
            </paper-button>
            <paper-button 
              class="reprocess-button"
              id="reprocessButton"
              on-click="reprocessAudio"
              disabled="[[processing]]"
              style="display:none;">
              <iron-icon icon="refresh"></iron-icon>
              [[t.reprocess]]
            </paper-button>
          </div>
        </div>
      </div>
    `;
  }

  static get is() {
    return 'tangy-audio-recording-nlp'
  }

  static get properties() {
    return {
      ...super.properties,
      nlpModelUrl: {
        type: String,
        value: "",
        reflectToAttribute: true
      },
      stimuliText: {
        type: String,
        value: "",
        reflectToAttribute: true
      },
      language: {
        type: String,
        value: "en",
        reflectToAttribute: true
      },
      processing: {
        type: Boolean,
        value: false
      },
      nlpResults: {
        type: Object,
        value: null
      },
      nlpError: {
        type: String,
        value: ""
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.querySelector("#nlpSection").style.display = "none";
    this.shadowRoot.querySelector("#processingIndicator").style.display = "none";
    this.shadowRoot.querySelector("#nlpResults").style.display = "none";
  }

  ready() {
    super.ready();
    
    this.t = {
      ...this.t,
      language: t("language"),
      selectLanguage: t("selectLanguage"),
      processingAudio: t("processingAudio"),
      reprocess: t("reprocess"),
      detectedLanguage: t("detectedLanguage"),
      processingError: t("processingError"),
      noResults: t("noResults")
    };
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

    this.mediaRecorder.onstop = () => {
      this.audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
      this.audioChunks = [];
      const audioURL = URL.createObjectURL(this.audioBlob);
      this.value = audioURL;
      this.dispatchEvent(
        new CustomEvent("TANGY_MEDIA_UPDATE", { detail: { value: this } })
      );
      this.audioMotion.disconnectInput(this.micStream);
      this.audioMotion.volume = 1; 
      this.shadowRoot.querySelector("#nlpSection").style.display = "block";
      this.showProcessButton();
    };
  }

  showProcessButton() {
    const nlpResults = this.shadowRoot.querySelector("#nlpResults");
    const processBtn = this.shadowRoot.querySelector("#processButton");
    const reprocessBtn = this.shadowRoot.querySelector("#reprocessButton");
    if (nlpResults) nlpResults.style.display = "block";
    if (processBtn) processBtn.style.display = "inline-flex";
    if (reprocessBtn) reprocessBtn.style.display = "none";
  }

  showReprocessButton() { 
    const processBtn = this.shadowRoot.querySelector("#processButton");
    const reprocessBtn = this.shadowRoot.querySelector("#reprocessButton");
    if (processBtn) processBtn.style.display = "none";
    if (reprocessBtn) reprocessBtn.style.display = "inline-flex";
  }

  deleteRecording() {
    super.deleteRecording();
    this.shadowRoot.querySelector("#nlpSection").style.display = "none";
    this.nlpResults = null;
    this.nlpError = "";
    const processBtn = this.shadowRoot.querySelector("#processButton");
    const reprocessBtn = this.shadowRoot.querySelector("#reprocessButton");
    if (processBtn) processBtn.style.display = "none";
    if (reprocessBtn) reprocessBtn.style.display = "none";
  }

  async processAudioWithNlp() {
    if (!this.audioBlob || !this.nlpModelUrl) {
      console.warn("No audio blob or NLP model URL provided");
      return;
    }
    this.processing = true;
    this.shadowRoot.querySelector("#processingIndicator").style.display = "flex";
    this.shadowRoot.querySelector("#nlpResults").style.display = "none";
    this.nlpError = "";
    try {
      const formData = new FormData();
      formData.append('audio', this.audioBlob, 'recording.wav');
      formData.append('language', this.language);
      if (this.stimuliText && this.stimuliText.trim()) {
        formData.append('stimuli', this.stimuliText.trim());
      }

      const response = await fetch(this.nlpModelUrl, {
        method: 'POST',
        body: formData
      });

      let result = await response.json();
      if (typeof result === 'string') {
        result = result.trim();
        if (result.startsWith('```json')) {
          result = result.replace(/^```json/, '').replace(/```$/, '').trim();
        } else if (result.startsWith('```')) {
          result = result.replace(/^```/, '').replace(/```$/, '').trim();
        }
        try {
          result = JSON.parse(result);
        } catch (e) {
          console.error('Failed to parse NLP result string:', result);
        }
      }
      console.log('NLP API cleaned result:', result);
      this.nlpResults = result;
      this.displayNlpResults();
      this.showReprocessButton();
      
    } catch (error) {
      console.error("NLP processing error:", error);
      this.nlpError = error.message;
      this.displayNlpError();
    } finally {
      this.processing = false;
      this.shadowRoot.querySelector("#processingIndicator").style.display = "none";
    }
  }

  displayNlpResults() {
    const resultsContainer = this.shadowRoot.querySelector("#nlpResults");
    const contentDiv = this.shadowRoot.querySelector("#nlpContent");
    if (this.nlpResults) {
      const cer = this.nlpResults.cer;
      const csr = cer !== undefined && cer !== 'N/A' ? (100 - parseFloat(cer)).toFixed(2) : 'N/A';
      
      const html = `
        <div class="cer-score">
          Character Error Rate: ${cer || 'N/A'}%
        </div>
        <div class="csr-score">
          Character Success Rate: ${csr}%
        </div>
        
        <div class="result-section">
          <h5>Reference Text</h5>
          <div class="reference-text">${this.nlpResults.reference || 'No reference text provided'}</div>
        </div>
        
        <div class="result-section">
          <h5>Child's Reading (Hypothesis)</h5>
          <div class="hypothesis-text">${this.nlpResults.hypothesis || 'No hypothesis provided'}</div>
        </div>
        
        <div class="result-section">
          <h5>Analysis</h5>
          <p>${this.nlpResults.analysis || 'No analysis provided'}</p>
        </div>
        
        <div class="result-section">
          <h5>Recommendation</h5>
          <p>${this.nlpResults.recommendation || 'No recommendation provided'}</p>
        </div>
        
        <div class="result-section">
          <h5>Teaching Tip</h5>
          <p>${this.nlpResults.tip || 'No tip provided'}</p>
        </div>
      `;
      
      contentDiv.innerHTML = html;
    } else {
      contentDiv.innerHTML = `<p>${this.t.noResults}</p>`;
    }

    resultsContainer.style.display = "block";
    resultsContainer.classList.remove("nlp-error");
  }

  displayNlpError() {
    const resultsContainer = this.shadowRoot.querySelector("#nlpResults");
    const contentDiv = this.shadowRoot.querySelector("#nlpContent");
    
    contentDiv.innerHTML = `
      <p class="nlp-error">${this.t.processingError}: ${this.nlpError}</p>
    `;
    
    resultsContainer.style.display = "block";
    resultsContainer.classList.add("nlp-error");
  }

  reprocessAudio() {
    this.processAudioWithNlp();
  }

  validate() {
    const baseValidation = super.validate();
    
    if (this.hasAttribute('required') && !this.nlpResults) {
      this.invalid = true;
      return false;
    }
    
    return baseValidation;
  }

  getModProps() {
    const baseProps = super.getModProps();
    const cer = this.nlpResults && this.nlpResults.cer;
    const csr = cer !== undefined && cer !== 'N/A' ? (100 - parseFloat(cer)).toFixed(2) : 'N/A';
    
    return {
      ...baseProps,
      nlpResults: this.nlpResults,
      stimuliText: this.stimuliText,
      cer: cer,
      csr: csr,
      reference: this.nlpResults && this.nlpResults.reference,
      hypothesis: this.nlpResults && this.nlpResults.hypothesis,
      analysis: this.nlpResults && this.nlpResults.analysis,
      recommendation: this.nlpResults && this.nlpResults.recommendation,
      tip: this.nlpResults && this.nlpResults.tip
    };
  }
}

window.customElements.define(TangyAudioRecordingNlp.is, TangyAudioRecordingNlp);