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

    </style>
    <div id="container">
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
      errorMessage: {
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
      allowedPattern: {
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
      }
    }
  }

  connectedCallback() {
    super.connectedCallback()
    // Template.
    this.$.container.innerHTML = `      
      <label id="label"></label>
      ${
        this.getAttribute('type') === 'email' ||
        this.getAttribute('type') === 'number' ||
        this.getAttribute('type') === 'date' ||
        this.getAttribute('type') === 'time' ||
        this.getAttribute('allowed-pattern')
        ? `<paper-textarea id="input"></paper-textarea>`
        : `<paper-input id="input"></paper-input>`
      }
      <label id="hintText"></label>
    `
    // Listen for user changes.
    this.shadowRoot.querySelector('#input').addEventListener('value-changed', (event) => {
      this.value = this.shadowRoot.querySelector('#input').value
      // @TODO tangy-form-item's listener for change events is not capturing this.
      let incomplete = (event.target.value === '') ? true : false
      this.value = event.target.value
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
    this.shadowRoot.querySelector('#hintText').innerHTML = this.hintText
    this.shadowRoot.querySelector('#label').innerHTML = this.label
    this.shadowRoot.querySelector('#input').placeholder = combTranslations(this.placeholder)
    this.shadowRoot.querySelector('#input').label = this.innerLabel === '' 
      ? t('Enter your response to above question here') 
      : combTranslations(this.innerLabel)
    this.shadowRoot.querySelector('#input').errorMessage = combTranslations(this.errorMessage)
    this.shadowRoot.querySelector('#input').allowedPattern = this.allowedPattern
    //this.shadowRoot.querySelector('#input').value = this.value
    this.shadowRoot.querySelector('#input').setAttribute('value', this.value)
    this.shadowRoot.querySelector('#input').min = this.min
    this.shadowRoot.querySelector('#input').max = this.max
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
    } else {
      this.shadowRoot.querySelector('#input').setAttribute('invalid', true)
    }
  }

  validate() {
    return this.shadowRoot.querySelector('#input').validate()
  }

}
window.customElements.define(TangyInput.is, TangyInput);
