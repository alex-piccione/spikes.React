import { Component } from "react"

interface SumProps {
  a:number
  b:number
}

interface SumState {
  a:number
  b:number
  sum:number
}

type AB = "A" | "B"

export class Sum extends Component<SumProps, SumState> {
  constructor(props:SumProps) {
    super(props)
    this.state = {a:props.a, b:props.b, sum:this.sum(props.a, props.b)}
  }
  sum = (a:number, b:number) => a+b

  click = (n:AB) => {     
    n == "A" ?
    this.setState({a: this.state.a + 1, sum: this.sum(this.state.a+1, this.state.b)}) :
    this.setState({b: this.state.b + 1, sum: this.sum(this.state.a, this.state.b+1)})
  }
      
  render() {
    return <div className="alert alert-primary">
      <Num value={this.state.a} handleClick={() => this.click("A")} /> + <Num value={this.state.b} handleClick={() => this.click("B")} /> = {this.state.sum}
      </div>  
  }
}

let numberStyle = (value:number) => { return {
  cursor: "pointer",
  color: value > 0 ? "blue" : "red"
}}
interface NumProps { value:number, handleClick:()=>void }
export function Num(props:NumProps) { return <span style={numberStyle(props.value)} onClick={props.handleClick}>{props.value}</span> }
