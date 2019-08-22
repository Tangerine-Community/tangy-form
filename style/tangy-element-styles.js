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
        border: var(--tangy-element-border, solid white 5px);
        padding: 0px;
        margin: var(--tangy-element-margin, 10px);
      }

      :host(:not([hidden])) {
        -webkit-transition: opacity .5s ease-in-out, max-height .5s ease-in-out;
        -moz-transition: opacity .5s ease-in-out, max-height .5s ease-in-out;
        -ms-transition: opacity .5s ease-in-out, max-height .5s ease-in-out;
        -o-transition: opacity .5s ease-in-out, max-height .5s ease-in-out;
        opacity: 1;
        max-height: 99999999999999999px;
      }

      :host([hidden]) {
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
        top: -2px;
        left: -18px;
        font-size: 2em;
      }

      :host([disabled]) label {
        /* color: var(--disabled-color); */
      }

      .flex-container {
        display: flex;
      }
      .flex-container > #container {
        width: 100%;
        padding-right: 2em;
      }
      #qnum > label {
        margin-right: 0.5rem;
        min-width: 2em;
      }

      label {
        display: block;
        font-size: 1.2em;
        color: var(--primary-text-color);
        margin-bottom: 5px;
      }

      #error-text, #errorText {
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
