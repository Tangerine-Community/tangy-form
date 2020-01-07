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
 
    </style>

    <div class="flex-container m-y-25">
      <div id="qnum-number"></div>
      <div id="qnum-content">
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
      hasWarning: {
        type: Boolean,
        value: false,
        observer: 'onWarnChange',
        reflectToAttribute: true
      },
      hasDiscrepancy: {
        type: Boolean,
        value: false,
        observer: 'onDiscrepancyChange',
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
      skipped: {
        type: Boolean,
        value: false,
        observer: 'onSkippedChange',
        reflectToAttribute: true
      },
      invalid: {
        type: Boolean,
        observer: 'onInvalidChange',
        value: false,
        reflectToAttribute: true
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
        observer: 'onInvalidChange',
        reflectToAttribute: true
      },
      warnText: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      discrepancyText: {
        type: String,
        value: '',
        reflectToAttribute: true
      }
    }
  }

  connectedCallback() {
    super.connectedCallback()
    const observer = new MutationObserver(this.render.bind(this))
    observer.observe(this, { attributes: true, childList: true, subtree: true })
    this.render()
  }
  
  render() {
    this.$['qnum-number'].innerHTML = `<label>${this.questionNumber}</label>`;
    
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
      <label id="error-text">
        ${
          this.invalid
            ? `<iron-icon icon="error"></iron-icon> <div> ${ this.hasAttribute('error-text') ? this.getAttribute('error-text') : ''} </div>`
            : ''
        }
      </label>
      <div id="warn-text">
        ${this.hasWarning
          ? `<iron-icon icon="warning"></iron-icon> <div> ${ this.hasAttribute('warn-text') ? this.getAttribute('warn-text') : ''} </div>`
          : ''
        }
      </div>
      <div id="discrepancy-text">
        ${this.hasDiscrepancy
          ? `<iron-icon icon="flag"></iron-icon> <div> ${ this.hasAttribute('discrepancy-text') ? this.getAttribute('discrepancy-text') : ''} </div>`
          : ''
        }
      </div>
    `
    this._onChangeListener = this
      .shadowRoot
      .querySelector('select')
      .addEventListener('change', this.onChange.bind(this))
    this.dispatchEvent(new CustomEvent('render'))
  }

  onInvalidChange(value) {
    // @TODO I'm not sure this hook is what ends up causing the error message to be displayed.
    if (this.shadowRoot.querySelector('#error-text')) {
      this.shadowRoot.querySelector('#error-text').innerHTML = this.invalid
        ? `<iron-icon icon="error"></iron-icon> <div> ${ this.hasAttribute('error-text') ? this.getAttribute('error-text') : ''} </div>`
        : ''
    }
  }

  onChange(event) {
    this.value = event.target.value 
    this.dispatchEvent(new CustomEvent('change'))
  }

  validate() {
    if (this.required && !this.hidden && !this.disabled && !this.value) {
      this.invalid = true
      return false
    } else {
      this.invalid = false
      return true
    }
  }

  onSkippedChange(newValue, oldValue) {
    if (newValue === true) {
      this.value = this.constructor.properties.value.value
      this.render()
    }
  }

}
window.customElements.define(TangySelect.is, TangySelect);
