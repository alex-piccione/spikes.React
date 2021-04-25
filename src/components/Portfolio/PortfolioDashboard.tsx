import React from "react"
import { Asset, DateAssets, Portfolio, createInitialPortfolio, AssetAtDate } from "./Portfolio"
import DateAssetsView from "./DateAssetsView.component"
import DateAssetsAdd from "./DateAssetsAdd.component"

type DashboardProps = {
  currency: string
  availableAssets: Asset[]
}

type DashboardState = {
  portfolio: Portfolio
}

export default class PortfolioDashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props:DashboardProps) {
    super(props) 
    
    this.state = { portfolio: createInitialPortfolio() }
  }

  addAsset(date:Date, asset:AssetAtDate) {
    
    // TODO not implemented
    //alert(date.toUTCString())


  }
  
  render() {
    return <div className="container">
      <h1>Portfolio</h1>
      <div>Currency: {this.props.currency}</div>
      <div><h2>Assets</h2></div>
      {this.state.portfolio.dates.map(d =>
        <DateAssetsView dateAssets={d} key={d.date.getUTCMilliseconds()} ></DateAssetsView>
      )}
      <hr />
      <DateAssetsAdd availableAssets={this.props.availableAssets} add={this.addAsset}></DateAssetsAdd>
      </div>
  }
}
