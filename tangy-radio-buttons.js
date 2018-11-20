import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './tangy-radio-button.js'
import './tangy-element-styles.js';
import './tangy-common-styles.js'
/**
 * `tangy-radio-buttons`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TangyRadioButtons extends PolymerElement {

  static get is() { return 'tangy-radio-buttons'; }

  constructor() {
    super()
    this.value = []
    this.t = {
      'selectOnlyOne': t('Select only one')
    }
  }

  static get template() {
    return html`
      <style include="tangy-element-styles"></style>
      <style include="tangy-common-styles"></style>

      <style>
        span {
          font-size: .75em;
          display: block;
        }
        :host([columns]) tangy-radio-button {
          padding: 0px;
          margin: 15px 0px 0px;
        }
        :host([hide-buttons]) tangy-radio-button {
          border: 5px solid white;
        }
        :host([hide-buttons]) tangy-radio-button[value="on"] {
          border: 5px solid green;
        }
        :host([no-margin]) tangy-radio-button {
          padding: 0px;
          margin: 0px 0px !important;
          border: 0px;
        }
        :host([columns="0"]) tangy-radio-button {
          display: block;
        }
        .row {
          display: inline-block;
        }
      </style>


      <div class="container">
        <label for="group">[[label]]</label>
        <template is="dom-if" if="{{!hideHelpText}}">
          <span  class="secondary_color">[[t.selectOnlyOne]]</span>
        </template>
        <div id="container"></div>
      </div>
    `;
  }

  static get properties() {
    return {
      hideButtons: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      hideHelpText: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      name: {
        type: String,
        value: '',
        observer: 'reflect',
        reflectToAttribute: true
      },
      value: {
        type: Array,
        value: [],
        observer: 'reflect',
        reflectToAttribute: true
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
      label: {
        type: String,
        value: '',
        observer: 'reflect',
        reflectToAttribute: true
      },
      hidden: {
        type: Boolean,
        value: false,
        observer: 'reflect',
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
        observer: 'reflect',
        reflecttoattribute: true
      },
      columns: {
        type: Number,
        value: 0,
        observer: 'render',
        reflectToAttribute: true
      },
      noMargin: {
        type: Boolean,
        value: false,
        observer: 'reflect',
        reflecttoattribute: true
      }
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.render()
    this.reflect()
  }

  reflect() {
    this.shadowRoot.querySelectorAll('tangy-radio-button').forEach(el => {
      let matchingState = this.value.find(state => el.name == state.name)
      el.setProps(matchingState)
      el.disabled = this.disabled
      el.hidden = this.hidden
    })
  }

  render() {
    this.$.container.innerHTML = ''
    // Populate options as tangy-radio-button elements
    let options = this.querySelectorAll('option')
    let columnNumber = 1
    let row = document.createElement('div')
    row.classList.add('row')
    for (let option of options) {
      let el = document.createElement('tangy-radio-button')
      el.hideButton = this.hideButtons ? true : false
      el.name = option.value
      el.innerHTML = option.innerHTML
      if (this.columns > 0) {
        el.style.width = `${Math.floor(100*(1/this.columns))}%`
        el.style.float = 'left'
        if (columnNumber%this.columns === 0) {
          row.appendChild(el)
          this.$.container.appendChild(row)
          row = document.createElement('div')
          row.classList.add('row')
        } else {
          row.appendChild(el)
        }
        columnNumber++
      } else {
        this.$.container.appendChild(el)
      }
    }

    let newValue = []
    this
      .shadowRoot
      .querySelectorAll('tangy-radio-button')
      .forEach((el) => {
        el.addEventListener('change', this.onRadioButtonChange.bind(this))
        newValue.push(el.getProps())
      })
    if (!this.value || (typeof this.value === 'object' && this.value.length < newValue.length)) {
      this.value = newValue
    }

  }

  onRadioButtonChange(event) {
    let targetButton = event.target
    if (targetButton.value = 'on') {
      this
        .$
        .container
        .querySelectorAll('tangy-radio-button')
        .forEach(el => {
          if (el.name !== targetButton.name && targetButton.value == 'on') {
            el.value = ''
          }
        })
    }

    let newValue = []
    this.shadowRoot
      .querySelectorAll('tangy-radio-button')
      .forEach(el => newValue.push(el.getProps()))
    this.value = newValue
    this.dispatchEvent(new CustomEvent('change'))

  }

  validate() {
    let foundOne = false
    this.shadowRoot.querySelectorAll('[name]').forEach(el => {
      if (el.value === 'on') foundOne = true
    })
    if (this.required && !this.hidden && !this.disabled && !foundOne) {
      this.invalid = true
      return false
    } else {
      this.invalid = false
      return true
    }
  }

}
window.customElements.define(TangyRadioButtons.is, TangyRadioButtons);
