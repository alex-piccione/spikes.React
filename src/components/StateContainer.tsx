import { State, Intents } from "./StopWatch"

export type StateContainer = {
  getState: () => State 
  dispatch: (intent:Intents) => void
  subscribe: (action:Function) => void
}

export function createStoreContainer(update:(state:State, intent:Intents) => State): StateContainer {

  let internalState = {
    running: false,
    time: 0
  }

  let handlers:Function[] = []

  return {
    getState: () => internalState,
    dispatch: (intent:Intents) => {
      internalState = update(internalState, intent)
      handlers.forEach(h => h())
    },
    subscribe: (handler:Function) => {
      handlers.push(handler)
    }
  }
}