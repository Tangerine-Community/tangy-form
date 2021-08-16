import {LitElement, html, css} from 'lit-element';
// import {customElement, property} from "lit-element/lib/decorators";
import '@polymer/paper-progress/paper-progress.js';

class LoadingUiComponent extends LitElement {
  static get styles() { return css`
    :host {
      display: block;
    }
    .loading-text {
      display: flex;
      width: 50%;
      height: 100px;
      margin: auto;
      margin-top: 200px;
      border-radius: 10px;
      border: 3px dashed #1c87c9;
      align-items: center;
      justify-content: center;
      background: var(--primary-color);
      color:white;
      opacity: 100%;
      font-size: x-large;
    }
  `}
  
  render() {
    return html`
      <div class="loading-text" @click=${this.escape}>
        <paper-progress indeterminate></paper-progress>
      </div>
    `;
  }
  
  escape() {
    // if (confirm(`${window['T'].translate('Please only leave this dialog if you believe there is an error in the application.')}`)) {
    if (confirm(`Please only leave this dialog if you believe there is an error in the application.`)) {
      document.querySelector(".loadingUi").style.display = "block"
    }
  }
}

// Register your element to custom elements registry, pass it a tag name and your class definition
// The element name must always contain at least one dash
customElements.define('loading-ui', LoadingUiComponent);


