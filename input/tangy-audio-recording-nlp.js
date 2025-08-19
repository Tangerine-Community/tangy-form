import { html } from "@polymer/polymer/polymer-element.js";
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
import { TangyInputBase } from "../tangy-input-base.js";
import "./tangy-audio-playback.js";

export class TangyAudioRecordingNlp extends TangyInputBase {
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
        <div class="nlp-section" id="nlpSection">
          <div class="nlp-header">
            <h2 class="feedback-title">[[label]]</h2>
          </div>

          <tangy-audio-playback label="Recorded Audio" id="audioPlayback"></tangy-audio-playback>
          
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
              hidden>
              <iron-icon icon="arrow-forward"></iron-icon>
              Process
            </paper-button>
            <paper-button 
              class="reprocess-button"
              id="reprocessButton"
              on-click="reprocessAudio"
              disabled="[[processing]]"
              hidden>
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
      label: {
        type: String,
        value: "",
      },
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
      languageList: {
        type: Array,
        value: () => []
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
      },
      audioRecording: {
        type: String,
        value: ''
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // this.shadowRoot.querySelector("#nlpSection").style.display = "none";
    this.shadowRoot.querySelector("#processingIndicator").style.display = "none";
    // this.shadowRoot.querySelector("#nlpResults").style.display = "none";
  }

  ready() {
    super.ready();
    
    this.t = {
      ...this.t,
      language: t("language"),
      selectLanguage: t("selectLanguage"),
      processingAudio: t("Processing Audio"),
      reprocess: t("reprocess"),
      detectedLanguage: t("detectedLanguage"),
      processingError: t("processingError"),
      noResults: t("noResults")
    };
  
    if (this.audioRecording.value != '') {
      const tangyForm = document.querySelector("tangy-form");
      const audioRecordingInput = tangyForm.inputs.find(input => input.name === this.audioRecording);
      if (audioRecordingInput && audioRecordingInput.value) {
        this.shadowRoot.querySelector("#audioPlayback").setAttribute("src", audioRecordingInput.value);
        this.showProcessButton();
      }
    }
  }

  showProcessButton() {
    const nlpResults = this.shadowRoot.querySelector("#nlpResults");
    const processBtn = this.shadowRoot.querySelector("#processButton");
    const reprocessBtn = this.shadowRoot.querySelector("#reprocessButton");

    if (nlpResults) nlpResults.style.display = "block";
    if (processBtn) {
      processBtn.removeAttribute('hidden');
    }
    if (reprocessBtn) {
      reprocessBtn.setAttribute('hidden', '');
    }
  }

  showReprocessButton() { 
    const processBtn = this.shadowRoot.querySelector("#processButton");
    const reprocessBtn = this.shadowRoot.querySelector("#reprocessButton");
    
    if (processBtn) {
      processBtn.setAttribute('hidden', '');
    }
    if (reprocessBtn) {
      reprocessBtn.removeAttribute('hidden');
    }
  }

  async processAudioWithNlp() {
    const tangyForm = document.querySelector("tangy-form");
    const audioRecordingInput = tangyForm.inputs.find(input => input.name === this.audioRecording);
    const audioBlob = audioRecordingInput.audioBlob;
    if (!audioBlob || !this.nlpModelUrl) {
      console.warn("No audio blob or NLP model URL provided");
      return;
    }
    this.processing = true;
    this.shadowRoot.querySelector("#processingIndicator").style.display = "flex";
    this.shadowRoot.querySelector("#nlpResults").style.display = "none";
    this.nlpError = "";
    try {
      const formData = new FormData();
      if (audioBlob) {
          formData.append('audio', audioBlob, 'recording.wav');
      } else {
          console.error('No audio blob found');
          return;
      }
      if (this.stimuliText && this.stimuliText.trim()) {
        formData.append('stimuli', this.stimuliText.trim());
      }
      const response = await fetch(this.nlpModelUrl, {
        method: 'POST',
        body: formData
      });

      let result = await response.json();
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
          Character Error Rate: ${cer || 'N/A'}
        </div>
        <div class="csr-score">
          Character Success Rate: ${csr}%
        </div>
        
        <div class="result-section">
          <h5>Reference Text</h5>
          <div class="reference-text">${this.nlpResults.reference || 'No reference text provided'}</div>
        </div>
        
        <div class="result-section">
          <h5>Child's Reading</h5>
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