import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './tangy-common-styles.js'
import './tangy-eftouch-slide.js';

const initialState = {
  currentSlide: 0
}

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
      currentSlide: {
        type: Number,
        value: 0,
        reflectToAttribute: true
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
    this.store = Redux.createStore(this.reducer)
    this.store.subscribe(() => this.render())
    const foo = [...this.querySelectorAll('tangy-eftouch-slide')].forEach((el, i) => {
      el.addEventListener('tangy-eftouch-slide-selection', () => this.store.dispatch({type: 'NEXT_SLIDE'}))
    })
    this.store.dispatch({type: 'INIT'})

  }

  render(value) {
    const state = this.store.getState()
    const foo = [...this.querySelectorAll('tangy-eftouch-slide')].forEach((el, i) => {
        el.hidden = i !== state.currentSlide ? true : false
    })
    /*
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
        <style include="tangy-common-styles"></style>
        <style include="tangy-element-styles"></style>
    `
    */
  }

  reducer(state = initialState, action) {
    switch(action.type) {
      case 'INIT':
        return Object.assign({}, state)
      case 'NEXT_SLIDE':
        return Object.assign({}, state, { currentSlide: state.currentSlide + 1 })
      default:
        return state
    }

  }

}
window.customElements.define(TangyEftouch.is, TangyEftouch)
