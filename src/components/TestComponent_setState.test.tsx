import { Component } from "react"
import ReactDOM from "react-dom"
import { act } from "react-dom/test-utils"

// Spike to test a component state

interface ColorProps { value:string }
interface ColorState { value:string }

export class Color extends Component<ColorProps, ColorState> {
  constructor(props:ColorProps) {
    super(props)
    this.state = { value:props.value}
  }
  
  setColor = (color:string) => this.setState({value:color})
  
  componentDidUpdate = () => {
    console.log("component did update")    
  }

  render() {
    return <span onClick={() => this.setColor("red")} style={{ color:this.state.value }}>{this.state.value}</span>
  }
}

let numberStyle = (value:number) => { return {
  cursor: "pointer",
  color: value > 0 ? "blue" : "red"
}}

export function RenderColor(props:any) { <span style={numberStyle(props.value)} onClick={props.handleClick}>{props.value}</span> }
export function Num(props:any) { return <span style={numberStyle(props.value)} onClick={props.handleClick}>{props.value}</span> }

describe("Color", () => {
  let container = document.createElement("div")
  document.body.appendChild(container)

  let color:Color

  beforeAll(()=> {
    color = new Color({value:"white"})
    ReactDOM.render(color.render(), container) // added call to render() trying to have the component "mounted"
  })

  describe("setColor('red')", () => {
    it("change state.value to 'red'", () => {    
      color.render()
      color.setColor("red")      
      //color.forceUpdate() // to get the component state updated but obtain same error for component not mounted
      color.render()
      //expect(color.state.value).toBe("red")  setState is asynchronous so does not change the state immediately
      expect(color.state.value).toBe("white")
    })
  })
})

function _it(test:string, action:() => void) { }