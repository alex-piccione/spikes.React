import React, { createContext, useContext, useState } from "react"
import { Asset, DateAssets, Portfolio, createInitialPortfolio, AssetAtDate } from "./types"
import DateAssetsView from "./DateAssetsView"
import DateAssetsAdd from "./DateAssetsAdd"
import { getDatePart } from "../../date utils"
import { ConfigContext } from "../.."


// https://stackoverflow.com/questions/67559347/react-input-field-updated-by-props-change
export function TestDate(props:{initilaDate:Date|undefined}) {
  const dateString = props.initilaDate?.toISOString().substr(0, 10) || "" 
  const [selectedDate, setDate] = useState(props.initilaDate)

  return <>
    <div>Initial: {dateString} | Selected: {selectedDate?.toLocaleDateString()||""}</div>
    <div>Date1: <input type="date" defaultValue={dateString} value={dateString}  /></div>
    <div>Date2: <input type="date" defaultValue={dateString} value={selectedDate?.toJSON().substr(0, 10)} 
      onChange={evt => setDate(evt.target.valueAsDate || undefined)} /></div>
  </>
}

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

//var selectedDate:Date|undefined = undefined
export function portfolioDateClicked(date:Date) {
  //selectedDate = date
}

export default class PortfolioDashboard extends React.Component<Props, State> {
    
  state = { 
    portfolio: createInitialPortfolio(), 
    clickedDate: undefined ,
    isAddVisible: false
  }

  
  dateClicked = (date:Date) => {
    portfolioDateClicked(date)
    this.setState({clickedDate: date})   
  }  

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

  hideAdd = (event:any) => {
    this.setState({isAddVisible: false})
    // TODO reset timer
  }
  
  render() {
    return <div className="container">
      <h1>Portfolio </h1>
      <CurrencyInUse />  

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
        <DateAssetsAdd availableAssets={this.props.availableAssets}
          selectedDate={this.state.clickedDate||new Date()} 
          add={this.addAsset} close={this.hideAdd} />
      }

    </div>
  }
}

const CurrencyInUse = () => {
  const config = useContext(ConfigContext)
  return <div style={{float: "right"}}>Main currency: <strong>{config.currency}</strong></div>
}