import React, { useReducer, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Asset, AssetAtDate } from "./types"
import {single} from "../../utils"
import { calculateDateFormat } from "../../date utils" 
import { SelectedDateContext } from "./Dashboard"
import {AmountField, DatePicker as MyDatePicker} from "../Fields/index"

const dateFormat = calculateDateFormat()

// https://stackoverflow.com/questions/67559347/react-input-field-updated-by-props-change
export function TestDate(props:{initilaDate:Date|undefined}) {
  const dateString = props.initilaDate?.toISOString().substr(0, 10) || "" 
  const [selectedDate, setDate] = useState(props.initilaDate)

  return <>
    <div>Initial: {dateString} | Selected: {selectedDate?.toLocaleDateString()||""}</div>
    <div>Date1: <input type="date" defaultValue={dateString} value={dateString}  /></div>
    <div>Date2: <input type="date" defaultValue={dateString} value={selectedDate?.toJSON().substr(0, 10)} 
      onChange={evt => setDate(evt.target.valueAsDate || undefined)} /></div>
  </>
}

interface Props {
  availableAssets: Asset[],
  selectedDate: Date,
  add: (date:Date, data:AssetAtDate) => void
}

interface State {
  date: Date | undefined
  newAsset: AssetAtDate | undefined
}

/// component for adding assets on a specific date
export default class DateAssetsAdd extends React.Component<Props, State> {
  
  constructor(props:Props) {
    super(props)   
    //alert(`set date: ${this.props.selectedDate.toJSON().substr(0, 10)}`) 
    this.state = {
      date: this.props.selectedDate,
      newAsset: undefined
    } 

    //const a = portfolioDateClicked.bind(this.props.selectedDate) // = (date:Date) => this.setDate(date)
  }

  static getDerivedStateFromProps(props:Props, state:State) {    
    state.date = props.selectedDate || new Date()
    return state
    // date.return {...state, date: props.selectedDate]}
      //date: this.props.selectedDate,
     // selectedDate: props.initialDate || new Date()
    //}
  }

  resolveAsset = (code:String) => this.props.availableAssets.filter(x => x.code === code)[0]

  availableAssets() {
    return this.props.availableAssets // TODO remove used assets
    // filter
  }
   
  addAsset = (assetCode:string, value:number) => {

    if (this.state.date === undefined)
      return this.warning("Please select a date")

    const asset = this.resolveAsset(assetCode)

    const newAsset:AssetAtDate = {
      asset:asset, amount:value
    }
    this.setState({newAsset: newAsset})

    this.props.add(this.state.date, newAsset)
  }

  setDate = (date:Date|undefined) => {
    //alert("setdate")
    //const date = date === null ? undefined : single<Date>(dates)
    this.setState({date: date||undefined})
  }

  warning(message:string) {
    alert(message)
  }
  
  logDate = (date:Date|null) => console.log(date)
  dateChanged = (date:Date|null) => this.setState({date: date||undefined})

  render() {
    return <SelectedDateContext.Provider value={undefined}>
      <div className="card">
      {/* date: {this.props.selectedDate?.toJSON().substr(0, 10)} */}
      <div className="card-body">
        <h4 className="card-title marginBottom">Add date record</h4>
        <div className="row">
          <div className="col-auto">
            <label className="col-form-label">Date</label>          
          </div>
          <div className="col-auto">
            <MyDatePicker onChange={d => this.setDate(d)} />
            {false && <input type="date" onChange={ evt => this.dateChanged(evt.target.valueAsDate)} defaultValue={this.state.date?.toJSON().substr(0, 10) || ""} /> }

            

            {/*
            <DatePicker selected={this.state.date} onChange={(date) => this.setDate(date)} dateFormat={dateFormat} className="form-control form-control-sm" />
             
            <input id="selectedDate" type="date" className="form-control form-control-sm"   name="aa"          
            defaultValue={ (this.props.selectedDate || new Date()).toISOString().substring(0, 10)}></input>
            <input type="date" className="form-control form-control-sm"             
              defaultValue={ (this.props.selectedDate || new Date()).toISOString().substring(0, 10)}
              onChange={evt => this.setDate(evt.target.valueAsDate)}></input>
              */}
          </div>
        </div>   
        <AssetAmountField assets={this.availableAssets()} add={ this.addAsset} warning={this.warning} />

        <NewAsset assets={this.availableAssets()} add={ this.addAsset} warning={this.warning}></NewAsset>     
      </div>
    </div>
    </SelectedDateContext.Provider>
  }
}

