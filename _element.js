import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `tangy-form`
 * A form element for lazy loaded multipage forms
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TangyForm extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'tangy-form',
      },
    };
  }
}

window.customElements.define('tangy-form', TangyForm);
