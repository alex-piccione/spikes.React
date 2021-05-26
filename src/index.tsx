import React from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom"
import ReactDOM from "react-dom"
import "./CSS/bootstrap.min.css"
import "./CSS/index.scss"
import { Game } from "./components/Game/Game"
import { AuthorQuiz } from "./components/AuthorQuiz"
import { } from "./components/StopWatch"
import { Sum } from "./components/Sum & Number"
import PortfolioDashboard from "./components/Portfolio/Dashboard"
import Header from "./components/Header";

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
    { url:"/game", name:"Game"}
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