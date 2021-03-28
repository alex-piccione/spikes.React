import { Component } from "react"

const model = {
  running: false,
  time: 0
}

const view = (model:any) => <div>{model.time}</div>

export class StopWatch extends Component {
  render() { return view(model) }
}