import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import "./bootstrap.min.css"
import {Game} from "./components/Game"
import {AuthorQuiz} from "./components/AuthorQuiz"

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

ReactDOM.render(
  <React.StrictMode>
    <AuthorQuiz />
  </React.StrictMode>, 
  document.getElementById("AuthorQuiz")  
)