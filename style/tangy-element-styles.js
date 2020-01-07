/* jshint esversion: 6 */

/*
 * CSS style module for Tangy Form Elements. 
 * 
 * This module keeps styling of state consistent for things like disabled, invalid,
 * and required.
 */

const $_documentStyleContainer = document.createElement('div');
$_documentStyleContainer.setAttribute('style', 'display: none;');

$_documentStyleContainer.innerHTML = `<dom-module id="tangy-element-styles">
  <template><style is="tangy-element-styles">
      :host {
        color: var(--primary-text-color);
        display: block;
        position: relative;
        border: var(--tangy-element-border, solid transparent 5px);
        padding: 0px;
        margin: var(--tangy-element-margin, 10px);
      }

      :host(:not([hidden])), :host(:not([skipped])) {
        -webkit-transition: opacity .5s ease-in-out, max-height .5s ease-in-out;
        -moz-transition: opacity .5s ease-in-out, max-height .5s ease-in-out;
        -ms-transition: opacity .5s ease-in-out, max-height .5s ease-in-out;
        -o-transition: opacity .5s ease-in-out, max-height .5s ease-in-out;
        opacity: 1;
        max-height: 99999999999999999px;
      }

      :host([hidden]), :host([skipped]) {
        -webkit-transition: 
          opacity .5s ease-in-out, 
          max-height .5s ease-in-out,
          border .5s ease-in-out, 
          margin .5s ease-in-out, 
          padding .5s ease-in-out;
        opacity: 0;
        max-height: 0px;
        border: 0px;
        margin: 0px;
        padding: 0px;
      }

      :host([disabled]:not([hidden])) {
        color: var(--disabled-color);
        opacity: .7;
      }

      /*
      :host([invalid]) {
        border: solid var(--error-color) 5px;
      }
      */
     
      :host([required]:not([disabled]))::before  { 
        content: "*"; 
        color: var(--accent-color); 
        position: absolute;
        top: var(--tangy-required-indicator--font-size, -2px);
        left: var(--tangy-required-indicator--font-size, -18px);
        font-size: var(--tangy-required-indicator--font-size, 2rem);
      }

      :host([disabled]) label {
        /* color: var(--disabled-color); */
      }

      .flex-container {
        display: flex;
      }
      .flex-container > #qnum-content {
        width: 100%;
        padding-right: 2em;
      }
      #qnum-number > label {
        margin-right: 0.5rem;
        min-width: 2em;
      }
      #qnum-number > label:empty {
        margin: 0;
        min-width: 0;
      }

      label {
        font-family: var(--paper-font-common-base_-_font-family);
        display: block;
        font-size: 1.2rem;
        color: var(--primary-text-color);
        margin-bottom: 5px;
      }

      /*
       * error-text
       */
      #error-text, #errorText {
        font-family: var(--paper-font-common-base_-_font-family);
        font-size: medium;
        font-weight: bold;
        color: var(--error-color);
        display: flex;
        margin-bottom: 30px;
      }
      #error-text > iron-icon, #errorText > iron-icon {
        padding-right: 0.8em;
        height: 24px;
        width: 24px;
      }
      #error-text > div, #errorText > div {
        line-height: 24px;
      }
      #error-text:empty, #errorText:empty {
        margin-bottom: 0;
      }

      /*
       * warn-text
       */
      #warn-text {
        font-family: var(--paper-font-common-base_-_font-family);
        font-size: medium;
        font-weight: bold;
        color: var(--error-color);
        display: flex;
        margin-bottom: 30px;
      }
      #warn-text > iron-icon {
        padding-right: 0.8em;
        height: 24px;
        width: 24px;
      }
      #warn-text > div {
        line-height: 24px;
      }
      #warn-text:empty {
        margin-bottom: 0;
      }

      /*
       * discrepancy-text
       */
      #discrepancy-text {
        font-family: var(--paper-font-common-base_-_font-family);
        font-size: medium;
        font-weight: bold;
        color: var(--error-color);
        display: flex;
        margin-bottom: 30px;
      }
      #discrepancy-text > iron-icon {
        padding-right: 0.8em;
        height: 24px;
        width: 24px;
      }
      #discrepancy-text > div {
        line-height: 24px;
      }
      #discrepancy-text:empty {
        margin-bottom: 0;
      }

      .secondary_color {
        color: var(--accent-color);
      }

      .m-y-25 {
        margin: 25px 0;
      }
   
      
     
  
    </style>
    </template>
    </dom-module>
    `

document.head.appendChild($_documentStyleContainer);
