import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { t } from '../util/t.js'
import '../util/html-element-props.js'
import './tangy-checkbox.js'
import '../style/tangy-element-styles.js';
import '../style/tangy-common-styles.js'

/**
 * `tangy-checkboxes`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TangyCheckboxes extends PolymerElement {

  static get is() { return 'tangy-checkboxes'; }

  constructor() {
    super()
    this.t = {
      'selectOneOrMore': t('Select one or more')
    }
  }

  static get template() {
    return html`
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <style>

        :host {
          @apply --tangy-font-common-base;
          /*--tangy-element-margin: 15px 25px 10px 10px;*/
        }
        
        :host([invalid]) #hintText {
          position: relative;
          top: 5px;
        }

          tangy-checkbox {
            margin: 10px 0 15px;
          }

      </style>

      <div class="flex-container m-y-25">
        <div id="qnum-number"></div>
        <div id="qnum-content">
          <label id="label" for="group"></label>
          <label id="hint-text" class="hint-text"></label>
          <div id="checkboxes"></div>
          <label id="error-text" class="error-text"></label>
          <div id="warn-text"></div>
          <div id="discrepancy-text"></div>
        </div>
      </div>

    `;
  }

  static get properties() {
    return {
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
      hintText: {
        type: String,
        value: '',
        observer: 'reflect',
        reflectToAttribute: true
      },
      atLeast: {
        type: Number,
        value: 0,
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
        observer: 'reflect',
        value: ''
      },
      hidden: {
        type: Boolean,
        value: false,
        observer: 'reflect',
        reflectToAttribute: true
      },
      incomplete: {
        type: Boolean,
        value: true,
        observer: 'reflect',
        reflectToAttribute: true
      },
      invalid: {
        type: Boolean,
        value: false,
        observer: 'onInvalidChange',
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
      errorText: {
        type: String,
        value: '',
        observer: 'reflect',
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
      },
      questionNumber: {
        type: String,
        value: '',
        observer: 'reflect',
        reflectToAttribute: true
      }
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.render()
    this.reflect()
  }

  reflect() {
    this.shadowRoot.querySelectorAll('tangy-checkbox').forEach(el => {
      let matchingState = this.value.find(state => el.name == state.name)
      el.setProps(matchingState)
      el.disabled = this.disabled
      el.hidden = this.hidden
    })
  }

  render() {
    this.$['qnum-number'].innerHTML = `<label>${this.questionNumber}</label>`;
    this.$.label.innerHTML = this.label
    this.$['hint-text'].innerHTML = this.hintText
    this.$.checkboxes.innerHTML = ''
    // Populate options as tangy-check-box elements
    let options = this.querySelectorAll('option')
    for (let option of options) {
      let checkbox = document.createElement('tangy-checkbox')
      if (option.hasAttribute('hint-text')) {
        checkbox.setAttribute('hint-text', option.getAttribute('hint-text'))
      }
      checkbox.name = option.value
      checkbox.innerHTML = option.innerHTML
      checkbox.hintText = option.getAttribute('hint-text')
      this.$.checkboxes.appendChild(checkbox)
    }
 
    let newValue = []
    this
      .shadowRoot
      .querySelectorAll('tangy-checkbox')
      .forEach((el) => {
        el.addEventListener('change', this.onCheckboxClick.bind(this))
        newValue.push(el.getProps())
      })
    if (!this.value || (typeof this.value === 'object' && this.value.length < newValue.length)) {
      this.value = newValue
    }
  }

  onCheckboxClick(event) {
    let newValue = []
    this.shadowRoot
      .querySelectorAll('tangy-checkbox')
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
      this.$['error-text'].innerHTML = '';
      return true
    }
  }

  onInvalidChange(value) {
    this.shadowRoot.querySelector('#error-text').innerHTML = this.invalid
      ? `<iron-icon icon="error"></iron-icon> <div> ${ this.hasAttribute('error-text') ? this.getAttribute('error-text') : ''} </div>`
      : ''
  }

  onDiscrepancyChange(value) {
    this.shadowRoot.querySelector('#discrepancy-text').innerHTML = this.hasDiscrepancy
      ? `<iron-icon icon="flag"></iron-icon> <div> ${ this.hasAttribute('discrepancy-text') ? this.getAttribute('discrepancy-text') : ''} </div>`
      : ''
  }

  onWarnChange(value) {
    this.shadowRoot.querySelector('#warn-text').innerHTML = this.hasWarning
      ? `<iron-icon icon="warning"></iron-icon> <div> ${ this.hasAttribute('warn-text') ? this.getAttribute('warn-text') : ''} </div>`
      : ''
  }

}
window.customElements.define(TangyCheckboxes.is, TangyCheckboxes);
