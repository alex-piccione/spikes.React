import React, { useState } from "react"
import { Asset, AssetAtDate } from "./types"

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
      return this.warning("Please select a date")

    const asset = this.resolveAsset(assetCode)

    const newAsset:AssetAtDate = {
      asset:asset, amount:value
    }
    this.setState({newAsset: newAsset})

    this.props.add(this.state.date, newAsset)
  }

  setDate = (date:Date|null) => this.setState({date: date||undefined})

  warning(message:string) {
    alert(message)
  }


  render() {
    return <div className="card">
      <div className="card-body">
        <h4 className="card-title marginBottom">Add date record</h4>
        <div className="row">
          <div className="col-auto">
            <label className="col-form-label">Date</label>          
          </div>
          <div className="col-auto">
            <input type="date" className="form-control-sm" value={this.state.date && this.state.date.toUTCString()} 
              onChange={evt => this.setDate(evt.target.valueAsDate)}></input>
          </div>
        </div>   
        <NewAsset assets={this.availableAssets()} add={ this.addAsset} warning={this.warning}></NewAsset>     
      </div>
    </div>
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

  selectAsset = (value:string) => {
      this.setState({assetCode: value}) 
  }

  render() {
    return <div className="marginTop">  
        <div className="row justify-item-start">
          <div className="col-auto">
            <select className="form-control-sm" onChange={evt => this.selectAsset(evt.target.value)}>
              <option>(select an asset)</option>
              {this.props.assets.map(a => <option key={a.code} value={a.code}>{a.code}</option>)}
            </select>
          </div>
          <div className="col-auto">
            <input type="number" name="value" className="form-control-sm" onChange={evt => this.changeValue(evt.target.value)}></input>
          </div>
          <div className="col-auto">
            <span onClick={this.add} className="btn btn-primary btn-sm">Add</span>
          </div>
        </div>
    </div>
  }
}