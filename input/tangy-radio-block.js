import { html } from '@polymer/polymer/polymer-element.js';
import '../util/html-element-props.js'
import '@polymer/paper-radio-button/paper-radio-button.js'
import '../style/tangy-common-styles.js'
import '../style/tangy-element-styles.js'
import { TangyInputBase } from '../tangy-input-base.js'
import { cleanText } from '../util/clean-text.js'

    /**
     * `tangy-radio-block`
     *
     *
     * @customElement
     * @polymer
     * @demo demo/index.html
     */
export class TangyRadioBlock extends TangyInputBase {
  static get template () {
    return html``
  }

  static get is () {
    return 'tangy-radio-block'
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
        value: '',
        observer: 'render',
        reflectToAttribute: true
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
      hintText: {
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
      skipped: {
        type: Boolean,
        value: false,
        observer: 'onSkippedChange',
        reflectToAttribute: true
      },
      value: {
        type: String,
        value: '',
        observer: 'render',
        reflectToAttribute: true
      },
      identifier: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      image: {
        type: String,
        value: ''
      },
      sound: {
        type: String,
        value: ''
      },
      promptFor: {
        type: String,
        value: ''
      },
      playOnOpen: {
        type: String,
        value: ''
      }
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `    
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <style>
        .hint-text {
            color: gray;
            font-size: 0.8rem;
            font-weight: lighter;
        }
        .toggle {
          position: absolute;
          clip: rect(0,0,0,0);
        }
        .toggle:active + label, .toggle:checked + label {
          border-color: var(--button-selected-border-color, green);
        }
        .btn-lg {
          width: var(--width, 6.5rem);
          height: var(--height, 6.5rem);
          display: flex;
          align-items: center;
          justify-content: var(--justify-content, center);
          margin: var(--tangy-radio-block-margin, 0 0.25rem);
          font-size: var(--tangy-radio-block-font-size, 2rem);
        }
        label#radio-block-label {
          background: var(--tangy-radio-block-label-bg, var(--tangy-form-item--background-color, #FFF));
        }
        .btn {
          font-weight: 400;
          text-align: center;
          vertical-align: middle;
          user-select: none;
          padding: 0.375rem 0.75rem;
          line-height: 1.5;
          border-radius: 0.5rem;
          border: 4px solid var(--tangy-radio-block-border-color, transparent);
          text-decoration: none;
          transition-duration: 0.4s;
          position: relative;
          box-sizing: border-box;
      }
      #blockImage {
        margin-left: auto;
        max-width: var(--tangy-option-image-width, 50px);
        max-height: var(--tangy-option-image-height, 50px);
      }
      /* image-display="top": picture above the centred label. */
      :host([image-display="top"]) .btn-lg {
        flex-direction: column-reverse;
        justify-content: center;
      }
      :host([image-display="top"]) #blockImage {
        margin: 0 0 0.25em;
      }
      /* image-display="fill": the picture is the answer and covers the tile; the text stays for screen readers. */
      :host([image-display="fill"]) .btn-lg {
        padding: 0;
        font-size: 0;
        height: auto;
        aspect-ratio: 1;
        overflow: hidden;
      }
      :host([image-display="fill"]) #blockImage {
        display: block;
        margin: 0;
        width: 100%;
        height: 100%;
        max-width: none;
        max-height: none;
        object-fit: cover;
      }
      </style>
      <input 
        ${this.required ? 'required' : ''}
        ${this.invalid ? 'invalid' : ''}
        ${this.disabled ? 'disabled' : ''}
        ${this.hidden ? 'hidden' : ''}
        ${this.value ? 'checked' : ''}
        id="a1"
        class="toggle"
        type="radio"
        name="answer"
      >
      </input>
        <label id="radio-block-label" for="a1" class="btn btn-lg">
          ${this.label ? this.label : this.innerHTML}
          ${this.hasAttribute('image') && this.getAttribute('image') != '' ? `
          <img id="blockImage" src="${this.image}">
        ` : ''}
        </label>
      ${this.hasAttribute('hint-text') ? `
        <label class="hint-text">
          ${cleanText(this.getAttribute('hint-text'))}
        </label>
      ` : ''}
    `
    if (this.hideButton) this.shadowRoot.querySelector('label').style.display = 'none';
    this.shadowRoot.querySelector('input').addEventListener('change', (e) => {
      e.stopPropagation()
      let incomplete = (!e.target.checked)
      this.value = e.target.checked ? 'on' : ''
      this.dispatchEvent(new CustomEvent('change', { bubbles: true }))
      // @TODO Deprecated API. Remove ready?
      this.dispatchEvent(new CustomEvent('INPUT_VALUE_CHANGE', {
        bubbles: true,
        detail: {
          inputName: this.name,
          inputValue: e.target.hasAttribute('checked'),
          inputIncomplete: incomplete,
          inputInvalid: false 
        }
      }))
    })
    
    if (this.shadowRoot.querySelector('label#radio-block-label') != null) {
      this.shadowRoot.querySelector('label#radio-block-label').addEventListener('click', (e) => {
        this.dispatchEvent(new CustomEvent('input-sound-triggered', { detail: {sound: this.sound, id: this.name, stopAndClearQueue: true} }))
      })
    }

  }

  onSkippedChange(newValue, oldValue) {
    if (newValue === true) {
      this.value = this.constructor.properties.value.value
    }
  }

}
window.customElements.define(TangyRadioBlock.is, TangyRadioBlock)
