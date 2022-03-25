import { Loc } from '../util/loc.js';

/*
 * Searches the location list for the id in @locationValue and returns any metadata with the key
 * @locationMetadataId. If the metadata value does not exist, it returns undefined
 */
export const getLocationMetadata = function (locationValue, locationMetadataId) {
  const flatLocationList = Loc.flatten(T.appConfig.locationList)
  let location = flatLocationList.locations.find(location => location.id === locationValue)
  if (location) {
    try {
      return location[locationMetadataId]
    } catch (e) {
      // metadata not set for locaiton
      console.log(`Error: ${e}\n The metadata may not be set for location ${locationValue}`)
    }
  }
  return undefined
}

/*
 * Given a tangy-radio-button input object and an option value, select the option in the list that is labelled by that value
 */
export const setValueOfRadioButtons = function (input, value) {
  input.value = input.value.map(button => {
    return {
      ...button,
      value: button.name === value ? 'on' : ''
    }
  })
}

/*
 * Given a tangy-radio-button input object and an option value, select the option in the list that is labelled by that value
 */
export const unsetValueOfRadioButtons = function (input) {
  input.value = input.value.map(button => {
    return {
      ...button,
      value: ''
    }
  })
}