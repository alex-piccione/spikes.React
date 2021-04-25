import { emitWarning } from "process"
import React from "react"
import { Asset, AssetAtDate, DateAssets } from "./Portfolio"

interface Props {
  availableAssets: Asset[],
  add: (date:Date, data:AssetAtDate) => void
}

interface State {
  date: Date | undefined
  newAsset: AssetAtDate | undefined
 // currentAssets: AssetAtDate[]
}

/// componente for adding assets on a specific date
export default class DateAssetsAdd extends React.Component<Props, State> {
  
  constructor(props:Props) {
    super(props)    
    this.state = {
      date: new Date(),
      newAsset: undefined
    }
  }

  resolveAsset = (code:String) => this.props.availableAssets.filter(x => x.code === code)[0]

  availableAssets () {
    return this.props.availableAssets // TODO remove used assets
    // filter
  }

  //addAsset(assetCode:string, value:number) {
  addAsset = (assetCode:string, value:number) => {

    if (this.state.date === undefined)
      return this.warning("Please define a date")

    const asset = this.resolveAsset(assetCode)

    const newAsset:AssetAtDate = {
      asset:asset, amount:value
    }
    this.setState({newAsset: newAsset})

    this.props.add(this.state.date, newAsset)
  }

  warning(message:string) {
    alert(message)
  }

  render() {
    return <>
      <div className="row">        
        <div className="col-auto">
          <label className="col-form-label">Date</label>          
        </div>
        <div className="col-auto">
          <input type="date" className="form-control-sm" value={this.state.date && this.state.date.toUTCString()}></input>
        </div>
      </div>
      <div className="input-group"></div>      
      <div>Assets</div>
      <NewAsset assets={this.availableAssets()} addNew={this.addAsset} warning={this.warning}></NewAsset>     
    </>
  }
}

interface NewAssetProps {
  assets:Asset[]
  warning: (message:string) => void
  addNew:(assetCode:string, value:number) => void
}

interface NewAssetState {
  assetCode:string|undefined
  value:number|undefined
}

class NewAsset extends React.Component<NewAssetProps, NewAssetState> {
  constructor(props:NewAssetProps) {
    super(props)

    this.state = {
      assetCode: undefined,
      value: undefined
    }

    this.changeValue = this.changeValue.bind(this)
  }

  add = () => {
    if (this.state.assetCode === undefined) 
      return this.props.warning("An Asset must be selected")
    else if (this.state.value === undefined)
      return this.props.warning("A value must be defined")

    //alert(`add a value: ${this.state.value} ${this.state.assetCode}`)
    this.props.addNew(this.state.assetCode, this.state.value)
  }

  changeValue = (value:string) => this.setState({value: Number(value)}) 

  selectAsset = (value:string) => {
      this.setState({assetCode: value}) 
  }

  render() {
    return <div className="row">
    <div className="col-auto">
      <select className="form-control-sm" onChange={evt => this.selectAsset(evt.target.value)}>
        <option>(select an asset)</option>
        {this.props.assets.map(a => <option value={a.code}>{a.code}</option>)}
      </select>
    </div>
    <div className="col-auto">
      <input type="number" name="value" className="form-control-sm" onChange={evt => this.changeValue(evt.target.value)}></input>
    </div>
    <div className="col-auto">
      <span onClick={this.add} className="btn btn-primary btn-sm">add Asset</span>
    </div>
  </div>
  }
}