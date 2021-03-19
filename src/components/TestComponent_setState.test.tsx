import { Component } from "react"
import ReactDOM from "react-dom"
import { act } from "react-dom/test-utils"

/* Component */

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


/* Test */

describe("Color", () => {
  let container = document.createElement("div")
  document.body.appendChild(container)

  beforeAll(()=> {
    act(() => { 
      // new Color(...).render() returns an error for component not mounted?
      // https://stackoverflow.com/questions/66673412/why-react-jsx-element-created-with-render-is-not-mounted
      ReactDOM.render(<Color value="yellow" />, container)
    })
  })

  describe("when 'click' occours", () => {   

    it("color is changed to 'red'", () => {     
      
      const colorElement = container.children[0]    
      act(() => { 
        colorElement.dispatchEvent(new MouseEvent('click', {bubbles: true}));        
      })

      const style = window.getComputedStyle(colorElement)
      expect(style.color).toBe("red")
    })
  })
})