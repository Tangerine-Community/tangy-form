import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { t } from '../util/t.js'
import '../util/html-element-props.js'
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/av-icons.js';
import '@polymer/iron-icons/editor-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import './tangy-toggle-button.js';
import '../style/tangy-common-styles.js'
import { TangyInputBase } from '../tangy-input-base.js'

/**
 * `tangy-untimed-grid`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */

const TANGY_UNTIMED_GRID_MODE_UNTOUCHED = 'TANGY_UNTIMED_GRID_MODE_UNTOUCHED'
const TANGY_UNTIMED_GRID_MODE_RUN = 'TANGY_UNTIMED_GRID_MODE_RUN'
const TANGY_UNTIMED_GRID_MODE_MARK = 'TANGY_UNTIMED_GRID_MODE_MARK'
const TANGY_UNTIMED_GRID_MODE_LAST_ATTEMPTED = 'TANGY_UNTIMED_GRID_MODE_LAST_ATTEMPTED'
const TANGY_UNTIMED_GRID_MODE_DONE = 'TANGY_UNTIMED_GRID_MODE_DONE'
const TANGY_UNTIMED_GRID_COMPLETE = 'TANGY_UNTIMED_GRID_COMPLETE'
const TANGY_UNTIMED_GRID_MODE_DISABLED = 'TANGY_UNTIMED_GRID_MODE_DISABLED'

class TangyUntimedGrid extends TangyInputBase {
  constructor() {
    super()
    this.t = {
      mark: t('MARK'),
      lastAttempted: t('LAST ATTEMPTED'),
      start: t('START'),
      stop: t('STOP'),
      reset: t('RESET')
    }
  }
  static get template() {
    return html`
    <style include="tangy-common-styles"></style>
    <style include="tangy-element-styles"></style>
    <style>
      :host {
        display: block;
        font-size: 1.5em;
      }
      
      :host #icon {
        display: block;
      }
      tangy-toggle-button { 
        display: block;
        width: 90%;
        height:60px;
      }
      table{
        width: 100%;
        border-collapse:collapse;
      }
      tr {
        width: 100%;
      }
      
      td{
          text-align: left;
          border: none;
      } 
      td.row-marker {
          padding: 0 0 0 15px;
          width: 50px;
          text-align: left;
          border: none;
      }
      #container {
        width: 100%;
        position: relative;
      }
            
      #grid {
        width: 100%;
      }

      :host([disabled]) #bar {
        display: none;
      }

      /* Sticky rather than absolute: the controls have to stay reachable while a long grid is
         scrolled, and an absolute bar scrolls away and rides over the app header on the way.
         The offset keeps it clear of the header — override it per app if the header is taller. */
      #bar {
        position: sticky;
        top: var(--tangy-untimed-grid-bar-offset, 64px);
        z-index: 5;
        display: flex;
        justify-content: flex-end;
        padding-right: 50px;
      }

      #bar paper-button {
        font-size: .6em;
      }

      #touchPalette {
        background: white;
        border: solid 1px #c5c5c5;
        border-radius: 10px;
        padding: 5px;
        color: #333;
        text-align: center;
        box-shadow: 3px 3px 10px 1px rgba(0, 0, 255, .2);
        padding: 5px 5px 10px 5px;
      }
      
      paper-button {
        background-color: var(--accent-color) !important;
        display: inline-block;
      }
      
      paper-button[disabled] {
        background-color: #cccccc !important;
      }

      paper-button.pressed {
        background-color: var(--primary-color) !important;
      }

      paper-button.keyboard-focus {
        background-color: #1976d2;
      }

      /* The bar used to be absolute, so this reserved space for it. It is in flow now. */
      #info {
        padding-top: 0;
      }

      /* The control for the mode you are in reads blue; the other one reads orange as the next
         thing to tap. The active control is disabled so it cannot be re-pressed, so these have to
         out-specify the disabled grey above — the #bar id selector does that. */
      #bar paper-button {
        background-color: var(--tangy-untimed-grid-pending-color, #F26F10) !important;
        color: #ffffff !important;
      }

      #bar paper-button.pressed,
      #bar paper-button.pressed[disabled] {
        background-color: var(--tangy-untimed-grid-active-color, #1E4F96) !important;
        color: #ffffff !important;
        opacity: 1;
      }
    </style>
    <label class="hint-text">[[hintText]]</label>
    <div id="container">

      <div id="bar">
        <div id="touchPalette">
          <paper-button id="markButton" mini on-click="onMarkClick">
            <iron-icon icon="editor:mode-edit"></iron-icon>
            <template is="dom-if" if="{{showLabels}}">
              [[t.mark]]
            </template>
          </paper-button>
          <paper-button id="lastAttemptedButton" mini on-click="onLastAttemptedClick">
            <iron-icon icon="av:playlist-add-check"></iron-icon>
            <template is="dom-if" if="{{showLabels}}">
              [[t.lastAttempted]]
            </template>
          </paper-button>
        </div>
      </div>

      <div id="info">
          <div id="statusMessage"> [[statusMessage]] </div>
      </div>

      <table id="grid">
      </table>

    </div>
`;
  }

