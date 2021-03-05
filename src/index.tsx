import React from "react"
import ReactDOM from "react-dom"
import "./CSS/index.css"
import "./CSS/bootstrap.min.css"
import {Game} from "./components/Game"
import {AuthorQuiz} from "./components/AuthorQuiz"
import { Sum } from "./components/Sum & Number"

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

