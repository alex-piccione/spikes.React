import React from "react"
import { DateAssets } from "./types"

interface DateViewProps { dateAssets:DateAssets }

export default class DateAssetsView extends React.Component<DateViewProps, DateAssets> {
  constructor(props:DateViewProps){
    super(props)

    this.state = props.dateAssets
  }

  render() {
    return <div className="card assetsview">
      <div className="assetsview-date">{this.state.date.toLocaleDateString()}</div>
      <div className="container assetsview-asset">
      {this.state.assets.map(asset => 
        <div key={asset.asset.code} className="row">
          <div className="col-sm">{asset.asset.code}</div>
          <div className="col-md">{asset.amount}</div>
        </div>
        )}
        </div>
      </div>
  }
}