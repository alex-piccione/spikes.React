import React, { useReducer, useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import { Asset, AssetAtDate } from "./types"
import { SelectedDateContext } from "./Dashboard"
import { AmountField, DatePicker } from "../Fields/index"
import { isSetAccessorDeclaration } from "typescript"

interface Props {
  availableAssets: Asset[],
  selectedDate: Date,
  add: (date:Date, data:AssetAtDate) => void
  close: (evt:any) => void
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
  
          <div className="buttonsRow">
            <span className="btn btn-sm btn-danger" onClick={this.props.close}>Close</span>       
            <span onClick={this.add} className="btn btn-primary btn-sm">Save</span>
          </div>
        </div>
      </div>
    </SelectedDateContext.Provider>
  }

  // TODO
  add() {
    alert("add")
  }

}

interface NewAssetProps {
  assets:Asset[]
  warning: (message:string) => void
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

  //const [asset, dispatch] = useReducer(assetReducer, [])
  const [asset, setAsset] = useState("")
  const [amount, setAmount] = useState<number|undefined>(0)
  const [error, setError] = useState<string>("")

  function clearError() { setError("") }

  const add = () => {   
    if (asset === "") 
      return setError("An Asset must be selected")
    else if (amount||0 <= 0)
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
      <span onClick={add} className="btn btn-primary btn-sm">Add</span>
    </div>
  </div>
   {error && (<div className="row">
     <div className="errorText">{error}</div>      
  </div>)}
</div>
}