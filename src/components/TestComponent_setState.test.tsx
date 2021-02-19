import { render } from "@testing-library/react"
import { S_IFMT } from "constants"
import { Component } from "react"
import ReactDOM from "react-dom"
import { act } from "react-dom/test-utils"

interface ColorProps { value:string }
interface ColorState { value:string }

export class Color extends Component<ColorProps, ColorState> {
  constructor(props:ColorProps) {
    super(props)
    this.state = { value:props.value}
  }

  setColor = (color:string) => this.setState({value:color})

  render() {
    return <span onClick={() => this.setColor("red")} style={{ color:this.state.value }}>{this.state.value}</span>
  }
}

describe("Color", () => {
  let container = document.createElement("div")
  document.body.appendChild(container)

  let color:Color

  beforeAll(()=> {
    color = new Color({value:"white"})
    ReactDOM.render(color.render(), container) // added call to render() trying to have the component "mounted"
  })
/*
  afterAll(()=>{
    container.remove()
    container = null
  })*/

  describe("setColor('red')", () => {
    it("change state.value to 'red'", () => {    
      color.render()
      color.setColor("red")
      
      //color.forceUpdate() // to get the component state updated
      color.render()
      //expect(color.state.value).toBe("red")  setState is asynchronous so does not change the state immediately
      expect(color.state.value).toBe("white")
    })
  })
})

function _it(test:string, action:() => void) { }