import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-textarea.js'
import '@polymer/polymer/lib/elements/dom-if.js';
import '../style/tangy-common-styles.js'
import '../style/tangy-element-styles.js'
import '@polymer/iron-icon/iron-icon.js'
import '@polymer/iron-icons/image-icons.js'
import { t } from '../util/t.js'

/**
 * `tangy-consent`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TangyConsent extends PolymerElement {
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
        paper-button.pressed {
          background-color: var(--primary-color) !important;
        }
        #statusMessage {
          margin-top: 1em;
          font-weight: bold;
          color: red;
        }
      </style>
      <paper-card>
        <div class="card-content">
          <div id="container">
            <span id="prompt"></span>
            <div id="statusMessage"> [[statusMessage]] </div>
            <label class="hint-text">
            </label>
          </div>
        </div>
        <div class="card-actions">
            <paper-button id="consentYesButton" on-click="clickedConsentYes">{{t.consent_yes}}</paper-button>
            <paper-button id="consentNoButton" on-click="clickedConsentNo">{{t.consent_no}}</paper-button>
        </div>
      </paper-card>
      <div id="error-text"></div>
  `;
  }

  static get is() { return 'tangy-consent'; }
  static get properties() {
    return {
      name: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      value: {
        type: String,
        value: '',
        reflectToAttribute: true,
        observer: 'onValueChange'
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      required: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      prompt: {
        type: String,
        value: 'Does the child consent?',
        observer: 'onPromptChange',
        reflectToAttribute: true
      },
      invalid: {
        type: Boolean,
        value: false,
        observer: 'onInvalidChange',
        reflectToAttribute: true
      },
      hintText: {
        type: String,
        value: '',
        observer: 'onHintTextChange',
        reflectToAttribute: true
      },
      errorText: {
        type: String,
        value: '',
        reflectToAttribute: true
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.t = {
      'consent': t('Does the child consent?'),
      'consent_yes': t('yes, continue'),
      'consent_no': t('no, stop'),
      'message_yes': t('You marked Yes'),
      'message_no': t('You marked No')
    }
    // this.addEventListener('click', this.inputPressed.bind(this))
  }


  onHintTextChange(value) {
    this.shadowRoot.querySelector('.hint-text').innerHTML = value ? value : ''
  }

  onPromptChange(value) {
    this.shadowRoot.querySelector('#prompt').innerHTML = value ? value : ''
  }

  onInvalidChange(value) {
    if (value === false) {
      this.shadowRoot.querySelector('#error-text').innerHTML = ""
    } else {
      this.shadowRoot.querySelector('#error-text').innerHTML = `
        <iron-icon icon="error"></iron-icon> <div> ${this.errorText} </div>
      `
    }
  }

  clickedConsentYes() {
    this.value = 'yes'
  }

  clickedConsentNo() {
    this.value = 'no'
  }

  inputPressed() {
    if (this.disabled) return
    if (this.value == '') {
      this.value = 'on'
    } else {
      this.value = ''
    }
  }

  onValueChange(value) {

    let controlElements = [].slice.call(this.shadowRoot.querySelectorAll('paper-button'))
    controlElements.forEach(element => element.classList.remove('pressed'))

    switch (value) {
      case "yes":
        this.statusMessage = this.t.message_yes;
        this.$.consentYesButton.classList.add('pressed')
        break
      case "no":
        this.statusMessage = this.t.message_no;
        this.$.consentNoButton.classList.add('pressed')
        this.dispatchEvent(new CustomEvent('TANGY_INPUT_CONSENT_NO', {bubbles: true}))
        break
    }
  }

  validate() {
    if (this.required && !this.value) {
      this.setAttribute('invalid', '')
      return false
    } else {
      this.removeAttribute('invalid')
      return true
    }
  }


}

window.customElements.define(TangyConsent.is, TangyConsent);
