import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './tangy-common-styles.js'
import './tangy-eftouch-slide.js';

/**
 * `tangy-acasi`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class TangyEftouch extends PolymerElement {

  constructor() {
    super()
  }


  static get is() {
    return 'tangy-eftouch'
  }

  static get _props() {
    return ['name','onChange','value','required','disabled','label','hidden','invalid','incomplete']
  }

  static get properties() {
    return {
      name: {
        type: String,
        value: ''
      },
      onChange: {
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
      required: {
        type: Boolean,
        value: false
      },
      disabled: {
        type: Boolean,
        value: false,
        observer: 'onDisabledChange',
        reflectToAttribute: true
      },
      label: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      hidden: {
        type: Boolean,
        value: false,
        observer: 'onHiddenChange',
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
      }
    };
  }

  static get template () {
    return html`
    <div id="slides"><slot></slot></div> 
    `
  }

  connectedCallback () {
    super.connectedCallback()
  }

  render(value) {
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
        <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
`


  }

}
window.customElements.define(TangyEftouch.is, TangyEftouch)
