import React from "react"
import ReactDOM from "react-dom"
import "./index.css"

import {Board} from "./components/Board"

// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVit


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board></Board>
        </div>
        <div className="game-info">
          <div>{/*status*/}</div>
          <ol>{}</ol>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />, document.getElementById("root")
)