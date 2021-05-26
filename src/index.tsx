import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route} from "react-router-dom"

import "./CSS/bootstrap.min.css"
import "./CSS/index.scss"

import PortfolioDashboard from "./components/Portfolio/Dashboard"
import Header from "./components/Header";
import { Game } from "./components/Game/Game"
import { AuthorQuiz } from "./components/AuthorQuiz"
import { Sum } from "./components/Sum & Number"
import Spikes from "./components/Spikes/Spikes.page"
import { } from "./components/StopWatch"


const availableAssets = [
  { name: "Pound", code: "GBP"},
  { name: "Euro", code: "EUR"},
  { name: "US Dollar", code: "USD"},
  { name: "Bitcoin", code: "BTC"},
]

const config = {
  currency: "GBP",
  dateFormat: "dd MMM yyyy"
}
export const ConfigContext = React.createContext(config)

ReactDOM.render(
  <App />, 
  document.getElementById("app") 
)

function App() {

  const pages = [
    { url:"/portfolio", name:"Portfolio"},
    { url:"/sum", name:"Sum"},
    { url:"/game", name:"Game"},
    { url:"/spikes", name:"Spikes"}
  ]

  return (<div>    
    <React.StrictMode>      
      <BrowserRouter>
        <Header pages={pages} />
        <div id="body">
          <Switch>
            <Route path="/sum">            
              <Sum a={0} b={0} />
            </Route>
            <Route path="/stopwatch">
              <div>Stopwatch</div>
            </Route>
            <Route path="/game">            
              <Game />
            </Route>
            <Route path="/quiz">   
              <AuthorQuiz />
            </Route>
            <Route path="/spikes">   
              <Spikes />
            </Route>
            <Route path="/">
              <ConfigContext.Provider value={config}>
                <PortfolioDashboard availableAssets={availableAssets} />
              </ConfigContext.Provider>
            </Route>          
          </Switch>
        </div>
      </BrowserRouter>
    </React.StrictMode>
    </div>
  )
}