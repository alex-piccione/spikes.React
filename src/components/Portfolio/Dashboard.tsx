import React, { createContext, useContext } from "react"
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

// try useContext for passing the selected date
export const SelectedDateContext = createContext(undefined)

type Props = {
  availableAssets: Asset[],
  //dateClicked: (date:Date) => {}
}

type State = {
  portfolio: Portfolio, 
  clickedDate: Date|undefined,
  isAddVisible: boolean
}

var selectedDate:Date|undefined = undefined
export function portfolioDateClicked(date:Date) {
  selectedDate = date
}


export default class PortfolioDashboard extends React.Component<Props, State> {
    
  state = { 
    portfolio: createInitialPortfolio(), 
    clickedDate: undefined ,
    isAddVisible: false
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

  showAdd = (event:any) => {
    this.setState({isAddVisible: true})
    // TODO start timer
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
      { !this.state.isAddVisible && <button className="btn btn-primary btn-sm" onClick={this.showAdd}>Add</button>}
      { this.state.isAddVisible && 
        <DateAssetsAdd availableAssets={this.props.availableAssets} selectedDate={this.state.clickedDate||new Date()} add={this.addAsset}></DateAssetsAdd>
      }

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