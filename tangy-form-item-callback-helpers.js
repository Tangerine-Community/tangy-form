export class TangyFormItemHelpers {

  constructor(element) {
    this.element = element
    this.inputs = [].slice.call(this.element.shadowRoot.querySelectorAll(`[name]`))
    if (typeof this.inputs !== 'object') {
      this.inputs = []
    }
  }

  getValue(name) {
    let value = ''
    let foundInput = undefined
    // Look in the shadow DOM.
    this.inputs.forEach(input => {
      if (input.name === name) {
        foundInput = input
      }
    })
    // Look in the store.
    if (!foundInput) {
      let state = this.element.store.getState()
      let inputs = []
      state.items.forEach(item => inputs = [...inputs, ...item.inputs])
      foundInput = inputs.find(input => {
        if (input.name === name) {
          return input
        }
      })
    }
    if(foundInput && typeof foundInput.value === 'object') {
      let values = []
      foundInput.value.forEach(subInput => {
        if (subInput.value) {
          values.push(subInput.name)
        }
      })
      value = values
    } else if (foundInput && foundInput.value !== undefined) {
      value = foundInput.value
    }
    // Return radio buttons as a signle value chosen, not a single entry array.
    if (foundInput && foundInput.tagName === 'TANGY-RADIO-BUTTONS' && Array.isArray(value)) {
      value = (value.length > 0) ? value[0] : ''
    }
    if (!value) {
      value = ''
    }
    // console.log("input name: " + name + " foundInput: " + foundInput + " typeof value " + typeof value + " value: " + value)
    return value
  }

  isChecked(name) {
    return (this.inputs.find(input => name === input.name).value === 'on') ? true : false
  }

  notChecked(name) {
    return !(this.inputs.find(input => name === input.name).value === 'on') ? true : false
  }


  inputShow(name) {
    this.inputs.forEach(inputEl => {
      if (inputEl.name === name) {
        inputEl.hidden = false
      }
    })
  } 

  inputHide(name) {
    this.inputs.forEach(inputEl => {
      if (inputEl.name === name) {
        inputEl.hidden = true
      }
    })
  }

  inputEnable(name) {
    this.inputs.forEach(inputEl => {
      if (inputEl.name === name) {
        inputEl.disabled = false
      }
    })
  } 

  inputDisable(name) {
    this.inputs.forEach(inputEl => {
      if (inputEl.name === name) {
        inputEl.disabled = true
      }
    })
  }

  itemsPerMinute(input) {
    if (!input) return
    if (input.tagName !== 'TANGY-TIMED') return
    let numberOfItemsAttempted = this.numberOfItemsAttempted(input)
    let numberOfItemsIncorrect = this.numberOfIncorrectItems(input)
    let numberOfItemsCorrect = numberOfItemsAttempted - numberOfItemsIncorrect
    let timeSpent = input.duration - input.timeRemaining
    return Math.round(numberOfItemsCorrect / (timeSpent / 60))
  }
  numberOfItemsAttempted(input) {
    if (!input) return
    return input.value.findIndex(el => el.highlighted) + 1
  }
  numberOfCorrectItems(input) {
    if (!input) return
    return (this.numberOfItemsAttempted(input) - this.numberOfIncorrectItems(input))
  }
  numberOfIncorrectItems(input) {
    if (!input) return
    return input.value.filter(el => el.value).length
  }
  gridAutoStopped(input) {
    return !!input.value.find(el => el.gridAutoStopped)
  }
  hideInputsUponThreshhold(el) {
    let shouldDisable = false
    const correctEls = el.shadowRoot.querySelector("#content").querySelectorAll('[correct]')
    if (correctEls.length > 0) {
      let inputEls = [...el.shadowRoot.querySelector("#content").children].filter(el => el.hasAttribute("name"))
      let selectedIndex = [];
      let concurrentIncorrectCount = 0
      let previousIncorrect = 0;
      inputEls.forEach((input, index) => {
        const correctEls = input.querySelectorAll('[correct]')
        const correctSelections = Array.from(correctEls).map(optionEl => optionEl.value)
        let currentSelection = input.value.find(element => element.value === 'on')
        if (currentSelection) {
          if (!correctSelections.join().includes(currentSelection.name)) {
            selectedIndex = [...selectedIndex, index]
            if (index == ++previousIncorrect) {
              ++concurrentIncorrectCount
            } else {
              concurrentIncorrectCount = 1
            }
            previousIncorrect = index
          } else {
            // reset concurrentIncorrectCount
            // console.log("Correct answer; resetting concurrentIncorrectCount to 0")
            concurrentIncorrectCount = 0
          }
        }
      }, [])
      // console.log(" selectedIndex: " + JSON.stringify(selectedIndex) + " concurrentIncorrectCount: " + concurrentIncorrectCount + " previousIncorrect: " + previousIncorrect)
      shouldDisable = concurrentIncorrectCount >= el.incorrectThreshold ? true : false
      if (shouldDisable === true) {
        let highest = Math.max(...selectedIndex) + 1
        // console.log("Making the subsequent inputs hidden starting with " + highest)
        let inputsToHide = inputEls.slice(highest)
        inputsToHide.forEach((inputEl, index) => {
          inputEl.hidden = true
        })
      }
    }
    return shouldDisable
  }
}
