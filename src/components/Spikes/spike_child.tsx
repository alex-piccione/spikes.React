import React from "react"

const dates = [
  new Date(2000, 0, 1),
  new Date(2010, 3, 1),
  new Date(2020, 5, 1),
]

export class Container extends React.Component<any, {selectedDate:Date|undefined}> {
  constructor(props:any) {
    super(props)

    this.state = {
      selectedDate: undefined
    }
  }

  render() {
    return (<>
      <DateList dateSelected={(date) => this.setState({selectedDate:date}) } />
      <div>{this.state.selectedDate?.toLocaleDateString()||"n.a."}</div>
      <SingleItem initialDate={this.state.selectedDate} />
      </>
    )
  }
}


interface ListProps {
  dateSelected:(date:Date) => void
}

export class DateList extends React.Component<ListProps, {selectedDate:Date|undefined}> {

  constructor(props:ListProps) {
    super(props)

    this.state = {
      selectedDate: undefined
    }
  }

  render() {
    return dates.map(d => <li key={d.getTime()} onClick={() => this.props.dateSelected(d)} >{d.toLocaleDateString()}</li>)
  }
}

interface SingleItemProps {
  initialDate:Date|undefined
}

export class SingleItem extends React.Component<SingleItemProps, {initialDate:Date, selectedDate:Date}> {

  state = {
    initialDate: this.props.initialDate || new Date(),
    selectedDate: this.props.initialDate || new Date()
  }

  /*constructor(props:SingleItemProps) {
    super(props)
    this.state = {
      initialDate: this.props.initialDate || new Date(),
      selectedDate: this.props.initialDate || new Date()
    }
  }*/

  static getDerivedStateFromProps(props:SingleItemProps, state:any) {
    return {
      initialDate: props.initialDate || new Date(),
      selectedDate: props.initialDate || new Date()
    }
  }
 
  render() {
    const d = (date:Date|undefined) => date === undefined ? "n.a." : date.toLocaleDateString()
    return (
      <div>
        <div>Initial date: {d(this.props.initialDate)} (from props)</div>
        <div>Initial date: {d(this.state.initialDate)}</div>
        <div>Selected date: {d(this.state.selectedDate)}</div>
        <input value={this.state.initialDate.toLocaleDateString()} readOnly={true} />
        <button onClick={() => this.forceUpdate()}>button</button>
      </div>
    )
  }
}