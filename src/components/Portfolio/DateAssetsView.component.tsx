import React from "react"
import { DateAssets } from "./types"

interface DateViewProps { dateAssets:DateAssets }

export default class DateAssetsView extends React.Component<DateViewProps, DateAssets> {
  constructor(props:DateViewProps){
    super(props)

    this.state = props.dateAssets
  }

  render() {
    return <div className="portfolio-date-container">
      <div className="portfolio-date">{this.state.date.toUTCString()}</div>
      <div className="container portfolio-date-asset">
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