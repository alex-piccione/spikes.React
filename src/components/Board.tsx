import React from "react"

export type Value = null | "X" | "O"

export type Move = {
  squares: Value[]
}

interface BoardProps {
  move: Move,
  onClick: Function
}

interface BoardState {  
  move:Move,
  xIsNext:boolean
}

export class Board extends React.Component<BoardProps, BoardState> {

  renderSquare (i:number) {
    return <Square value={this.props.move.squares[i]} onclick={() => this.props.onClick(i)} />
  }

  render () {
    return (
      <div>
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



interface SquareProps {
  value: Value,
  onclick?: React.MouseEventHandler<HTMLElement>
}
  
let Square = (props:SquareProps) =>
  <button className="square" onClick={props.onclick}>
    {props.value}
  </button>
