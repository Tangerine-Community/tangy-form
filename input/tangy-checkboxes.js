import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import {Loc} from "../util/loc";
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
        }
        
        tangy-checkbox {
          margin-top: 15px;
          margin-right: 25px;
        }
        span {
          font-size: .75em;
          display: block;
        }
        
        
      </style>
      <div class="container">
        <label for="group">[[label]]</label>
        <span class="secondary_color">[[t.selectOneOrMore]]</span>
        <div id="checkboxes">
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
        observer: 'reflect',
        reflectToAttribute: true
      },
      optionsListSource: {
        type: String,
        observer: 'reflect',
        value: ''
      },
      optionsListProperties: {
        type: String,
        observer: 'reflect',
        value: ''
      },
      optionsListExcludes: {
        type: String,
        observer: 'reflect',
        value: ''
      },
      optionsListExcludeBy: {
        type: String,
        observer: 'reflect',
        value: ''
      },
    }
  }

  get optionsList() {
    return this._optionsList ? this._optionsList : undefined
  }

  set optionsList(optionsList) {
    this._optionsList = optionsList
  }

  connectedCallback() {
    super.connectedCallback()

    if (this.optionsListSource) {
      let that = this
      const request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        try {
          that.optionsList = []
          let optionsDoc = JSON.parse(this.responseText)
          let propertyNames = that.optionsListProperties.split(",")
          let excludeList = that.optionsListExcludes.split(",")
          let name = propertyNames[0]
          let innerHTML = propertyNames[1]
          for (let item of optionsDoc) {
            let excludeOption = false
            for (let exclude of excludeList) {
              if (item[that.optionsListExcludeBy] === exclude) {
                excludeOption = true
              }
            }
            if (!excludeOption) {
              let option = {
                value: item[name],
                innerHTML: item[innerHTML]
              }
              that.optionsList.push(option)
            }
          }
          that.render()
          that.reflect()
          that.optionsListLoaded = true
          that.dispatchEvent(new CustomEvent('checkbox-options-loaded'))
        } catch (e) {
          // Do nothing. Some stages will not have valid JSON returned.
        }
      }
      request.open('GET', this.optionsListSource);
      request.send();
    } else {
      this.render()
      this.reflect()
    }
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
    this.$.checkboxes.innerHTML = ''
    // Populate options as tangy-radio-button elements
    let options = this.querySelectorAll('option')
    if (this.optionsListSource) {
      options = this.optionsList
    }
    for (let option of options) {
      let checkbox = document.createElement('tangy-checkbox')
      checkbox.name = option.value
      checkbox.innerHTML = option.innerHTML
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
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true, detail: {
        inputName: this.name,
        inputValue: newValue,
        inputIncomplete: false,
        inputInvalid: false
      }
    }))
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
window.customElements.define(TangyCheckboxes.is, TangyCheckboxes);
