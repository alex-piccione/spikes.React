import React from "react"
//import {Value, Square} from "./Square"

interface BoardProps {

}

interface BoardState {
  squares:Array<Value>
}

export class Board extends React.Component<BoardProps, BoardState> {

  constructor(props:BoardProps) {
    super(props)
    this.state = {
      squares: Array(9).fill(null)
    }
  }

  handleClick(i:number) {
      const squares = this.state.squares.slice()
      squares[i] = 'X'
      this.setState({squares:squares})
  }

  renderSquare (i:number) {
    return <Square value={this.state.squares[i]} onclick={() => this.handleClick(i)} />
  }

  render () {
    const status = "Next player: X"

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
