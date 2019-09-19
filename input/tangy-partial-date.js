import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../util/html-element-props.js'
import '../style/tangy-element-styles.js';
import '../style/tangy-common-styles.js'
import '../style/mdc-select-style.js'
import { t } from '../util/t.js'
/**
 * `tangy-partial-date`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TangyPartialDate extends PolymerElement {
  static get template() {
    return html`
    <style include="tangy-element-styles"></style>
    <style include="tangy-common-styles"></style>
    <style include="mdc-select-style"></style>
    <style>
      :host {
        --iron-icon-width: 32px;
        --iron-icon-height: 32px;
      }
      .partial-date-select {
        background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%230%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.54%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E);
        background-repeat: no-repeat;
        background-position: right 10px center;
        border-bottom: 1px solid black;
      }
      .partial-date-format {
        background-image: none;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .partial-date-float {
        /*float:left;*/
        margin-right:15px;
      }
      .partial-date-headings {
        color: black;
        font-size: smaller;
        font-weight: normal;
      }
      #errorText {
        padding: 10px 10px 10px 0px;
        font-size: medium;
        font-weight: bold;
        color: var(--error-color);
      }
      :host([invalid]) {
        border: none;
      }
      label.hint-text {
        color: gray;
        font-size: 1em;
        font-weight: lighter;
    }
    </style>
    <div class="flex-container m-y-25">
      <div id="qnum"></div>
      <div id="container"></div>
    </div>
    `;
  }

  static get is() { return 'tangy-partial-date'; }

  static get properties() {
    return {
      name: {
        type: String,
        value: ''
      },
      value: {
        type: String,
        value: '',
        reflectToAttribute: true,
        observer: 'render'
      },
      hintText: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      required: {
        type: Boolean,
        value: false
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: 'render'
      },
      label: {
        type: String,
        value: '',
        reflectToAttribute: true
      },
      hidden: {
        type: Boolean,
        value: false
      },
      invalid: {
        type: Boolean,
        value: false,
        observer: 'render',
        reflectToAttribute: true
      },
      incomplete: {
        type: Boolean,
        value: true
      },
      minYear: {
        type: Number,
        value: 0,
        observer: 'render',
        reflectToAttribute: true
      },
      maxYear: {
        type: Number,
        value: 0,
        observer: 'render',
        reflectToAttribute: true
      },
      allowUnknownDay: {
        type: Boolean,
        observer: 'render',
        reflectToAttribute: true
      },
      allowUnknownMonth: {
        type: Boolean,
        observer: 'render',
        reflectToAttribute: true
      },
      allowUnknownYear: {
        type: Boolean,
        observer: 'render',
        reflectToAttribute: true
      },
      numericMonth: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      disallowFutureDate: {
        type: Boolean,
        observer: 'render',
        reflectToAttribute: true
      },
      showTodayButton: {
        type: Boolean,
        observer: 'render',
        reflectToAttribute: true
      },
      errorText: {
        type: String,
        value: '',
        observer: 'render'
      },
      missingDateErrorText: {
        type: String,
        value: t("The date is missing. Please enter a valid date.La date n'est pas manquante. Veuillez entrer une date valide."),
        observer: 'render',
        reflectToAttribute: true
      },
      invalidDateErrorText: {
        type: String,
        value: t("The date is not valid. Please enter a valid date.La date n'est pas valide. Veuillez entrer une date valide."),
        observer: 'render',
        reflectToAttribute: true
      },
      futureDateErrorText: {
        type: String,
        value: t("The date cannot be in the future. Please enter a date that is on or before today.<t-lang>La date ne peut pas être dans le futur. S'il vous plaît entrer une date qui est sur ou avant aujourd'hui."),
        observer: 'render',
        reflectToAttribute: true
      },
      questionNumber: {
        type: String,
        value: "",
        observer: 'render',
        reflectToAttribute: true
      }
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.render()
  }
  
  render() {

     const months = [
      t('January'),
      t('February'),
      t('March'),
      t('April'),
      t('May'),
      t('June'),
      t('July'),
      t('August'),
      t('September'),
      t('October'),
      t('November'),
      t('December')
    ];
    const days = Array.from({length: 31}, (x,i) => i+1);
    const years = Array.from({length: parseInt(this.maxYear) - parseInt(this.minYear) + 1}, (x,i) => parseInt(this.minYear) + i);
    const unknownText = t("Unknown");
    this.allowUnknownDay && days.push(99);
    this.allowUnknownMonth && months.push(unknownText);
    this.allowUnknownYear && years.push(9999);

    this.$.qnum.innerHTML = `<label>${this.questionNumber}</label>`;
    this.$.container.innerHTML = `
      <label for="group">${this.label}</label>
      <label class="hint-text">${this.hintText}</label>
      <div class="mdc-select partial-date-format">
        <div class='partial-date-float'>
          <label for='day' class='partial-date-headings'>${t('Day')}:</label>
          <select class="mdc-select__surface partial-date-select" name="day" value="${this.value}" ${this.disabled ? 'disabled' : ''}>
            <option value="" default selected disabled></option>
            ${days.map((day, i) => `
              <option value="${day}">
                ${(day === 99 ? t("Unknown") : day)}
              </option>
            `)}
          </select>
        </div>
        <div class='partial-date-float'>
          <label for='day' class='partial-date-headings'>${t('Month')}:</label>
          <select class="mdc-select__surface partial-date-select" name="month" value="${this.value}" ${this.disabled ? 'disabled' : ''}>
            <option value="" default selected disabled></option>
            ${months.map((month, i) => `
              <option value="${(month === unknownText ? 99 : months.indexOf(month) + 1)}">
                ${(this.numericMonth ? (month === unknownText ? unknownText : months.indexOf(month) + 1) : (month === unknownText ? unknownText : month))}
              </option>
            `)}    
          </select>
        </div>
        <div class='partial-date-float'>
          <label for='year' class='partial-date-headings'>${t('Year')}:</label>
            <select class="mdc-select__surface partial-date-select" name="year" value="${this.value}" ${this.disabled ? 'disabled' : ''}>
              <option value="" default selected disabled></option>
              ${years.map((year, i) => `
                <option value="${year}">
                ${(year === 9999 ? t("Unknown") : year)}
                </option>
              `)}
            </select>
        </div>  
        ${(this.showTodayButton ? ` 
          <paper-button style="align-self:flex-end;" id="today" on-click="setToday" ${this.disabled ? 'disabled' : ''}>
            <iron-icon icon="query-builder"></iron-icon>&nbsp;
            ${t('Today')}
          </paper-button>` : '' 
        )}
      </div>
      ${this.invalid && this.errorText && !this.internalErrorText ? `
        <div id="error-text">
          <iron-icon icon="error"></iron-icon>
            <div>${this.errorText}</div>
        </div>      
      ` : ''}
      ${this.invalid && this.internalErrorText ? `
        <div id="error-text">
          <iron-icon icon="error"></iron-icon>
            <div>${this.internalErrorText}</div>
        </div>      
      ` : ''}
    `
    if (this.showTodayButton) {
      this._onClickListener = this
        .shadowRoot
        .querySelector('paper-button')
        .addEventListener('click', this.onTodayClick.bind(this))
    }
    this._onChangeListener = this
      .shadowRoot
      .querySelector('select[name="day"]')
      .addEventListener('change', this.onChange.bind(this));
    this._onChangeListener = this
      .shadowRoot
      .querySelector('select[name="month"]')
      .addEventListener('change', this.onChange.bind(this));
    this._onChangeListener = this
      .shadowRoot
      .querySelector('select[name="year"]')
      .addEventListener('change', this.onChange.bind(this));
    this.dispatchEvent(new CustomEvent('render'))
    if (this.value !== '') {
      const dateValue = this.value;
      this.shadowRoot.querySelector("select[name='day']").value = this.unpad(dateValue.split("-")[2]);
      this.shadowRoot.querySelector("select[name='month']").value = this.unpad(dateValue.split("-")[1]);
      this.shadowRoot.querySelector("select[name='year']").value = dateValue.split("-")[0];  
    }
  }

  onTodayClick(event) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    this.value = year + '-' + month + '-' + day;
    this.shadowRoot.querySelector("select[name='day']").value = year;
    this.shadowRoot.querySelector("select[name='month']").value = month;
    this.shadowRoot.querySelector("select[name='year']").value = day;
    this.render();
  }

  onChange(event) {
    this.value =  this.shadowRoot.querySelector("select[name='year']").value + '-' +
                  this.pad(this.shadowRoot.querySelector("select[name='month']").value,2) + '-' +
                  this.pad(this.shadowRoot.querySelector("select[name='day']").value,2);
    console.log("Date value updated to " + this.value);          
    this.dispatchEvent(new CustomEvent('change'));
  }

  validate() {
    if (this.required && !this.hidden && !this.disabled && !this.value) {
      this.internalErrorText = this.missingDateErrorText;
      this.invalid = true;
      return false;
    }    
    if (!this.isValidDate(this.value)) {
      this.internalErrorText = this.invalidDateErrorText;
      this.invalid = true;
      return false;
    }
    if (this.disallowFutureDate && this.isFutureDate(this.value)) {
      this.internalErrorText = this.futureDateErrorText;
      this.invalid = true;
      return false;
    }
    this.internalErrorText = "";
    this.invalid = false;
    return true;
  }

  pad(a,b) {
    if (a !== '') {
      return(1e15+a+"").slice(-b);
    } else {
      return '';
    }
  }

  unpad(a) {
    return +a;
  }

  isFutureDate(dateValue) {
    const today = new Date();
    const enteredDay = parseInt(this.unpad(dateValue.split("-")[2]));
    const enteredMonth = parseInt(this.unpad(dateValue.split("-")[1]));
    const enteredYear = parseInt(dateValue.split("-")[0]); 
    if (enteredDay !== 99 && enteredMonth !== 99 && enteredYear !== 9999) {
      const fullDate = new Date(enteredYear, enteredMonth - 1, enteredDay);
      if (fullDate > today) {
        return true;
      } else {
        return false;
      }
    }
    if (enteredMonth !== 99 && enteredYear !== 9999) {
      const imputedDate = new Date(enteredYear, enteredMonth - 1, 1);
      if (imputedDate > today) {
        return true;
      } else {
        return false;
      }
    }
    if (enteredYear !== 9999) {
      const imputedDate = new Date(enteredYear, 0, 1);
      if (imputedDate > today) {
        return true;
      } else {
        return false;
      }
    }
    return false;
 
  }

  isValidDate(str) {
    var parts = str.split('-');
    if (parts.length < 3)
      return false;
    else {
      var day = parseInt(parts[2]);
      var month = parseInt(parts[1]);
      var year = parseInt(parts[0]);
      if (isNaN(day) || isNaN(month) || isNaN(year)) {
          return false;
      }
      if (day < 1 || year < 1)
          return false;
      if((month>12||month<1) & month !== 99)
          return false;
      if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31 && day !== 99)
          return false;
      if ((month == 4 || month == 6 || month == 9 || month == 11 ) && day > 30 & day !== 99)
          return false;
      if (month == 2) {
        if (day === 99)
          return true;
        if (((year % 4) == 0 && (year % 100) != 0) || ((year % 400) == 0 && (year % 100) == 0)) {
            if (day > 29)
                return false;
        } else {
            if (day > 28)
                return false;
        }      
      }
      return true;
    }
  }
}

window.customElements.define(TangyPartialDate.is, TangyPartialDate);
