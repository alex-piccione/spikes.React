import React from "react"
//import {Value, Square} from "./Square"

interface BoardProps {

}

interface BoardState {
  squares:Array<Value>
  xIsNext:boolean
}

export class Board extends React.Component<BoardProps, BoardState> {

  constructor(props:BoardProps) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  handleClick(i:number) {
      const squares = this.state.squares.slice()
      squares[i] = this.state.xIsNext ? 'X' : 'O'
      this.setState({
          squares:squares,
          xIsNext: !this.state.xIsNext
        })      
  }

  renderSquare (i:number) {
    return <Square value={this.state.squares[i]} onclick={() => this.handleClick(i)} />
  }

  render () {
    const status = `Next player: ${this.state.xIsNext?"X":"O"}`

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }

}

type Value = null | "X" | "O"

interface SquareProps {
  value: Value,
  onclick?: React.MouseEventHandler<HTMLElement>
}
  
let Square = (props:SquareProps) =>
  <button className="square" onClick={props.onclick}>
    {props.value}
  </button>
