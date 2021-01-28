import React from "react"
import { Board, Move, Value } from "./Board"

interface GameState {
  moves: Move[]
  xIsNext: boolean
}

export class Game extends React.Component<any, GameState> {
  constructor(props: any) {
    super(props)
    this.state = {
      moves: [{ squares: Array<Value>(9).fill(null)}], // initial empty move
      xIsNext: true,
    }

    let a = this.state
  }

  handleClick(i: number) {    
    const moves = this.state.moves
    const current = moves[moves.length-1]
    const squares = current.squares.slice() // copy of current

    if (squares[i] || this.calculateWinner(squares)) return;

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
        moves: moves.concat( {squares:squares} ), // attach to history
        xIsNext: !this.state.xIsNext
    })      
  }

  calculateWinner(squares: Value[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a]
    }
  }

  render() {
    const moves = this.state.moves;
    const current = moves[moves.length - 1]
    const winner = this.calculateWinner(current.squares)
    let status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.xIsNext ? "X" : "O"}`

    return (
      <div className="game">
        <div className="game-board">
          <Board move={current} onClick={(i:number) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{}</ol>
        </div>
      </div>
    )
  }
}
