import moment from 'moment'
import * as ethiopianDate from 'ethiopian-date/index.js'

export class TangyFormItemHelpers {

  constructor(element) {
    this.element = element
    this.inputs = [].slice.call(this.element.querySelectorAll(`[name]`))
    if (typeof this.inputs !== 'object') {
      this.inputs = []
    }
  }

  goTo(itemId, skipValidation = false) {
    this.element.goTo(itemId, skipValidation)
  }

  goToEnd(skipValidation = false) {
    this.element.goTo([...this.element.parentElement.querySelectorAll('tangy-form-item')].pop().id, skipValidation)
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

  getValueAsMoment(name) {
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
    if (foundInput && foundInput.tagName === 'TANGY-PARTIAL-DATE') {
      //var partial_input = new TangyPartialDate() <--- can we do this instead
      value = _transformValueToMoment(value)
    }
    if (foundInput && foundInput.tagName === 'TANGY-ETHIOPIAN-DATE') {
      //var partial_input = new TangyEthiopianDate() <--- can we do this instead
      value = _transformValueToMomentEthiopian(value)
    } else {
      console.warn(`${foundInput.name} is a ${foundInput.tagName}, not a partial date`)
    }
    if (!value) {
      value = ''
    }
    // console.log("input name: " + name + " foundInput: " + foundInput + " typeof value " + typeof value + " value: " + value)
    return value
  }

  _transformValueToMoment(value) {
    const [year, month, day] = value.split('-')
    let date = null
    if (year === '9999' || year === '') {
      // Need at least a year to calculate.
      return null
    } else if (month === '99' || month === '') {
      // We don't have a month, just have a year to go off of.
      date = moment(year, 'YYYY')
    } else if (day === '99' || day === '') {
      // We don't have a day, go off of year and month.
      date = moment(`${year}-${month}`, 'YYYY-MM')
    } else {
      date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD')
    }
    return date
  }

  _transformValueToMomentEthiopian(value) {
    var [year_part, month_part, day_part] = value.split('-');

    let date = null
    if (year_part === '9999' || year_part === '') {
      // Need at least a year to calculate.
      return null
    }
    if (month_part === '99' || month_part === '') {
      // We don't have a month, just have a year to go off of.
      month_part = '01'
    }
    if (day_part === '99' || day_part === '') {
      // We don't have a day, go off of year and month.
      day_part = '01'
    }

    const greg_date = ethiopianDate.toGregorian(parseInt(year_part), parseInt(month_part), parseInt(day_part));
    const year = greg_date[0];
    const month = greg_date[1];
    const day = greg_date[2];
    date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD')

    return date
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

  skip(name) {
    this.inputs.forEach(inputEl => {
      if (inputEl.name === name) {
        inputEl.skipped = true
      }
    })
  }

  unskip(name) {
    this.inputs.forEach(inputEl => {
      if (inputEl.name === name) {
        inputEl.skipped = false
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
    if (!input) return
    return input.value.find(el => el.gridAutoStopped)
  }
  hideInputsUponThreshhold(el) {
    let shouldDisable = false
    const correctEls = el.querySelectorAll('[correct]')
    if (correctEls.length > 0) {
      let inputEls = [...el.children].filter(el => el.tagName === 'TANGY-RADIO-BUTTONS')
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
      // console.log("Making the subsequent inputs hidden or visible starting with " + highest)
      let highest = Math.max(...selectedIndex) + 1
      let inputsToHide = inputEls.slice(highest)
      // if shouldDisable, hide subsequent inputs; if not, don't hide, which is necessary when user makes a correction.
      inputsToHide.forEach((inputEl, index) => {
        shouldDisable ? inputEl.hidden = true : inputEl.hidden = false
      })
    }
    return shouldDisable
  }
}
