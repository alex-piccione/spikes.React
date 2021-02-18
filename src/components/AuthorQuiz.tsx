import { Component } from "react"

export class AuthorQuiz extends Component {
    render() {
      return <div>quiz
          <Sum a={2} b={4}></Sum>
        </div>
    }
}

let Sum = (props:any) => <div className="alert alert-primary">{props.a} + {props.b} = {props.a + props.b}</div>  
