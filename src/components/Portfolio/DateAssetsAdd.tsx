import React, { useReducer, useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import { Asset, AssetAtDate } from "./types"
import { calculateDateFormat } from "../../date utils" 
import { SelectedDateContext } from "./Dashboard"
import { AmountField, DatePicker } from "../Fields/index"

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
    this.state = {
      date: this.props.selectedDate,
      newAsset: undefined
    } 
  }

  static getDerivedStateFromProps(props:Props, state:State) {  
    console.log("props.selectedDate changed: " + props.selectedDate)  
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
    this.setState({date: date||undefined})
  }

  warning(message:string) {
    alert(message)
  }
  
  render() {
    return <SelectedDateContext.Provider value={undefined}>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title marginBottom">Add date record</h4>
          <div className="row">
            <div className="col-auto">
              <label className="col-form-label">Date</label>          
            </div>
            <div className="col-auto">
              <DatePicker onChange={date => this.setDate(date)} class="form-control form-control-sm" />
            </div>
          </div> 
          <div className="row">
              <AssetAndAmountFields assets={this.availableAssets()} add={ this.addAsset } warning={this.warning} />           
          </div>           
          <div className="row">
            <div></div>
          </div>
        </div>
      </div>
    </SelectedDateContext.Provider>
  }
}

interface NewAssetProps {
  assets:Asset[]
  warning: (message:string) => void
  //validate:(assetCode:string, amount:number|undefined) => boolean
  add:(assetCode:string, amount:number) => void
}

const AssetAndAmountFields = (props:NewAssetProps) => { 

  function assetReducer(state:any, action: {type:string, data:string}) {
    switch(action.type) {
      case "asset": {
        return action.data
      }
      default:  return state
    }
  }

  const [asset, dispatch] = useReducer(assetReducer, [])
  const [amount, setAmount] = useState<number|undefined>(0)

  const add = () => {
    
    /*if (props.validate(asset, amount)) {

    }*/

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
      <AmountField isEditing={true} onChange={(value) => setAmount(value)} />
    </div>
    <div className="col-auto">
      <span onClick={add} className="btn btn-primary btn-sm">Add</span>
    </div>
  </div>
</div>
}