import React from "react"

export type Value = null | "X" | "O"

interface SquareProps {
    value: Value,
    onclick?: React.MouseEventHandler<HTMLElement>
  }
  
export class Square extends React.Component<SquareProps> {

  render() {
    return (
      <button className="square" onClick={this.props.onclick}>
        {this.props.value}
      </button>
    )
  }
  
}