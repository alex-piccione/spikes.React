import React from "react"
import { Board, Move, Value } from "./Board"

interface GameState {
  step:number
  moves: Move[]
  xIsNext: boolean
}

export class Game extends React.Component<any, GameState> {
  constructor(props: any) {
    super(props)
    this.state = {
      step: 0,
      moves: [{ squares: Array<Value>(9).fill(null)}], // initial empty move
      xIsNext: true,
    }

    let a = this.state
  }

  handleClick(i: number) {    
    const moves = this.state.moves.slice(0, this.state.step+1) // cut off eventual "future" steps
    const current = moves[moves.length-1]
    const squares = current.squares.slice() // copy of current

    if (squares[i] || this.calculateWinner(squares)) return;

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
        step: moves.length,
        moves: moves.concat( {squares:squares} ), // add to the step history
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

  jumpTo(step:number) {
    this.setState({ 
        step: step, 
        xIsNext: (step % 2) == 0})
  }

  render() {
    const moves = this.state.moves;
    const current = moves[this.state.step]
    const winner = this.calculateWinner(current.squares)
    let status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.xIsNext ? "X" : "O"}`

    const steps = moves.map( (move, index) => {
        const text = index ?
            "Go to move #" + index :
            "Go to game start"
        return (
            <li key={index}>
                <button onClick={() => this.jumpTo(index)}>{text}</button>
            </li>
        )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board move={current} onClick={(i:number) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{steps}</ol>
        </div>
      </div>
    )
  }
}
