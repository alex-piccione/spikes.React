import ReactDOM from "react-dom"
import { Action, createStore, Reducer } from "redux"
import { isExpressionWithTypeArguments } from "typescript"
import { StateContainer, createStoreContainer } from "./StateContainer"

//import { createStoreHook, Provider } from "react-redux"



export type State = {
  running:boolean
  time: number  
}

let Store = {


}

export type Intents = "Tick" | "Start" | "Stop" | "Reset"  

const createAction = (intent:Intents) => { return { type: intent} }
const initialState = { running:false, time:0 }

/*
const update = (state:State, intent:Intents) => {
  return (
    intent == "Tick" ? () => (state.running ? Object.assign(state, {time: state.time + 1 } ) : state) :
    intent == "Start" ? () => Object.assign(state, {running: true }) :
    intent == "Stop" ? () => Object.assign(state, {running: false }) :
    intent == "Reset" ? () => Object.assign(state, {time: 0 }) :    
    () => {throw new Error("Intent not valid: " + intent)}
  )()
}*/

const reducer:Reducer<State, Action<Intents>> = (previousState:State|undefined, action:Action<Intents>) => {

  const state = previousState || initialState

  return (
    action.type == "Tick" ? () => (state.running ? Object.assign(state, {time: state.time + 1 } ) : state) :
    action.type == "Start" ? () => Object.assign(state, {running: true }) :
    action.type == "Stop" ? () => Object.assign(state, {running: false }) :
    action.type == "Reset" ? () => Object.assign(state, {time: 0 }) :    
    () => {throw new Error("Intent not valid: " + action.type)}
  )()
}

//let container:StateContainer = createStoreContainer(update)
let state:State = createStore(reducer)

//let createAction (intent:Intents) => new Action<Intents>()

const view = (state:State) => {
  let minutes = Math.floor(state.time / 60)
  let seconds = state.time - (minutes * 60)
  let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`

  let startStop = () => {
    //container.dispatch(state.running ? "Stop" : "Start")    
    reducer(state, createAction(state.running ? "Stop" : "Start"))
  }
  
  let reset = () => {
    //container.dispatch("Reset")
    reducer(state, createAction("Reset"))
  }

  return <div>
      <div>{minutes}:{secondsFormatted}</div>
      <button onClick={startStop}>{state.running ? "Stop" : "Start"}</button>
      <button onClick={reset}>Reset</button>
    </div>
}

const render = () => {
  //ReactDOM.render(view(container.getState()), document.getElementById("StopWatch"))
}

//container.subscribe(render)

setInterval(() => {
  //container.dispatch("Tick")
  //reducer()
}, 1000)

render()