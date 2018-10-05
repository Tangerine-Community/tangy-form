import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-checkbox/paper-checkbox.js'
import './tangy-common-styles.js'
import './tangy-element-styles.js'
// https://stackoverflow.com/a/2117523/10139471
function uuid() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}


/**
 * `tangy-cards`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class TangyCards extends PolymerElement {

  static get is () {
    return 'tangy-cards'
  }

  static get _props() {
   return ['name','value','label','disabled','invalid','incomplete','hidden']
  }

  static get properties () {
    return {
      name: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      maxCount: {
        type: Number,
        value: 999,
        reflectToAttribute: true
      },
      initialCount: {
        type: Number,
        value: 1,
        reflectToAttribute: true
      },
      label: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      disabled: {
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
      },
      hidden: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }

    }
  }

  static get template () {
    return html`
    `
  }

  connectedCallback () {
    super.connectedCallback()
    this._template = this.innerHTML
    this.innerHTML = ''
		if(this.getAttribute('value')) {
			this.value = JSON.parse(this.getAtribute('value'))
	  } else {
		  for (let i = 0; i < this.initialCount; i++) {
				this.addCard()
      }
		}
  }

  set value(value) {
    this._value = value
		this.render(value)
  }

  get value() {
		if (this._value && this._value.length > 0 && this.shadowRoot) {
			this._value = [...this.shadowRoot.querySelector('#cards').querySelectorAll('tangy-card')].map(tangyCardEl => tangyCardEl.getProps())
		}
    return this._value ? this._value : []
  }

	render(value) {
    if (!this.shadowRoot) return
		this.shadowRoot.innerHTML = `    
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <div id="cards">
      </div>
      <span class="add-another" on-click="addCard">+ Add another</span>
    `
    this.shadowRoot.querySelector('.add-another').addEventListener('click', _ => this.addCard()) 
		for (let cardProps of value) {
			const cardEl = document.createElement('tangy-card')
      // @TODO The order of the next three lines of code matter too much. If any different, it will break. 
			cardEl.innerHTML = this._template
			this.shadowRoot.querySelector('#cards').appendChild(cardEl)
			cardEl.setProps(cardProps)
			cardEl.addEventListener('card-remove', event => this.removeCard(event.target.name))
		}
	}

  addCard() {
    this.value = [...this.value, {
			name: uuid(),
			value: []
		}]
  }

  removeCard(cardName) {
    this.value = this.value.filter(cardProps => cardProps.name !== cardName)
  }

  populateValues() {

  }


  validate() {
    /*
    let validateStates = [...this.querySelectorAll('[name]')].map(inputEl => inputEl.validate())
    if (validateStates.indexOf(false) !== -1) {
      return false
    } else {
      return true
    }
    */
    return true
  }
}
window.customElements.define(TangyCards.is, TangyCards)
