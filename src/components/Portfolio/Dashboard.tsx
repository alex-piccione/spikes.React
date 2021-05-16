import React, { useContext } from "react"
import { Asset, DateAssets, Portfolio, createInitialPortfolio, AssetAtDate } from "./types"
import DateAssetsView from "./DateAssetsView.component"
import DateAssetsAdd, { TestDate } from "./DateAssetsAdd.component"
import { Container } from "../spike.child"
import { getDatePart } from "../../date utils"
import { ConfigContext } from "../.."
//import InputField from "../Fields/InputField"
//import ImageChangeOnMouseOver from "../spike.ImageChangeOnMouseOver"
//import UseEffect from "../spike.UseEffect"
//import ImageToggleOnScroll from "../spike.ImageToggleOnScroll"

type DashboardProps = {
  availableAssets: Asset[],
  //dateClicked: (date:Date) => {}
}

type DashboardState = {
  portfolio: Portfolio, 
  clickedDate: Date|undefined
}

var selectedDate:Date|undefined = undefined
export function portfolioDateClicked(date:Date) {
  selectedDate = date
}


export default class PortfolioDashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props:DashboardProps) {
    super(props) 
    
    this.state = { portfolio: createInitialPortfolio(), clickedDate: undefined  }
  }  

  dateClicked = (date:Date) => {
    portfolioDateClicked(date)
//    updateState(date)
    //this.setState({date})
    this.setState({clickedDate: date})   
    //alert(date)

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
      <h1>Portfolio </h1>
      <CurrencyInUse />
      
      <Spikes show={false} /> 

      { false && <Container /> }
      
      <h2>Assets</h2>
      { this.state.portfolio.dates.length > 0 ?
      this.state.portfolio.dates.map(d =>
        <DateAssetsView key={d.date.getTime()} dateAssets={d} dateClicked={() => this.dateClicked(d.date) } ></DateAssetsView>
      ) : <div className="body2">There are no dates.</div>
      }
      <hr />
      { false && <TestDate initilaDate={this.state.clickedDate||new Date()} /> }
      <DateAssetsAdd availableAssets={this.props.availableAssets} selectedDate={this.state.clickedDate||new Date()} add={this.addAsset}></DateAssetsAdd>

    </div>
  }
}

const CurrencyInUse = () => {
  const config = useContext(ConfigContext)
  return <div style={{float: "right"}}>Main currency: <strong>{config.currency}</strong></div>
}

const Spikes = (props:{show:boolean}) => (props.show ? <>     
    <div>React Hooks spikes</div>

    {/*<InputField />*/}
    {/*<ImageChangeOnMouseOver></ImageChangeOnMouseOver>*/}
    {/*<UseEffect />*/}
    {/*<ImageToggleOnScroll />*/}

    <hr />    
</>:null)