//import { render } from "@testing-library/react"
import { Component } from "react"
import ReactDOM from "react-dom"

let model = {
  running: false,
  time: 0
}
/*
type Intents {
  TICK: "Tick",
  START: "Start",
  STOP: "Stop",
  RESET: "Reset"
}*/

const view = () => {
  let minutes = Math.floor(model.time / 60)
  let seconds = model.time - (minutes * 60)
  let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`
  return <div>
    <div>{minutes}:{secondsFormatted}</div>
    <button onClick={handler}>{model.running ? "Stop" : "Start"}</button>
    <button onClick={reset}>Reset</button>
  </div>
}

const render = () => {
  ReactDOM.render(view(), document.getElementById("StopWatch"))
}

const update = (model:any, intent:string) => {
    const updates:any = {
      "TICK": () => Object.assign(model, {time: model.time + 1 }),
      "START": () => Object.assign(model, {running: true }),
      "STOP": () => Object.assign(model, {running: false }),
      "RESET": () => Object.assign(model, {time: 0 }),
    }
    return updates[intent](model)
}

let handler = (event:any) => {
  model = update(model, model.running ? "STOP" : "START" )
  render()
}
let reset= () => {
  model = update(model, "RESET" )
  render()
}

setInterval(() => {
  if(model.running)
    model = update(model, "TICK")
  render()
}, 1000)

render()