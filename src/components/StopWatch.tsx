import ReactDOM from "react-dom"
import { Action, createStore, Reducer } from "redux"

export type State = {
  running:boolean
  time: number  
}

export type Intents = "Tick" | "Start" | "Stop" | "Reset"  

const createAction = (intent:Intents) => { return { type: intent} }
const initialState = { running:false, time:0 }

const reducer:Reducer<State, Action<Intents>> = (previousState:State|undefined, action:Action<Intents>) => {

  const state = previousState || initialState
  return action.type === "Tick" ? (state.running ? Object.assign(state, {time: state.time + 1 } ) : state) :
    action.type === "Start" ? Object.assign(state, {running: true }) :
    action.type === "Stop" ? Object.assign(state, {running: false }) :
    action.type === "Reset" ? Object.assign(state, {time: 0 }) :    
    state  
}

let store = createStore(reducer)

const view = (state:State) => {
  let minutes = Math.floor(state.time / 60)
  let seconds = state.time - (minutes * 60)
  let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`

  let startStop = () => {
    store.dispatch(createAction(state.running ? "Stop" : "Start"))
  }
  
  let reset = () => {
    store.dispatch(createAction("Reset"))
  }

  return <div>
      <div>{minutes}:{secondsFormatted}</div>
      <button onClick={startStop}>{state.running ? "Stop" : "Start"}</button>
      <button onClick={reset}>Reset</button>
    </div>
}

const render = () => {
  ReactDOM.render(view(store.getState()), document.getElementById("StopWatch"))
}

store.subscribe(render)

setInterval(() => {
  store.dispatch(createAction("Tick"))
}, 1000)

render()