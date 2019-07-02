import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../util/html-element-props.js'
import './tangy-radio-buttons.js'
import '../style/tangy-common-styles.js'

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
      fromTopOfScreen: {
        type: Number,
        value: 115,
        reflectToAttribute: true,
        observer: 'render'
      },
      height: {
        type: Number,
        value: 400,
        reflectToAttribute: true,
        observer: 'render'
      },
      hintText: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      width: {
        type: Number,
        reflectToAttribute: true,
        observer: 'render'
      },
      autoProgress: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      transitionMessage: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      transitionSound: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      openSound: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      transitionDelay: {
        type: Number,
        value: 0,
        reflectToAttribute: true
      },
      inputSound: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      timeLimit: {
        type: Number,
        value: 0,
        reflectToAttribute: true
      },
      warningTime: {
        type: Number,
        value: 0,
        reflectToAttribute: true
      },
      warningMessage: {
        type: String,
        value: '',
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
        reflectToAttribute: true,
        observer: 'render'
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
    if (this.openSound) new Audio(this.openSound).play()
    if (!this.width) {
      this.width = document.documentElement.offsetWidth
    }
    this.style.width = `${this.width}px`
    this.style.height = `${this.height}px`
    this.render()
    if (this.value.startTime === 0) {
      this.value.startTime = new Date().getTime()
    }
    if (this.warningMessage) {
      this.warningTimeout = setTimeout(() => {
        this.setAttribute('warning-triggered', true)
      }, this.warningTime)
    }
    if (this.timeLimit) {
      this.timeLimitTimeout = setTimeout(() => {
        this.disabled = true
        this.transition()
      }, this.timeLimit)
    }
    //this.fitIt()
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    if (this.fitItInterval) clearInterval(this.fitItInterval)
    if (this.warningTimeout) clearTimeout(this.warningTimeout)
    if (this.timeLimitTimeout) clearTimeout(this.timeLimitTimeout)
  }

  render(value) {
    const options = [...this.querySelectorAll('option')]
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: ${this.fromTopOfScreen}px;
          left: 0px;
          width: 100%
        }
        :host tangy-radio-buttons {
          opacity: 0;
        }
        :host([fullscreen-size-complete]) tangy-radio-buttons {
          opacity: 1 !important;
        }

        tangy-radio-buttons {
          margin: 0 auto;
        }
        #transition {
          padding: 0px;
        }
        :host(:not([transition-triggered])) #transition {
          opacity: 0;
        }
        :host([transition-triggered]) #transition {
          opacity: 1;
          transition: opacity .5s ease-in-out;
          -webkit-transition: opacity .5s ease-in-out;
          -moz-transition: opacity .5s ease-in-out;
          -ms-transition: opacity .5s ease-in-out;
          -o-transition: opacity .5s ease-in-out;
        }
        #warning {
          padding: 0px;
        }
        :host(:not([warning-triggered])) #warning {
          opacity: 0;
        }
        :host([warning-triggered]) #warning {
          opacity: 1;
          transition: opacity .5s ease-in-out;
          -webkit-transition: opacity .5s ease-in-out;
          -moz-transition: opacity .5s ease-in-out;
          -ms-transition: opacity .5s ease-in-out;
          -o-transition: opacity .5s ease-in-out;
        }
        #messages-box {
          height: 60px;
        }
        #cell img {
          border: #FFF solid 5px;
        }
        #cell[selected] img {
          border: red solid 5px;
        }
        #cell {
          padding: 5px;
          text-align: center;
        }
        :host([highlight-correct]) #cell[correct] img {
          border: yellow solid 5px;
        }

      </style>
      <div id="messages-box">
        ${this.transitionMessage ? `
          <div id="transition">
            ${this.transitionMessage}
          </div>
        ` : ''}
        ${this.warningMessage ? `
          <div id="warning">
            ${this.warningMessage}
          </div>
        ` : ''}
        ${this.incorrectMessage ? `
          <div id="incorrect">
            ${this.incorrectMessage}
          </div>
        ` : ''}
      </div>
      <div id="options-box">
      ${options.map(option => `
        <span 
          id="cell"
          ${option.hasAttribute('correct') ? 'correct' : ''}
          ${
            this.hasAttribute('multi-select')
              ? !option.hasAttribute('disabled') && this.value.selection.includes(option.value) ? `selected` : ``
              : !option.hasAttribute('disabled') && this.value.selection === option.value ? `selected` : ``
          }
          style="
            display: inline-block;
            width:${Math.floor((option.getAttribute('width')/100)*this.width)}px;
            height:${Math.floor((option.getAttribute('height')/100)*(this.height-60))}px;
          ">
          <img 
            ${option.hasAttribute('disabled') ? `disabled` : ''}
            value="${option.value}" 
            ${!option.hasAttribute('src') || option.getAttribute('src') === '' ? `
              disabled
              style="
                height: 100%;
                width: 100%;
              " 
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
            ` : `
              style="
                max-height: 100%;
                max-width: 100%;
              "
              src="${option.getAttribute('src')}"
            `}
          >
        </span>
      `).join('')}
      </div>
    `
    this.shadowRoot.querySelectorAll('img:not([disabled])').forEach(el => el.addEventListener('click', _ => this.onSelection(_.target)))
  }

  onSelection(target) {
    if (this.disabled === true || target.hasAttribute('disabled')) return
    if (this.hasAttribute('no-corrections') && this.value && this.value.correct === false) {
      // Do nothing.
      return
    }
    if (this.inputSound) new Audio(this.inputSound).play()
    this.value = Object.assign({}, this.value, {
      selection: this.hasAttribute('multi-select')
        ? this.value.selection.includes(target.getAttribute('value'))
          ? this.value.selection.reduce((selection, value) => value !== target.getAttribute('value') ? [value, ...selection] : selection, [])
          : [...this.value.selection, target.getAttribute('value')]
        : target.getAttribute('value'),
      selectionTime: new Date().getTime()
    })
    if (this.querySelectorAll('[correct]').length > 0) {
      const correctSelections = [...this.querySelectorAll('[correct]')].map(optionEl => optionEl.getAttribute('value'))
      this.value = {
        ...this.value, 
        ...{
          correct: this.hasAttribute('multi-select') 
            ? correctSelections
              .reduce((allCorrectSelectionsMade, value) => {
                return allCorrectSelectionsMade === false ? false : this.value.selection.includes(value)
              }, true) 
            : correctSelections.includes(this.value.selection)
        }
      }     
    }
    if (this.hasAttribute('if-incorrect-then-highlight-correct') && this.value.correct === false) {
      this.setAttribute('highlight-correct', '')
    } else if (this.hasAttribute('if-incorrect-then-highlight-correct') && this.value.correct === true) {
      this.removeAttribute('highlight-correct')
    }
    if (this.hasAttribute('incorrect-message') && this.value.correct === false) {
      this.incorrectMessage = this.getAttribute('incorrect-message')
      this.render()
    } else if (this.hasAttribute('incorrect-message') && this.value.correct === true) {
      this.incorrectMessage = '' 
      this.render()
    }
    this.dispatchEvent(new Event('change'))
    if (this.canTransition) this.startTransition()
  }

  get canTransition() {
    return this.validate() && (this.transitionMessage || this.autoProgress || this.timeLimit)
  }

  startTransition() {
    this.setAttribute('transition-triggered', true)
    if (this.transitionDelay > 0) {
      setTimeout(() => {
        this.transition()
      }, this.transitionDelay)
    } else {
      this.transition()
    }
  }

  transition() {
    if (this.transitionSound) new Audio(this.transitionSound).play()
    if (this.autoProgress) this.dispatchEvent(new CustomEvent('next'))
  }

  fitIt() {
    this.fitItInterval = setInterval(() => {
      // Protect against not having a shadow yet.
      if (!this.radioButtonsEl) return
      // Protect against when the element has not yet grown up.
      if (this.radioButtonsEl.offsetHeight / this.radioButtonsEl.offsetWidth === NaN) return 
      // Protect from doing this over and over.
      if (this.hasAttribute('fullscreen-size-complete')) return
      const topMargin = 100
      const targetHeight = window.visualViewport.height - topMargin
      const actualHeight = this.radioButtonsEl.offsetHeight
      let targetWidth = Math.floor(this.radioButtonsEl.offsetHeight / this.radioButtonsEl.offsetWidth * targetHeight)
      this.radioButtonsEl.style.width = `${targetWidth}px`
      this.setAttribute('fullscreen-size-complete', '')
    }, 100)
  }

  validate() {
    if (this.hasAttribute('required-correct')) {
      return this.value.correct ? true : false
    } else if (this.hasAttribute('required') && this.hasAttribute('multi-select')) {
      return this.value.selection && this.value.selection.length > 0 ? true: false
    } else if (this.hasAttribute('required')) {
      return this.value.selection ? true: false
    } else {
      return true
    }
  }

}
window.customElements.define(TangyEftouch.is, TangyEftouch)