interface NewAssetProps {
  assets:Asset[]
  warning: (message:string) => void
  add:(assetCode:string, amount:number) => void
}

interface NewAssetState {
  assetCode:string|undefined
  amount:number|undefined
}

const AssetAmountField = (props:NewAssetProps) => { 

  function assetReducer(state:any, action: {type:string, data:string}) {
    switch(action.type) {
      case "asset": {
        return action.data
      }
      default:  return state
    }
  }

  const [asset, dispatch] = useReducer(assetReducer, [])

  const add = () => {
    /*if (this.state.assetCode === undefined) 
      return this.props.warning("An Asset must be selected")
    else if (this.state.amount === undefined)
      return this.props.warning("A value must be defined")*/

    //props.add(state.assetCode, state.amount)
  }

  return  <div className="marginTop">  
  <div className="row justify-item-start">
    <div className="col-auto">
      <label className="col-form-label">Asset</label>          
    </div>
    <div className="col-auto">
      <select className="form-control form-control-sm" onChange={evt => dispatch({type: "asset", data: evt.target.value})}>
        <option>(select an asset)</option>
        {props.assets.map(a => <option key={a.code} value={a.code}>{a.code}</option>)}
      </select>
    </div>
    <div className="col-auto">
      <label className="col-form-label">Amount</label>          
    </div>
    <div className="col-auto">
      <AmountField isEditing={true} onChange={(value) => dispatch({type:"amnount", data:""})} />
    </div>
    <div className="col-auto">
      <span onClick={add} className="btn btn-primary btn-sm">Add</span>
    </div>
  </div>
</div>
}

class NewAsset extends React.Component<NewAssetProps, NewAssetState> {
  constructor(props:NewAssetProps) {
    super(props)

    this.state = {
      assetCode: undefined,
      amount: undefined
    }

    this.changeValue = this.changeValue.bind(this)
  }

  add = () => {
    if (this.state.assetCode === undefined) 
      return this.props.warning("An Asset must be selected")
    else if (this.state.amount === undefined)
      return this.props.warning("A value must be defined")

    this.props.add(this.state.assetCode, this.state.amount)
  }

  changeValue = (value:string) => this.setState({amount: Number(value)}) 
  changeAmount = (value:number|undefined) => this.setState({amount: value}) 

  selectAsset = (value:string) => {
      this.setState({assetCode: value}) 
  }

  render() {
    return <div className="marginTop">  
        <div className="row justify-item-start">
          <div className="col-auto">
            <label className="col-form-label">Asset</label>          
          </div>
          <div className="col-auto">
            <select className="form-control form-control-sm" onChange={evt => this.selectAsset(evt.target.value)}>
              <option>(select an asset)</option>
              {this.props.assets.map(a => <option key={a.code} value={a.code}>{a.code}</option>)}
            </select>
          </div>
          <div className="col-auto">
            <label className="col-form-label">Amount</label>          
          </div>
          <div className="col-auto">
            <AmountField isEditing={true} onChange={ this.changeAmount} />
            <input type="number" name="value" className="form-control form-control-sm" onChange={evt => this.changeValue(evt.target.value)}></input>
          </div>
          <div className="col-auto">
            <span onClick={this.add} className="btn btn-primary btn-sm">Add</span>
          </div>
        </div>
    </div>
  }
}
