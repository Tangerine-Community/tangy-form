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
    .mdc-error {
        border: solid var(--error-color) 5px;
    }
</style>
    <div id="container"></div>
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
    this.$.container.innerHTML = ''
    let options = []
    this.querySelectorAll('option').forEach(optionEl => options.push(optionEl))
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
      </div>
      <div class="mdc-select__bottom-line"></div>
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
      this.shadowRoot.querySelector('select').classList.add('mdc-error')
      return false
    } else {
      this.invalid = false
      this.shadowRoot.querySelector('select').classList.remove('mdc-error')
      return true
    }
  }

}
window.customElements.define(TangySelect.is, TangySelect);
