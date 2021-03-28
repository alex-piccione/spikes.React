//import { render } from "@testing-library/react"
import { Component } from "react"
import ReactDOM from "react-dom"

let model = {
  running: false,
  time: 0
}

let Intents = {
  TICK: "Tick",
  START: "Start",
  STOP: "Stop",
  RESET: "Reset"
}

const view = (model:any) => {
  let minutes = Math.floor(model.time / 60)
  let seconds = model.time - (minutes * 60)
  let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`
  return <div>{minutes}:{secondsFormatted}</div>
}

const render = () => {
  ReactDOM.render(view(model), document.getElementById("StopWatch"))
}

const update = (model:any, intent:string) => {
    const updates:any = {
      "TICK": (model:any) => Object.assign(model, {time: model.time + 1 })
    }
    return updates[intent](model)
}

setInterval(() => {
  model = update(model, "TICK")
  render()
}, 1000)

render()