  static get is() { return 'tangy-untimed-grid'; }
  static get properties() {
    return {
      name: {
        type: String,
        value: 'tangy-untimed-grid'
      },
      value: {
        type: Array,
        value: [],
        observer: 'reflect',
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
      autoStop: {
        type: Number,
        value: undefined,
        reflectToAttribute: true
      },
      autoStopMode: {
        type: String,
        value: 'first', // 'first' or 'consecutive'
        reflectToAttribute: true
      },
      gridAutoStopped: {
        type: Boolean,
        value: undefined,
        reflectToAttribute: true
      },
      hintText: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      // Use value for mode.
      mode: {
        state: true,
        value: TANGY_UNTIMED_GRID_MODE_UNTOUCHED,
        type: String,
        observer: 'onModeChange',
        reflectToAttribute: true
      },
      // Config.
      // Number of columns to show items, calibrated for a Nexus 7 in landscape mode.
      columns: {
        type: Number,
        value: 4,
        reflectToAttribute: true
      },
      showLabels: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      // Will never be invalid. Just incomplete.
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
      required: {
        type: Boolean,
        value: false
      },
      disabled: {
        type: Boolean,
        onserver: 'onDisabledChange',
        value: false,
        reflectToAttribute: true
      },
      rowMarkers: {
        type: Boolean,
        value: false
      },
      scoreTarget: {
        type: Number,
        value: 0,
        reflectToAttribute: true
      },
      scoreBaseline: {
        type: Number,
        value: 0,
        reflectToAttribute: true
      },
      scoreSpread: {
        type: Number,
        value: 0,
        reflectToAttribute: true
      },
      optionFontSize: {
        type: Number,
        value: 0.7,
        reflectToAttribute: true
      },
      identifier: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    };
  }

  ready() {
    super.ready();
    const styleEl = document.createElement("style")
    styleEl.innerHTML = `tangy-toggle-button { 
        --tangy-toggle-button-font-size:${this.optionFontSize}em;
      }`
    this.shadowRoot.appendChild(styleEl)
    setTimeout(() => {
      this.render()
      this.reflect()
      // this.onStartClick()
      // RUN clears the last attempted marker, so an already administered grid resumes in MARK
      // instead — reopening a saved response must not wipe its completion.
      this.mode = this.value.some(buttonState => buttonState.highlighted)
        ? TANGY_UNTIMED_GRID_MODE_MARK
        : TANGY_UNTIMED_GRID_MODE_RUN
    }, 400)
  }


  reflect() {
    this.shadowRoot.querySelectorAll('tangy-toggle-button').forEach(el => {
      let matchingState = this.value.find(state => el.name == state.name)
      el.setProps(matchingState)
    })
  }

  render() {

    // Empty the grid, may be a reset.
    this.$.grid.innerHTML = ''

    const rows = [document.createElement('tr')]
    let currentRow = 0
    let currentColumn = 1
    this.querySelectorAll('option').forEach((option, i) => {
      // Create the tangy toggle button.
      let column = document.createElement('td')
      column.style.width = `${Math.floor(100/this.columns)}%`
      let tangyToggleButton = document.createElement('tangy-toggle-button')
      tangyToggleButton.setAttribute('name', option.value)
      //tangyToggleButton.style.width = `100%`
      tangyToggleButton.innerHTML = option.innerHTML
      tangyToggleButton.disabled = true
      if (this.disabled) tangyToggleButton.disabled = true
      column.appendChild(tangyToggleButton)
      if ( currentColumn !== 0 && currentColumn % this.columns === 0) {
        rows.push(document.createElement('tr'))
        rows[currentRow].appendChild(column)
        if (this.rowMarkers) {
          const rowMarkerEl = document.createElement('td')
          rowMarkerEl.setAttribute('class', 'row-marker')
          rowMarkerEl.rowNumber = currentRow
          rowMarkerEl.addEventListener('click', (event) => {
            this.rowMarkerClicked(event.target.parentElement.rowNumber)
          })
          rowMarkerEl.innerHTML = `<iron-icon icon="done-all"></iron-icon>`
          rows[currentRow].appendChild(rowMarkerEl)
        }
        currentColumn = 1
        currentRow++
      } else {
        rows[currentRow].appendChild(column)
        currentColumn++
      }
    })
    for (let row of rows) {
      this.$.grid.appendChild(row)
    }

    let newValue = []
    this
      .shadowRoot
      .querySelectorAll('tangy-toggle-button')
      .forEach((button) => {
        button.addEventListener('click', this.onTangyToggleButtonClick.bind(this))
        newValue.push(button.getProps())
      })
    // Grids may change, preserve old values. Ideally we don't need this in the future with
    // proper revisioning of forms.
    if (this.value.length < newValue.length) {
      this.value.forEach(oldInputState => {
        let index = newValue.findIndex(newInputState => (newInputState.name === oldInputState.name))
        if (index !== -1) newValue[index] = oldInputState
      })
      this.value = newValue
    }

  }

  // Note that mode is actually this.value.
  onModeChange(value) {

    let tangyToggleButtons = [].slice.call(this.shadowRoot.querySelectorAll('tangy-toggle-button'))
    let inputElements = [].slice.call(this.querySelectorAll('[name]'))

    // reset pressed.
    let controlElements = [].slice.call(this.shadowRoot.querySelectorAll('paper-button'))
    controlElements.forEach(element => element.classList.remove('pressed'))

    switch (value) {
      case TANGY_UNTIMED_GRID_MODE_DISABLED:
        this.statusMessage = '';
        this.$.markButton.hidden = true
        this.$.lastAttemptedButton.hidden = true
        this.value = this.value.map(buttonState => {
          return Object.assign({}, buttonState, {
            disabled: true
          })
        })
      case TANGY_UNTIMED_GRID_MODE_UNTOUCHED:
        this.statusMessage = t('untouched')
        this.$.markButton.disabled = true
        this.$.lastAttemptedButton.disabled = true
        this.value = this.value.map(buttonState => {
          return Object.assign({}, buttonState, {
            disabled: true
          })
        })
        break;
      case TANGY_UNTIMED_GRID_MODE_RUN:
        this.statusMessage = t('Tap items to mark them incorrect.')
        this.incomplete = true
        this.$.markButton.classList.add('pressed')
        this.$.markButton.disabled = true
        this.$.lastAttemptedButton.disabled = false
        this.value = this.value.map(buttonState => {
          return Object.assign({}, buttonState, {
            highlighted: false,
            disabled: false
          })
        })
        break
      case TANGY_UNTIMED_GRID_MODE_MARK:
        this.statusMessage = t('Tap any boxes that were incorrect during the test.')
        this.$.markButton.classList.add('pressed')
        this.$.markButton.disabled = true
        this.$.lastAttemptedButton.disabled = false
        this.value = this.value.map(buttonState => {
          return Object.assign({}, buttonState, {
            disabled: false
          })
        })
        // Corrections after completion keep the last attempted marker, so stay complete.
        this.incomplete = !this.value.some(buttonState => buttonState.highlighted)
        break
      case TANGY_UNTIMED_GRID_MODE_LAST_ATTEMPTED:
        // Same as the timed grid: the button only asks for the last attempted item. The grid is
        // not complete until one is actually tapped, which onTangyToggleButtonClick handles.
        this.statusMessage = t('Tap the item last attempted.')
        this.$.lastAttemptedButton.classList.add('pressed')
        this.$.lastAttemptedButton.disabled = true
        // MARK stays available so marks can still be corrected after completion.
        this.$.markButton.disabled = false
        this.incomplete = !this.value.some(buttonState => buttonState.highlighted)
        this.value = this.value.map(buttonState => {
          return Object.assign({}, buttonState, {
            disabled: true
          })
        })
        break
      // @TODO No longer being used.
      case TANGY_UNTIMED_GRID_MODE_DONE:
        this.statusMessage = t('You may proceed.')
        this.value = this.value.map(buttonState => {
          return Object.assign({}, buttonState, {
            disabled: true
          })
        })
        break

    }
  }

  rowMarkerClicked(rowNumber) {
    switch (this.mode) {
      case TANGY_UNTIMED_GRID_MODE_MARK:
      case TANGY_UNTIMED_GRID_MODE_RUN:
      let lastItemOnRow;
      const allItems =  this.shadowRoot.querySelectorAll('tr')[rowNumber].querySelectorAll

        this.shadowRoot.querySelectorAll('tr')[rowNumber].querySelectorAll('tangy-toggle-button')
          .forEach(tangyToggleButtonEl => {
            tangyToggleButtonEl.pressed = !tangyToggleButtonEl.pressed
          })
        let newValue = []
        this.shadowRoot
          .querySelectorAll('tangy-toggle-button')
          .forEach(button => newValue.push(button.getProps()))
        this.value = newValue
        if (this.autoStop && this.shouldGridAutoStop()) {
          // ignore if we're already in mode TANGY_UNTIMED_GRID_MODE_LAST_ATTEMPTED
      if (this.mode !== TANGY_UNTIMED_GRID_MODE_LAST_ATTEMPTED) {
        this.stopGrid()
        this.gridAutoStopped = true
        this.onStopClick(null, lastItemOnRow)
      }
    }
  }
}

  onTangyToggleButtonClick(event) {

    let tangyToggleButtons = [].slice.call(this.shadowRoot.querySelectorAll('tangy-toggle-button'))
    let inputElements = [].slice.call(this.querySelectorAll('[name]'))

    let newValue = []

    switch (this.mode) {
      case TANGY_UNTIMED_GRID_MODE_UNTOUCHED:

        break
      case TANGY_UNTIMED_GRID_MODE_MARK:
      case TANGY_UNTIMED_GRID_MODE_RUN:
        // If this selection is past the a last attempted index, prevent it.
        let itemLastAttemptedIndex = this.value.findIndex(item => (item.highlighted) ? true : false)
        let itemLastMarkedIndex = this.value.findIndex(item => (item.name === event.target.name))
        if (itemLastAttemptedIndex != -1 && itemLastAttemptedIndex < itemLastMarkedIndex) {
          event.target.value = ''
          alert(t('You may not mark an item incorrect that is beyond the last item attempted.'))
          return
        }
        // Get the props of the buttons, save to value.
        this.shadowRoot
          .querySelectorAll('tangy-toggle-button')
          .forEach(button => newValue.push(button.getProps()))
        this.value = newValue
        this.dispatchEvent(new Event('change'))
        break
      case TANGY_UNTIMED_GRID_MODE_LAST_ATTEMPTED:
        // Find the last marked and do not set last attempted if what is just clicked is <.
        let lastMarkedIndex = 0
        this.value.forEach((option, i) => lastMarkedIndex = (option.pressed) ? i : lastMarkedIndex)
        newValue = this.value.map((option, i) => {
          if (option.name === event.target.name && i >= lastMarkedIndex) {
            option.highlighted = true
          } else if (option.name === event.target.name && i < lastMarkedIndex) {
            alert(t('Last attempted cannot be before an item marked.'))
            option.highlighted = false
          } else {
            option.highlighted = false
          }
          return option
        })
        this.value = newValue
        // Only a real last attempted item completes the grid.
        this.incomplete = !this.value.some(option => option.highlighted)
        this.dispatchEvent(new Event('change'))
        break
    }
    if (this.autoStop && this.shouldGridAutoStop()) {
      // ignore if we're already in mode TANGY_UNTIMED_GRID_MODE_LAST_ATTEMPTED
      if (this.mode !== TANGY_UNTIMED_GRID_MODE_LAST_ATTEMPTED) {
        event.target.highlighted = true
        this.mode = TANGY_UNTIMED_GRID_MODE_LAST_ATTEMPTED
        this.gridAutoStopped = true
        this.onStopClick(null, event.target.name)
      }
    }
  }

  shouldGridAutoStop() {
    const tangyToggleButtons = [].slice.call(this.shadowRoot.querySelectorAll('tangy-toggle-button'))
    if (this.autoStopMode === 'first') {
      const firstXButtons = tangyToggleButtons.slice(0, this.autoStop)
      let foundAnUnpressedButton = false
      for (let button of firstXButtons) {
        if (!button.pressed) {
          foundAnUnpressedButton = true
        }
      }
      return foundAnUnpressedButton ? false : true
    } else if (this.autoStopMode === 'consecutive') {
      let consecutiveCount = 0
      for (let button of tangyToggleButtons) {
        if (button.pressed) {
          consecutiveCount++
          if (consecutiveCount >= this.autoStop) {
            return true
          }
        } else {
          consecutiveCount = 0
        }
      }
      return false
    }
  }

  onStopClick(event, lastItemAttempted) {
    this.endTime = Date.now()
    clearInterval(this.timer);
    // We have to check for typeof string because the event handler on the stop button puts an integer in the second param for some reason.
    // If it's a string, then we know it's an ID of something which should actually be lastItemAttempted.
    if (typeof lastItemAttempted === 'string') {
      this.value = this.value.map((element, i) => Object.assign({}, element, { highlighted: (lastItemAttempted === element.name) ? true : false }))
    } else {
      this.value = this.value.map((element, i) => Object.assign({}, element, { highlighted: (this.value.length - 1 === i) ? true : false }))
    }
    this.mode = TANGY_UNTIMED_GRID_MODE_LAST_ATTEMPTED
    // Auto-stop already picked the last attempted item, so the grid is administered.
    this.incomplete = false
    // A grid with no incorrect items never fires a change event from a toggle button, so
    // announce the change here. Otherwise on-change logic never sees a completed grid.
    this.dispatchEvent(new Event('change'))
  }

  // Switches the grid into last-attempted mode. Unlike the timed grid there is no stop event to
  // infer a position from, so the marker defaults to the final item of the grid — the common case
  // for an untimed grid that was read to the end. Tapping another item moves it.
  onLastAttemptedClick() {
    if (this.disabled) return
    if (!this.value.some(buttonState => buttonState.highlighted)) {
      this.value = this.value.map((buttonState, i) => Object.assign({}, buttonState, {
        highlighted: (i === this.value.length - 1)
      }))
    }
    this.mode = TANGY_UNTIMED_GRID_MODE_LAST_ATTEMPTED
    this.dispatchEvent(new Event('change'))
  }

  // Back to correcting marks. The last attempted marker is kept, so the grid stays complete.
  onMarkClick() {
    if (this.disabled) return
    this.mode = TANGY_UNTIMED_GRID_MODE_MARK
  }

  validate() {
    let lastAttempted = this.value.find(state => (state.highlighted) ? state : false)
    // If this is required, it's not hidden, and there is no last attempted... Then this is invalid.
    if (this.required === true &&
        this.disabled === false &&
        this.hidden === false &&
        !lastAttempted) {
      this.invalid = true
      this.incomplete = true
      // Unlike the timed grid there is no stop button to reach this state from, so the alert has
      // to say where the control is, otherwise the requirement looks like a dead end.
      alert(t('Tap the item last attempted.') + ' '
        + t('Tap the icon at the top right to mark the last item the child attempted.'))
      return false
    }
    this.invalid = false
    this.incomplete = false
    return true
  }

  onSkippedChange(newValue, oldValue) {
    if (newValue === true) {
      this.value = this.constructor.properties.value.value
    }
  }

}

window.customElements.define(TangyUntimedGrid.is, TangyUntimedGrid);
