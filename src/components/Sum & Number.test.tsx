import { render } from "@testing-library/react"
import React from "react"
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

  let container = document.createElement("div")
  document.body.appendChild(container)
  let sum:Sum

  it("render", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Sum a={0} b={0} data-testid={"test"} />, div)
    const sum = document.getElementsByTagName("div")[0]
    if(sum == undefined) throw("sum is undefined")
    expect(sum?.innerHTML).toContain(" = 0")
  })

  beforeAll(() => {
    sum = new Sum({a:0, b:0})  
    ReactDOM.render(sum.render(), container)
  })

  describe("when A=0, B=0 and click A", () => {    
    it("sum is 1", () => {
      _act(()=>{
        sum.click("A")
        //sum.forceUpdate()  
        sum.render()    
        expect(sum.state.sum).toBe(1)   
      })   
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

