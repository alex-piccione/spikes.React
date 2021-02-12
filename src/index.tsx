import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import {Game} from "./components/Game"

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>, 
  document.getElementById("game")  
)

function Hello(props:any) {
  return <h1>Hello at {props.now}</h1>
}

ReactDOM.render(
  <React.StrictMode>
    <Hello now={new Date().toISOString()} />
  </React.StrictMode>, 
  document.getElementById("hello")  
)