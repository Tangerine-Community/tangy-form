import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../util/html-element-props.js'
import '../style/tangy-element-styles.js';
import '../style/tangy-common-styles.js'
import '../style/mdc-select-style.js'
import { combTranslations } from 'translation-web-component/util.js'
import { t } from '../util/t.js'

/**
 * `tangy-select`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TangySelect extends PolymerElement {
  static get template() {
    return html`
    <style include="tangy-element-styles"></style>
    <style include="tangy-common-styles"></style>
    <style include="mdc-select-style"></style>

    <style>
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
      <div id="qnum"></div>
      <div id="container">
    </div>
  </div>
    `;
  }

  static get is() { return 'tangy-select'; }

  static get properties() {
    return {
      name: {
        type: String,
        value: ''
      },
      value: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      hintText: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      required: {
        type: Boolean,
        value: false
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      label: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      optionSelectLabel: {
        type: String,
        value: t('----'),
        reflectToAttribute: true
      },
      // deprecated
      secondaryLabel: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      hidden: {
        type: Boolean,
        value: false
      },
      invalid: {
        type: Boolean,
        value: false
      },
      incomplete: {
        type: Boolean,
        value: true
      },
      questionNumber: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      errorText: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
    }
  }

  connectedCallback() {
    super.connectedCallback()
    const observer = new MutationObserver(this.render.bind(this))
    observer.observe(this, { attributes: true, childList: true, subtree: true })
    this.render()
  }
  
  render() {
    this.$.qnum.innerHTML = `<label>${this.questionNumber}</label>`;
    
    this.$.container.innerHTML = ''
    let options = []
    this.querySelectorAll('option').forEach(optionEl => options.push(optionEl))
    this.optionSelectLabel = this.secondaryLabel === '' ? this.optionSelectLabel : this.secondaryLabel
    this.$.container.innerHTML = `
      <label for="group">${this.label}</label>
      <label class="hint-text">${this.hintText}</label>
      <div class="mdc-select">
        <select class="mdc-select__surface" value="${this.value}" ${this.disabled ? 'disabled' : ''}>
            <option value="" default selected disabled>${this.optionSelectLabel}</option>
          ${options.map((option, i) => `
            <option 
              value="${option.value}" 
              ${this.value === option.value ? 'selected' : ''}
            >
              ${combTranslations(option.innerHTML)}
            </option>
          `)}
        </select>
        <div class="mdc-select__bottom-line"></div>
      </div>
      <label id="errorText"></label>
    `
    this._onChangeListener = this
      .shadowRoot
      .querySelector('select')
      .addEventListener('change', this.onChange.bind(this))
    this.dispatchEvent(new CustomEvent('render'))
  }

  onChange(event) {
    this.value = event.target.value 
    this.dispatchEvent(new CustomEvent('change'))
  }

  validate() {
    if (this.required && !this.hidden && !this.disabled && !this.value) {
      this.invalid = true
      this.shadowRoot.querySelector('#errorText').innerHTML = `
      ${(this.errorText !== "" ? `<iron-icon icon="error""></iron-icon><div>` : '')}
      ${this.errorText}</div>`
      return false
    } else {
      this.invalid = false
      this.shadowRoot.querySelector('#errorText').innerHTML = '';
      return true
    }
  }

}
window.customElements.define(TangySelect.is, TangySelect);
