import React from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom"
import ReactDOM from "react-dom"
import "./CSS/bootstrap.min.css"
import "./CSS/index.scss"
import { Game } from "./components/Game"
import { AuthorQuiz } from "./components/AuthorQuiz"
import { } from "./components/StopWatch"
import { Sum } from "./components/Sum & Number"
import PortfolioDashboard from "./components/Portfolio/Dashboard"

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>, 
  document.getElementById("game")  
)

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>, 
  document.getElementById("game")  
)

ReactDOM.render(
  <React.StrictMode>
    <Sum a={0} b={0} />
  </React.StrictMode>, 
  document.getElementById("Sum")  
)

ReactDOM.render(
  <React.StrictMode>
    <AuthorQuiz />
  </React.StrictMode>, 
  document.getElementById("AuthorQuiz")  
)

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
  document.getElementById("Portfolio")  
)

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/">
          <React.StrictMode>
            <ConfigContext.Provider value={config}>
              <PortfolioDashboard availableAssets={availableAssets} />
            </ConfigContext.Provider>
          </React.StrictMode>
          </Route>
        </Switch>
      </BrowserRouter>
  )
}