import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-checkbox/paper-checkbox.js'
import './tangy-common-styles.js'
import './tangy-element-styles.js'

/**
 * `tangy-eftouch-item`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class TangyEftouchItem extends PolymerElement {

  static get is () {
    return 'tangy-eftouch-item'
  }

  static get _props() {
   return ['name','introSrc','transitionSrc','touchSrc','touchSources','src','onChange','value','required','disabled','label','hidden','invalid','incomplete']
  }

  static get properties () {
    return {
      name: {
        type: String,
        value: ''
      },
      introSrc: {
        type: String,
        value: 'assets/sounds/1.mp3'
      },
      transitionSrc: {
        type: String,
        value: 'assets/sounds/swish.mp3'
      },
      touchSrc: {
        type: String,
        value: 'assets/sounds/pop.mp3'
      },
      touchSources: {
        type: Array
      },
      src: {
        type: String,
        value: ''
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
    return html`<style include="tangy-common-styles"></style>
    <style include="tangy-element-styles"></style>

    <style>
      paper-radio-button {
        margin-right: 25px;
        --paper-radio-button-size: 2em;
      }
      .eftouch-selected {
        border: 10px solid #af0;
        border-radius: 10px;
      }
      paper-button.indigo {
        background-color: var(--paper-indigo-500);
        color: white;
        --paper-button-raised-keyboard-focus: {
          background-color: var(--paper-pink-a200) !important;
          color: white !important;
        };
      }
      paper-button.indigo:hover {
        background-color: var(--paper-indigo-400);
      }
    </style>

    <div class="container">
      <label for="group">[[label]]</label>
      <!--<paper-button id="replay" raised class="indigo" on-click="replay">[[t.replay]]</paper-button>-->
      <paper-radio-group name="group" id="paper-radio-group">
      </paper-radio-group>
    </div>
    `
  }

  connectedCallback () {
    super.connectedCallback()
    this.isReady = false
  }


}
window.customElements.define(TangyEftouchItem.is, TangyEftouchItem)
