import React, { useContext } from "react"
import { Asset, DateAssets, Portfolio, createInitialPortfolio, AssetAtDate } from "./types"
import DateAssetsView from "./DateAssetsView.component"
import DateAssetsAdd from "./DateAssetsAdd.component"
//import InputField from "../Fields/InputField"
//import ImageChangeOnMouseOver from "../spike.ImageChangeOnMouseOver"
//import UseEffect from "../spike.UseEffect"
import ImageToggleOnScroll from "../spike.ImageToggleOnScroll"

import { getDatePart } from "../../date utils"
import { ConfigContext } from "../.."

type DashboardProps = {
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

  //addAsset(date:Date, asset:AssetAtDate) {
  addAsset = (date:Date, asset:AssetAtDate) => {   

    let portfolio = this.state.portfolio   
    let existingDate = portfolio.dates.filter(d => getDatePart(d.date) === getDatePart(date))
    
    if (existingDate.length === 0) {       
      const newDate:DateAssets = { date: date, assets: [asset]}  
      portfolio.dates.push( newDate )
      this.setState({portfolio: portfolio})
    }
    else
    {
      existingDate[0].assets.push( asset )    
      this.setState({portfolio: portfolio})
    }
  }
  
  render() {
    return <div className="container">
      <h1>Portfolio</h1>

      <div>React Hooks spikes</div>

      {/*<InputField />*/}
      {/*<ImageChangeOnMouseOver></ImageChangeOnMouseOver>*/}
      {/*<UseEffect />*/}
      <ImageToggleOnScroll />

      <hr />

      <CurrencyInUse />
      <div><h2>Assets</h2></div>
      {this.state.portfolio.dates.map(d =>
        <DateAssetsView dateAssets={d} key={d.date.getUTCMilliseconds()} ></DateAssetsView>
      )}
      <hr />
      <DateAssetsAdd availableAssets={this.props.availableAssets} add={this.addAsset}></DateAssetsAdd>
      </div>
  }
}

const CurrencyInUse = () => {
  const config = useContext(ConfigContext)
  return <div style={{float: "right"}}>Main currency: <strong>{config.currency}</strong></div>
}
