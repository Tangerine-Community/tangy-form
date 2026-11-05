import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../util/html-element-props.js'
import '@polymer/paper-checkbox/paper-checkbox.js'
import '../style/tangy-common-styles.js'
import '../style/tangy-element-styles.js'
import { TangyInputBase } from '../tangy-input-base.js'
import { optionImage } from '../util/option-layout.js'

    /**
     * `tangy-checkbox`
     *
     *
     * @customElement
     * @polymer
     * @demo demo/index.html
     */
export class TangyCheckbox extends TangyInputBase {
  static get template () {
    return html`
    <style include="tangy-common-styles"></style>
    <style include="tangy-element-styles"></style>
    <style>
        :host {
          --tangy-element-border: 0;
        }
        .option-image {
          display: var(--tangy-option-image-display, inline-block);
          max-width: var(--tangy-option-image-width, 50px);
          max-height: var(--tangy-option-image-height, 50px);
          vertical-align: middle;
          margin: 0 .5em .25em 0;
        }
        .option-image[hidden] {
          display: none;
        }
        /* image-display="top": picture above the centred label. */
        :host([image-display="top"]) .option-image {
          display: block;
          margin: 0 auto .25em;
        }
        /* image-display="fill": the picture is the answer and covers the tile; the text stays for screen readers. */
        :host([image-display="fill"]) :is(.flex-container, #qnum-content, paper-checkbox) {
          display: block;
          width: 100%;
        }
        :host([image-display="fill"]) .option-image {
          display: block;
          margin: 0;
          width: 100%;
          height: auto;
          aspect-ratio: 1;
          max-width: none;
          max-height: none;
          object-fit: cover;
        }
        :host([image-display="fill"]) :is(#checkbox-text, #hint-text) {
          font-size: 0;
        }
      </style>
      
    <div class="flex-container">
      <div id="qnum-number"></div>
      <div id="qnum-content">
        <paper-checkbox id="checkbox" id="checkbox">
          <img id="optionImage" class="option-image" alt="" hidden>
          <div id="checkbox-text">
          </div>
          <label id="hint-text" class="hint-text"></label>
          </label>
        </paper-checkbox>
        <div id="error-text"></div>
        <div id="warn-text"></div>
        <div id="discrepancy-text"></div>
      </div>
    </div>
    `
  }

  static get is () {
    return 'tangy-checkbox'
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
        observer: 'applyLabel',
        reflectToAttribute: true
      },
      required: {
        type: Boolean,
        value: false,
        observer: 'onRequiredChange',
        reflectToAttribute: true
      },
      disabled: {
        type: Boolean,
        value: false,
        observer: 'onDisabledChange',
        reflectToAttribute: true
      },
      invalid: {
        type: Boolean,
        value: false,
        observer: 'onInvalidChange',
        reflectToAttribute: true
      },
      hintText: {
        type: String,
        value: '',
        reflectToAttribute: true,
        observer: 'onHintTextChanged'
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
      incomplete: {
        type: Boolean,
        value: true,
        reflectToAttribute: true
      },
      hidden: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      skipped: {
        type: Boolean,
        value: false,
        observer: 'onSkippedChange',
        reflectToAttribute: true
      },
      value: {
        type: String,
        value: '',
        observer: 'onValueChange',
        reflectToAttribute: true
      },
      errorText: {
        type: String,
        value: '',
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
      identifier: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    }
  }

  connectedCallback () {
    super.connectedCallback()
    this.render()
  }

  // In a layout ("boxed") the whole box is the target: a tap on its empty space is passed to paper-checkbox.
  listenForBoxTap() {
    if (this.__boxTap) return
    this.__boxTap = true
    this.addEventListener('click', (event) => {
      if (!this.hasAttribute('boxed')) return
      // Match by tag: the option re-renders its shadow DOM while the tap is handled.
      if (event.composedPath().some((node) => node.localName === 'paper-checkbox')) return
      const control = this.shadowRoot.querySelector('paper-checkbox')
      if (control) control.click()
    })
  }

  render() {
    const image = optionImage(this)
    this.listenForBoxTap()
    // In a layout the box border shows the choice, so the tick box goes.
    if (this.hasAttribute('boxed')) this.$.checkbox.shadowRoot.querySelector('#checkboxContainer').style.display = 'none'
    // paper-checkbox's label box sizes to its content; a filling picture needs the full width.
    if (this.getAttribute('image-display') === 'fill') this.$.checkbox.shadowRoot.querySelector('#checkboxLabel').style.width = '100%'
    if (image) this.$.optionImage.src = image
    this.$.optionImage.hidden = !image
    if (this.value) {
      this.$.checkbox.checked = true
    } else {
      this.$.checkbox.checked = false
    }
    if (this.label == '' && this.innerHTML !== '') {
     this.label = this.innerHTML
    }
    this.$.checkbox.addEventListener('change', (e) => {
      e.stopPropagation()
      let incomplete = (!e.target.checked)
      this.value = e.target.checked ? 'on' : ''
      this.dispatchEvent(new Event('change', { bubbles: true }))
      this.dispatchEvent(new CustomEvent('INPUT_VALUE_CHANGE', {
        bubbles: true,
        detail: {
          inputName: this.name,
          inputValue: !!(e.target.checked),
          inputIncomplete: incomplete,
          inputInvalid: !this.$.checkbox.validate()
        }
      }))
    })
    document.body.addEventListener('lang-change', () => {
      // 'lang-change' comes from the translation-web-component 't-select' element
      if (document.documentElement.langDirection) {
        this.shadowRoot.querySelector('paper-checkbox').dir = document.documentElement.langDirection;
      }
    });
    this.$['hint-text'].innerHTML = this.hintText
    this.shadowRoot.querySelector('.hint-text').innerHTML = this.hasAttribute('hint-text') 
      ? this.getAttribute('hint-text') 
      : ''
    this.shadowRoot.querySelector('#qnum-number').innerHTML = this.hasAttribute('question-number') 
      ? `<label>${this.getAttribute('question-number')}</label>`
      : ''
    
  }

  onHintTextChanged() {
    this.$['hint-text'].innerHTML = this.hintText
  }

  applyLabel(label) {
    this.$.checkbox.children['checkbox-text'].innerHTML = this.label 
  }

  onRequiredChange (value) {
    if (value === false) {
      this.$.checkbox.removeAttribute('required')
    } else {
      this.$.checkbox.setAttribute('required', true)
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

  onDisabledChange (value) {
    if (value === false) {
      this.$.checkbox.removeAttribute('disabled')
    } else {
      this.$.checkbox.setAttribute('disabled', true)
    }
  }

  onValueChange (value) {
    if (value) this.$.checkbox.setAttribute('checked', true)
    if (!value) this.$.checkbox.removeAttribute('checked')
  }

  onSkippedChange(newValue) {
    if (newValue === true) {
      this.value = this.constructor.properties.value.value
      this.render()
    }
  }

  validate() {
    if (this.required === true && 
        this.value === '' && 
        this.disabled === false && 
        this.hidden === false) {
      this.invalid = true
      return false
    } else {
      this.invalid = false
      return true
    }
  }
}
window.customElements.define(TangyCheckbox.is, TangyCheckbox)
