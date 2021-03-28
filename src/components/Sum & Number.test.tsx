import { render, screen } from "@testing-library/react"
import ReactDOM from "react-dom"
import { act } from "react-dom/test-utils"
import { Sum, Num } from "./Sum & Number"

describe("Num", () => {
  
  it("render", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Num value={0} handleClick={()=>{}} />, div)

    let num = Num({value:0, handleClick:()=>{}})
    expect(num.type).toBe("span")
  })
  
})

describe("Sum", () => {

  test("render_1", () => {
    console.log(1)
    render(<Sum a={0} b={0} data-testid={"test"} />)

    expect(screen.getAllByTestId("test")).toBeDefined()

  })

  console.log(2)
  let container = document.createElement("div")
  document.body.appendChild(container)
  let component:Element

  it("render", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Sum a={0} b={0} data-testid={"test"} />, div)
    const sum = document.querySelector("div[testid='test']")
    if(sum == undefined) throw("sum is undefined")
    expect(sum?.innerHTML).toContain(" = 0")
  })

  let createSum = (a:number,b:number) => <Sum a={a} b={b} />

  describe("when A=0, B=0 and click A", () => {  
    beforeAll(() =>{act(() => {
      const sum = createSum(0, 0)
      ReactDOM.render(sum, container)
      component = container.children[0]
      let A = component.children[0]
      A.dispatchEvent(new MouseEvent('click', {bubbles: true}));  
    })})

    _it("result is 1", () => {      
      expect(component.innerHTML.endsWith(" = 1"))
    })
  })

  it("using act()", () => {
    act(() => {
      render(<Sum a={0} b={0} data-testid="test" />)
    })

    var sum = document.querySelector("[data-testid=test]")
    // expect(sum?.innerHTML).toBe("")
    // expect(sum!.)

  })

})

function _it(test:string, action:() => void) { }

