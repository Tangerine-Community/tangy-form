/*
 * Mixin to handle the `locked` attribute behavior.
 * Built using example at https://polymer-library.polymer-project.org/3.0/docs/devguide/custom-elements#defining-mixins
 */
export const LockedBehaviorMixin = (superClass) => class extends superClass {

  constructor() {
    super()
    const resizeObserver = new ResizeObserver(this._setLockedScreenDimensions.bind(this))
    resizeObserver.observe(this)
  }

  static get properties() {
    return {
      locked: {
        type: Boolean,
        reflectToAttribute: true
      }
    }
  }

  static get observers() {
    return [ '_lockedChanged(locked)' ]
  }

  _lockedChanged(value) { 
    console.log('locked changed')
    if (value === true) {
      const lockScreenEl = document.createElement('div')
      lockScreenEl.setAttribute('style', 'position: relative;')
      lockScreenEl.setAttribute('id', 'lock-screen')
      lockScreenEl.innerHTML = `
        <style>
          #locked-screen-inner {
            position: absolute;
            z-index: 999;
          }
        </style>
        <div id="locked-screen-inner"></div>
      `

      this.shadowRoot.prepend(lockScreenEl)
      this._setLockedScreenDimensions()
    } else {
      const lockScreenEl = this.shadowRoot.querySelector('#lock-screen')
      if (lockScreenEl) {
        lockScreenEl.remove()
      }
    }
  }

  _setLockedScreenDimensions() {
    const {height, width} = this.getBoundingClientRect()
    const lockedScreenInnerEl = this.shadowRoot.querySelector('#locked-screen-inner')
    if (lockedScreenInnerEl) {
      lockedScreenInnerEl.style.height = `${height}px`
      lockedScreenInnerEl.style.width = `${width}px` 
    }
  }

}