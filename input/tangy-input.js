import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { t } from '../util/t.js'
import '../util/html-element-props.js'
import '@polymer/paper-input/paper-textarea.js'
import '@polymer/paper-input/paper-input.js'
import '../style/tangy-common-styles.js'
import '../style/tangy-element-styles.js'
import { combTranslations } from 'translation-web-component/util.js'

/**
 * `tangy-input`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class TangyInput extends PolymerElement {

  static get template() {
    return html`
    <style include="tangy-common-styles"></style>
    <style include="tangy-element-styles"></style>
    <style>
      paper-input, paper-textarea {
        --paper-input-container-shared-input-style_-_font-size: 1em;
        --paper-font-subhead_-_font-size: 1em;
        --paper-font-subhead_-_line-height: 1em;
      }
      :host([invalid]) #hintText {
        position: relative;
        top: 5px;
      }

      #errorText {
        padding: 10px 10px 10px 0px;
        font-size: medium;
        font-weight: bold;
        color: var(--error-color);
      }

      label.hint-text {
        color: gray;
        font-size: 1em;
        font-weight: lighter;
      }
    </style>
    <div class="flex-container m-y-25">
      <div id="qnum-number"></div>
      <div id="qnum-content">
        <div id="container"></div>
      </div>
    </div>

  `
  }

  static get is() { return 'tangy-input'; }

  static get properties() {
    return {
      name: {
        type: String,
        value: ''
      },
      private: {
        type: Boolean,
        value: false
      },
      label: {
        type: String,
        observer: 'reflect',
        value: ''
      },
      innerLabel: {
        type: String,
        observer: 'reflect',
        value: ''
      },
      placeholder: {
        type: String,
        observer: 'reflect',
        value: ''
      },
      hintText: {
        type: String,
        observer: 'reflect',
        value: ''
      },
      type: {
        type: String,
        observer: 'reflect',
        value: ''
      },

      required: {
        type: Boolean,
        value: false,
        observer: 'reflect',
        reflectToAttribute: true
      },
      disabled: {
        type: Boolean,
        value: false,
        observer: 'reflect',
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
        observer: 'reflect',
        reflectToAttribute: true
      },
      incomplete: {
        type: Boolean,
        value: true,
        reflectToAttribute: true
      },
      value: {
        type: String,
        value: '',
        observer: 'reflect',
        reflectToAttribute: true
      },
      min: {
        type: String,
        value: '',
        observer: 'reflect',
        reflectToAttribute: true
      },
      max: {
        type: String,
        value: '',
        observer: 'reflect',
        reflectToAttribute: true
      },
      questionNumber: {
        type: String,
        value: '',
        observer: 'reflect',
        reflectToAttribute: true
      },
      errorText: {
        type: String,
        value: '',
        observer: 'reflect',
        reflectToAttribute: true
      },
      // allowedPattern and errorMessage are for passing down to paper-input's API of the same name. We are probably going to drop this usage in favor of the tangy API of valid-if and error-text. Consider these items deprecated.
      allowedPattern: {
        type: String,
        value: '',
        observer: 'reflect',
        reflectToAttribute: true
      },
      errorMessage: {
        type: String,
        observer: 'reflect',
        value: ''
      }
    }
  }

  connectedCallback() {
    super.connectedCallback()
    // Template.
    this.$.container.innerHTML = `   
      <label id="label"></label>
      <label id="hintText" class="hint-text"></label>
      ${
        this.getAttribute('type') === 'email' ||
        this.getAttribute('type') === 'number' ||
        this.getAttribute('type') === 'date' ||
        this.getAttribute('type') === 'time' ||
        this.getAttribute('allowed-pattern')
        ? `<paper-input id="input"></paper-input>`
        : `<paper-textarea id="input"></paper-textarea>`
      }
      <div id="errorText"></div>    
    
    `
    // Listen for user changes.
    this.shadowRoot.querySelector('#input').addEventListener('value-changed', (event) => {
      // Prevent infinite loops because this event is triggered by reflecting a value change.
      if (this.justReflectedValue) {
        this.justReflectedValue = false
        return
      }
      // Now it's safe to set this.value.
      this.value = event.target.value
      let incomplete = (event.target.value === '') ? true : false
      this.dispatchEvent(new Event('change', {
        detail: {
          inputName: this.name,
          inputValue: event.target.value,
          inputIncomplete: incomplete,
          inputInvalid: !this.shadowRoot.querySelector(`#input`).validate()
        },
        bubbles: true
      }))
    })
    this.ready = true
    this.reflect()

  }

  reflect() {
    if (!this.ready) return
    if (!this.shadowRoot.querySelector('#input')) return
    // Reflect data into DOM.


    this.$['qnum-number'].innerHTML = `<label>${this.questionNumber}</label>`;
    this.shadowRoot.querySelector('#hintText').innerHTML = this.hintText
    this.shadowRoot.querySelector('#label').innerHTML = this.label
    this.shadowRoot.querySelector('#input').placeholder = combTranslations(this.placeholder)
    this.shadowRoot.querySelector('#input').label = this.innerLabel === '' 
      ? t('Enter your response to above question here') 
      : combTranslations(this.innerLabel)
    this.shadowRoot.querySelector('#input').errorMessage = combTranslations(this.errorMessage)

    this.shadowRoot.querySelector('#input').allowedPattern = this.allowedPattern
    this.shadowRoot.querySelector('#input').setAttribute('type', this.type ? this.type : 'text')
    // When comparing the values, make sure they are always strings as opposed to different kinds of untruthiness.
    const cleanOuterValue = this.value
      ? this.value
      : ''
    const cleanInnerValue = this.shadowRoot.querySelector('#input').value
      ? this.shadowRoot.querySelector('#input').value
      : ''
    if (cleanOuterValue !== cleanInnerValue || this.shadowRoot.querySelector('#input').value === undefined) {
      // Prevent infinite loops with this semaphore which will be caught by the value-changed listener above.
      this.justReflectedValue = true
      this.shadowRoot.querySelector('#input').value = this.value
    }
    this.shadowRoot.querySelector('#input').setAttribute('min', this.min)
    this.shadowRoot.querySelector('#input').setAttribute('max', this.max)
    if (this.required === false) {
      this.shadowRoot.querySelector('#input').removeAttribute('required')
    } else {
      this.shadowRoot.querySelector('#input').setAttribute('required', true)
    }
    if (this.disabled === false) {
      this.shadowRoot.querySelector('#input').removeAttribute('disabled')
    } else {
      this.shadowRoot.querySelector('#input').setAttribute('disabled', true)
    }
    if (this.invalid === false) {
      this.shadowRoot.querySelector('#input').removeAttribute('invalid')
      this.shadowRoot.querySelector('#errorText').innerHTML = ""
    } else {
      this.shadowRoot.querySelector('#input').setAttribute('invalid', true)
      this.shadowRoot.querySelector('#errorText').innerHTML = `
      ${(this.errorText !== "" ? `<iron-icon icon="error"></iron-icon><div>` : '')}
      ${this.errorText}</div>`
    }
  }

  validate() {
    return this.shadowRoot.querySelector('#input').validate()
  }

}
window.customElements.define(TangyInput.is, TangyInput);
