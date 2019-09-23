import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import SignaturePad from 'signature_pad'
import { t } from '../util/t.js'
import '../style/tangy-common-styles.js'
import '../style/tangy-element-styles.js'
import '@polymer/iron-icon/iron-icon.js'
import '@polymer/paper-button/paper-button.js'


/**
 * `tangy-checkbox`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class TangySignature extends PolymerElement {
    static get template() {
        return html`
    <style include="tangy-common-styles"></style>
    <style include="tangy-element-styles"></style>
    <style>
      img {
        width: 100%;
      }
      .hint-text{
        margin-top:6px;
        margin-left:4px;
      }
    </style>
    <canvas id="signature-pad" class="signature-pad" width=400 height=200></canvas>

    <paper-button on-click="captureSignature"><iron-icon icon="done"></iron-icon> Accept Signature </paper-button>
    <paper-button on-click="clearSignature"><iron-icon icon="delete"></iron-icon> Clear </paper-button>
    <label class="hint-text">[[hintText]]</label>
    `
    }

    static get is() {
        return 'tangy-signature-capture'
    }

    static get properties() {
        return {
            name: {
                type: String,
                value: ''
            },
            hintText: {
                type: String,
                value: ''
            },
            private: {
                type: Boolean,
                value: false
            },
            disabled: {
                type: Boolean,
                value: false,
                observer: 'onDisabledChange',
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
                observer: 'onInvalidChange',
                reflectToAttribute: true
            },
            incomplete: {
                type: Boolean,
                value: true,
                reflectToAttribute: true
            },
            value: {
                type: String,
                value: ''
            }
        }
    }

    connectedCallback() {
        super.connectedCallback()
    }
    ready() {
        super.ready();
        const canvas = this.shadowRoot.querySelector("#signature-pad");
        this.signaturePad = new SignaturePad(canvas, {
            backgroundColor: 'rgb(255, 255, 255)'
        });
    }
    captureSignature() {
        if (this.signaturePad.isEmpty()) {
            return alert(t('Please provide a signature first.'));
        }
        this.value = this.signaturePad.toDataURL('image/jpeg');
    }

    clearSignature() {
        this.signaturePad.clear()
    }


}
window.customElements.define(TangySignature.is, TangySignature)
