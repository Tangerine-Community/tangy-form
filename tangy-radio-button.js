import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { t } from './t.js'
import './html-element-props.js'
import '@polymer/paper-radio-button/paper-radio-button.js'
import './tangy-common-styles.js'
import './tangy-element-styles.js'

    /**
     * `tangy-radio-button`
     *
     *
     * @customElement
     * @polymer
     * @demo demo/index.html
     */
export class TangyRadioButton extends PolymerElement {
  static get template () {
    return html``
  }

  static get is () {
    return 'tangy-radio-button'
  }

  static get properties () {
    return {
      hideButton: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      name: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      label: {
        type: String,
        value: ''
      },
      required: {
        type: Boolean,
        value: false,
        observer: 'render',
        reflectToAttribute: true
      },
      disabled: {
        type: Boolean,
        value: false,
        observer: 'render',
        reflectToAttribute: true
      },
      invalid: {
        type: Boolean,
        value: false,
        observer: 'render',
        reflectToAttribute: true
      },
      incomplete: {
        type: Boolean,
        value: true,
        reflectToAttribute: true
      },
      hidden: {
        type: Boolean,
        value: false,
        observer: 'render',
        reflectToAttribute: true
      },
      value: {
        type: String,
        value: '',
        observer: 'render',
        reflectToAttribute: true
      }

    }
  }

  connectedCallback () {
    super.connectedCallback()
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `    
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <paper-radio-button
        ${this.required ? 'required' : ''}
        ${this.invalid ? 'invalid' : ''}
        ${this.disabled ? 'disabled' : ''}
        ${this.hidden ? 'hidden' : ''}
        ${this.value ? 'checked' : ''}
        >
        ${this.label ? this.label : this.innerHTML}
      </paper-radio-button>
    `
    if (this.hideButton) this.shadowRoot.querySelector('paper-radio-button').shadowRoot.querySelector('#radioContainer').style.display = 'none'
    this.shadowRoot.querySelector('paper-radio-button').addEventListener('change', (e) => {
      e.stopPropagation()
      let incomplete = (!e.target.checked)
      this.value = e.target.checked ? 'on' : ''
      this.dispatchEvent(new CustomEvent('change', { bubbles: true }))
      // @TODO Deprecated API. Remove ready?
      this.dispatchEvent(new CustomEvent('INPUT_VALUE_CHANGE', {
        bubbles: true,
        detail: {
          inputName: this.name,
          inputValue: !!(e.target.checked),
          inputIncomplete: incomplete,
          inputInvalid: !this.shadowRoot.querySelector('paper-radio-button').validate()
        }
      }))
    })
  }

}
window.customElements.define(TangyRadioButton.is, TangyRadioButton)
