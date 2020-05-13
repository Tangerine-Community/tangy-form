export class TangyFormResponseModel {
  _id:string
  _rev:string
  lastModified:Number
  collection:string
  form:any
  items:Array<any>
  complete:boolean
  focusIndex:Number
  nextFocusIndex:Number
  previousFocusIndex:Number
  startDatetime:Number
  startUnixtime:Number
  uploadDatetime:Number
  location:any
  inputs:Array<any>
  inputsByName:any
  type:string = 'response'
  constructor(data?:any)
}
