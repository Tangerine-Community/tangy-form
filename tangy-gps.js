import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './tangy-common-styles.js'
import './tangy-element-styles.js'

/**
 * `tangy-timed`
 * 
 *
 * @customElement
 * @polymer
 * The attribute `advanced-mode` defaults to false. If set to true in the mark-up
 * it shows the latitude, Longitude, Acuuracy, And accuracy Levels
 * @demo demo/index.html
 */
class TangyGps extends PolymerElement {
  static get template() {
    return html`
    <style include="tangy-common-styles"></style>
    <style include="tangy-element-styles"></style>
    <style>
    :host {
      display: block;
    }
    :host([required]:not([disabled])) label::before  { 
      content: "*"; 
      color: red; 
      position: absolute;
      top: 4px;
      right: 5px;
    }
   .coordinates {
     margin: 5px 15px;
   }
  
  </style>
  <div class="coordinates">
    <b>Current Position</b>
    <div>
      <template is="dom-if" if="{{_isAdvancedMode(currentLatitude, advancedMode)}}">
        Latitude [[currentLatitude]] <br>
        Longitude [[currentLongitude]] <br>
        
      </template>
    <div>
    <template is="dom-if" if="[[currentLatitude]]">
      Accuracy: [[currentAccuracy]] Meters<br>
      Accuracy Level: [[accuracyLevel]]
    </template> 
    <template is="dom-if" if="{{hasDelta}}">
        <br> Distance from reference: [[currentDelta]] meters
        </template>
    </div>
    <div>
    <template is="dom-if" if="[[!currentLatitude]]">
        Searching...
    </template> 
    </div>
    </div>
    <div>
      <h3>Tips</h3>
      <p>Try standing next to a window</p>
      <p>Try moving outside with a clear view of the sky</p>
      <p>Try standing away from trees or buildings</p>
    </div>
    <br>
    
    <slot></slot>
  </div> 
`;
  }

  static get is() { return 'tangy-gps'; }

  static get properties() {
    return {
      name: {
        type: String,
        value: 'tangy-gps'
      },
      value: {
        type: Object,
        value: {
          latitude: undefined,
          longitude: undefined,
          accuracy: undefined
        },
        observer: 'reflect',
        reflectToAttribute: true
      },
      required: {
        type: Boolean,
        value: false,
        observer: 'reflect',
        reflectToAttribute: true
      },
      advancedMode: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      referenceLatitude: {
        type: Number,
        observer: 'saveCurrentPosition',
        value: undefined
      },
      referenceLongitude: {
        type: Number,
        observer: 'saveCurrentPosition',
        value: undefined 
      },
      validMaxDelta: {
        type: Number,
        value: undefined
      }
    };
  }

  ready() {
    this.hasDelta = false
    super.ready();
    this.active = true
    this.getGeolocationPosition()
    this.currentAccuracy = '...'
    this.accuracyLevel = '...'
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.active = false
  }

  reflect() {
    this.recordedLatitude = this.value.recordedLatitude
    this.recordedLongitude = this.value.recordedLongitude
    this.recordedAccuracy = this.value.recordedAccuracy
  }
  getGeolocationPosition() {
    const options = {
      enableHighAccuracy: true
    };
    const queue = JSON.parse(localStorage.getItem('gpsQueue')) ? (JSON.parse(localStorage.getItem('gpsQueue'))) : undefined;
    if ((typeof queue !== 'undefined' && ((new Date).getTime() - queue.timestamp) / 1000 / 60 <= 5)) {
      this.currentLatitude = queue.latitude;
      this.currentLongitude = queue.longitude;
      this.currentAccuracy = queue.accuracy;
      if (!this.disabled) this.saveCurrentPosition();
    }
    navigator.geolocation.getCurrentPosition((position) => {
      // Bail if this element has been marked inactive on disconnected callback.
      if (!this.active) return
      // Accuracy is in meters, a lower reading is better
      if (!queue || (typeof queue !== 'undefined' && ((position.timestamp - queue.timestamp) / 1000) >= 15) ||
        queue.accuracy >= position.coords.accuracy) {
        this.currentLatitude = position.coords.latitude;
        this.currentLongitude = position.coords.longitude;
        this.currentAccuracy = position.coords.accuracy;
        const x = {
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          speed: position.coords.speed,
          timestamp: position.timestamp
        };
        localStorage.setItem('gpsQueue', JSON.stringify(x));
        if (!this.disabled) this.saveCurrentPosition();

      } else {
        this.currentLatitude = queue.latitude;
        this.currentLongitude = queue.longitude;
        this.currentAccuracy = queue.accuracy;
        if (!this.disabled) this.saveCurrentPosition();
      }
      this.getGeolocationPosition()

    },
      (err) => { },
      options);
  }
  saveCurrentPosition() {

    if (this.referenceLatitude === undefined && this.referenceLongitude === undefined) {
      this.value = {
        latitude: this.currentLatitude,
        longitude: this.currentLongitude,
        accuracy: this.currentAccuracy
      }
    } else {
      this.value = {
        latitude: this.currentLatitude,
        longitude: this.currentLongitude,
        accuracy: this.currentAccuracy,
        delta: this._getDistanceFromLatLonInKm(
          this.currentLatitude,
          this.currentLongitude,
          this.referenceLatitude,
          this.referenceLongitude
        )
      }
      this.currentDelta = Math.floor(this.value.delta * 1000)
      this.hasDelta = true
    }
    console.log(this.value)
    this.dispatchEvent(new Event('change'));
    if (this.currentAccuracy < 50) {
      this.accuracyLevel = 'Good';
    }
    if (this.currentAccuracy > 50) {
      this.accuracyLevel = 'Poor';
    }
  }

  validate() {
    if (!this.required) return true
    if (this.value.latitude && this.value.longitude && this.value.accuracy) {
      return true
    } else {
      return false
    }
  }

  _isAdvancedMode(currentLatitude, advancedMode) {
    return (currentLatitude && advancedMode);
  }

  _getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this._deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this._deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this._deg2rad(lat1)) * Math.cos(this._deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  _deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}

window.customElements.define(TangyGps.is, TangyGps);
