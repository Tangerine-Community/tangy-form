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

export const setValueOfInput = (field, value) => {
  var stId = document.querySelector(`tangy-input[name='${field}']`)
  stId.value = value
}

export const generateTableHead = (tableId, data) => {
  let table = document.querySelector(tableId);
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

export const generateTable = (tableId, data) => {
  let table = document.querySelector(tableId);
  for (let element of data) {
    let row = table.insertRow();
    for (let key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

export const generateTableForData = (tableId, data) => {
  let table = document.querySelector(tableId);
  let keys = Object.keys(data[0]);
  generateTable(tableId, data);
  generateTableHead(tableId, keys);
}


export const uuid = function () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}


export const get = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    // request state change event
    xhr.onreadystatechange = function () {
      // request completed?
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 0) {
        resolve(xhr.responseText);
      }
      else {
        // request error
        reject(xhr.responseText);
      }
    };
    xhr.open('GET', url);
    xhr.send();

  })
}


export const calculateAge = (momentDate) => {
  var a = moment();
  return moment.duration(a.diff(getMomentDate(momentDate)));
}


export const uniqueId(string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
  var text = '';
  for (var i = 0; i < 6; i++) text += possible.charAt(Math.floor(Math.random() * string.length));
  return text;
}


export const getResultsByFormId = (formId) => {
  return new Promise(async (resolve, reject) => {
    //var database = export const currentUser

    const sqlDb = await userService.getUserDatabase()
    sqlDb.db.query(`tangy-form/responsesByFormId`, {
      startkey: formId,
      endkey: formId,
      include_docs: true
    }).then(result => {
      resolve(result)
    })

  }
  )
}

export const getSingleResultById = (formId) => {
  return new Promise(async (resolve, reject) => {
    //var database = export const currentUser
    const sqlDb = await userService.getUserDatabase()
    sqlDb.db.get(formId).then(result => {
      resolve(result)
    })

  }
  )
}

export const todayDate = (x) => { return new Date().toISOString().split('T')[0] }
export const todayTime = (x) => { return new Date().toTimeString().substring(0, 5) }

