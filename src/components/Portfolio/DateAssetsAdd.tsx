import React, { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import { Asset, AssetAtDate } from "./types"
import { SelectedDateContext } from "./Dashboard"
import { AmountField, DatePicker } from "../Fields/index"
import useInterval from "../useInterval"

interface Props {
  assets: Asset[],
  existingDates: Date[]
  add: (date:Date, assets:AssetAtDate[]) => void
  close: (evt:any) => void
}

interface State {
  date: Date | undefined
  assets: AssetAtDate[]
  availableAssets: Asset[]
}

/// component for adding assets on a specific date
export default class DateAssetsAdd extends React.Component<Props, State> {  

  state = {
    date: new Date(),
    assets: Array.of<AssetAtDate>(),
    availableAssets: this.props.assets
  }  
/*
  static getDerivedStateFromProps(props:Props, state:State) {  
    console.log("props.selectedDate changed: " + props.selectedDate)  
    state.date = props.selectedDate || new Date()
    return state
    // date.return {...state, date: props.selectedDate]}
      //date: this.props.selectedDate,
     // selectedDate: props.initialDate || new Date()
    //}
  }*/

  resolveAsset = (code:String) => this.props.assets.filter(x => x.code === code)[0]
  
  addAsset = (assetCode:string, value:number) => {
    const asset = this.resolveAsset(assetCode)
    const newAsset:AssetAtDate = {
      asset:asset, amount:value
    }
    this.setState({
      assets: [...this.state.assets, newAsset],
      availableAssets: this.state.availableAssets.filter(a => a.code !== asset.code)
    })    
  }

  setDate = (date:Date|undefined) => {
    this.setState({date: date||undefined})

    if (date && this.props.existingDates.filter(d => d.getTime() === date.getTime()))
      this.warning("Date already exists")
  }

  warning(message:string) {
    alert(message)
  }
  
  render() {
    return <SelectedDateContext.Provider value={undefined}>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title marginBottom">Add assets at date</h4>          
          <div className="row">
            <div className="col-auto">
              <label className="col-form-label">Date</label>          
            </div>
            <div className="col-auto">
              <DatePicker onChange={date => this.setDate(date)} class="form-control form-control-sm" />
            </div>
          </div>
          <div className="row">
            <div className="col-auto"><label className="col-form-label">Assets</label></div>
            <div className="col-auto">
              {this.state.assets.length === 0 && "(empty)"}
              {this.state.assets.map(asset => 
                <div className="row row-assets" key={asset.asset.code}>              
                  <div className="col-auto col-asset-name">{asset.asset.code}</div>
                  <div className="col-auto col-asset-quantity">{asset.amount}</div>
                </div>
              )} 
            </div>
          </div>
          <div className="row">
              <AssetAndAmountFields assets={this.state.availableAssets} add={ this.addAsset } warning={this.warning} />           
          </div>
          <div className="buttonsRow">
            <span className="btn btn-sm btn-danger" onClick={this.props.close}>Close</span>       
            <span onClick={this.save} className="btn btn-primary btn-sm">Save</span>
          </div>
        </div>
      </div>
    </SelectedDateContext.Provider>
  }

  // TODO
  save = () => {
    console.log("date: " + this.state.date)
    if (this.state.date === undefined)
      return this.warning("Please select a date")

    if (this.props.existingDates.filter(d => d.getTime() === this.state.date.getTime()))
      return this.warning("Date already exists")

    if (this.state.assets.length === 0)
      return this.warning("Please add some assets")

    this.props.add(this.state.date, this.state.assets)
  }
}

interface NewAssetProps {
  assets:Asset[]
  warning: (message:string) => void
  add:(assetCode:string, amount:number) => void
}

const AssetAndAmountFields = (props:NewAssetProps) => { 

  /*function assetReducer(state:any, action: {type:string, data:string}) {
    switch(action.type) {
      case "asset": {
        return action.data
      }
      default:  return state
    }
  }*/

  //const [asset, dispatch] = useReducer(assetReducer, [])
  const [asset, setAsset] = useState("")
  const [amount, setAmount] = useState<number|undefined>(0)
  const [error, setError] = useState<string>("")
  const [remainingSeconds, setRemainingSeconds] = useState(300) // time
  useInterval(
    () => setRemainingSeconds(remainingSeconds-1),
    remainingSeconds > 0 ? 1000 : null
  )

  function clearError() { setError("") }

  const add = () => {   
    if (asset === "") 
      return setError("An Asset must be selected")
    else if ((amount||0) <= 0)
      return setError("An Amount value must be defined")    
    props.add(asset, amount!)
  }

  return  <div className="marginTop">  
  <div className="row justify-item-start">
    <div className="col-auto">
      <label className="col-form-label">Asset</label>          
    </div>
    <div className="col-auto">
      <select className="form-control form-control-sm" onChange={evt => { clearError(); setAsset(evt.target.value)}}>
        <option value="">(select an asset)</option>
        {props.assets.map(a => <option key={a.code} value={a.code}>{a.code}</option>)}
      </select>
    </div>
    <div className="col-auto">
      <label className="col-form-label">Amount</label>          
    </div>
    <div className="col-auto">
      <AmountField isEditing={true} onChange={(value) => { clearError(); setAmount(value)}} />
    </div>
    <div className="col-auto">
      <button onClick={add} className="btn btn-primary btn-sm" disabled={remainingSeconds === 0} >Add</button>
      {  (remainingSeconds > 0) && (<span style={{marginLeft: "8px"}}>{remainingSeconds} seconds to complete</span>)}
    </div>
  </div>
   {error && (<div className="row">
     <div className="errorText">{error}</div>      
  </div>)}
</div>
}