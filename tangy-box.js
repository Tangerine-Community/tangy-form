import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
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
export class TangyBox extends PolymerElement {
  static get template () {
    return html`
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <slot></slot>
    `
  }

  static get is () {
    return 'tangy-box'
  }

  static get properties () {
    return {
      name: {
        type: String,
        value: '',
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

}
window.customElements.define(TangyBox.is, TangyBox)
