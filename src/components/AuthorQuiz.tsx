import { Component } from "react"

export class AuthorQuiz extends Component {
    render() {
      return <div>quiz
          <Sum a={2} b={4}></Sum>
        </div>
    }
}

let Sum = (props:any) => <div className="alert alert-primary"><Number value={0} /> + <Number value={1}></Number> = {props.a + props.b}</div>  


type NumberProps = {
  value: number
}

type NumberState = {  
  clicks:number
}

export class Number extends Component<NumberProps, NumberState> {
  constructor(props:NumberProps) {
    super(props)
    this.state = {clicks: props.value}
  }

  numberStyle = () => { return {
    cursor: "pointer",
    color: this.state.clicks > 0 ? "blue" : "red"
  }}

  render() {
    return <span style={this.numberStyle()} onClick={() => this.setState({clicks: this.state.clicks+1})}>{this.state.clicks}</span>
  }
}

