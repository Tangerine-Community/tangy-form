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

  static get is() {
    return 'tangy-eftouch'
  }

  static get properties() {
    return {
      columns: {
        type: Number,
        value: 1,
        reflectToAttribute: true,
        observer: 'render'
      },
      autoProgress: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
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
        type: Object,
        value: {startTime: 0, selectionTime: 0, selection: ''},
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
      hidden: {
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
      }
    };
  }

  static get template () {
    return html``
  }

  connectedCallback () {
    super.connectedCallback()
    this.render()
  }

  render(value) {
    const options = [...this.querySelectorAll('option')]
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
      <tangy-radio-buttons columns="${this.columns}" hide-buttons>
        ${options.map(option => `
          <option value="${option.value}">${option.getAttribute('src') ? `<img style="width:100%" src="${option.getAttribute('src')}">` : option.innerHTML}</option>
        `)}
      </tangy-radio-buttons>
    `
    this.shadowRoot.querySelector('tangy-radio-buttons').addEventListener('change', _ => this.onRadioChange(_.target))
  }

  onRadioChange(radioButtons) {
    this.value = Object.assign({}, this.value, {
      selection: radioButtons.value.find(button => button.value === 'on') ? radioButtons.value.find(button => button.value === 'on').name : '',
      selectionTime: new Date().getTime()
    })
    this.dispatchEvent(new Event('change'))
    if (this.autoProgress) {
      this.dispatchEvent(new CustomEvent('next'))
    }
  }

}
window.customElements.define(TangyEftouch.is, TangyEftouch)
