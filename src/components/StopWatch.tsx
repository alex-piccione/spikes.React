import ReactDOM from "react-dom"
import { StateContainer, createStoreContainer } from "./StateContainer"

export type State = {
  running:boolean
  time: number  
}

export type Intents = "Tick" | "Start" | "Stop" | "Reset"

const update = (state:State, intent:Intents) => {
  return (
    intent == "Tick" ? () => (state.running ? Object.assign(state, {time: state.time + 1 } ) : state) :
    intent == "Start" ? () => Object.assign(state, {running: true }) :
    intent == "Stop" ? () => Object.assign(state, {running: false }) :
    intent == "Reset" ? () => Object.assign(state, {time: 0 }) :    
    () => {throw new Error("Intent not valid: " + intent)}
  )()
}

let container:StateContainer = createStoreContainer(update)

const view = (state:State) => {
  let minutes = Math.floor(state.time / 60)
  let seconds = state.time - (minutes * 60)
  let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`

  let startStop = () => {
    container.dispatch(state.running ? "Stop" : "Start")
  }
  
  let reset= () => {
    container.dispatch("Reset")
  }

  return <div>
    <div>{minutes}:{secondsFormatted}</div>
    <button onClick={startStop}>{state.running ? "Stop" : "Start"}</button>
    <button onClick={reset}>Reset</button>
  </div>
}

const render = () => {
  ReactDOM.render(view(container.getState()), document.getElementById("StopWatch"))
}

container.subscribe(render)

setInterval(() => {
  container.dispatch("Tick")
}, 1000)

render()