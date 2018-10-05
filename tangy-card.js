import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-checkbox/paper-checkbox.js'
import './tangy-common-styles.js'
import './tangy-element-styles.js'

    /**
     * `tangy-card`
     *
     *
     * @customElement
     * @polymer
     * @demo demo/index.html
     */
export class TangyCard extends PolymerElement {
  static get template () {
    return html`
    <style include="tangy-common-styles"></style>
    <style include="tangy-element-styles"></style>
    <paper-card id="content">
    </paper-card>
    <span id="remove" on-click="remove">[x] remove</span>
    `
  }

  static get is () {
    return 'tangy-card'
  }

  static get _props() {
   return ['name','value','label','disabled','invalid','incomplete','hidden']
  }

  static get properties () {
    return {
      name: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      label: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      invalid: {
        type: Boolean,
        value: false,
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
        reflectToAttribute: true
      }

    }
  }

  connectedCallback () {
    super.connectedCallback()
    this._template = this.innerHTML
    this.innerHTML = ''
    this.$.content.innerHTML = this._template
  }

  get value() {
		if (this.shadowRoot && this.$.content.querySelectorAll('[name]').length > 0) {
      this._value = [...this.$.content.querySelectorAll('[name]')].map(inputEl => inputEl.getProps())
    }
    return this._value ? this._value : []
  }

  set value(value) {
		this._value = value
		this._value.forEach(inputProps => this.$.content.querySelector(`[name=${inputProps.name}]`).setProps(inputProps))
  }

  validate() {
    /*
    let validateStates = [...this.querySelectorAll('[name]')].map(inputEl => inputEl.validate())
    if (validateStates.indexOf(false) !== -1) {
      return false
    } else {
      return true
    }
    */
  }

  remove() {
    this.dispatchEvent(new CustomEvent('card-remove'))
  }

}
window.customElements.define(TangyCard.is, TangyCard)
