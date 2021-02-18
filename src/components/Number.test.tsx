import { Number } from "./AuthorQuiz"

describe("Number", () => {
  
  let number:Number
  let getColor = () => number.numberStyle().color

  beforeAll(() => {
    number = new Number({value:0})      
  })

  describe("when clicks", () => {

    describe("is zero", () => {      
      it("color is red", () => {
        number.state = {clicks:0}        
        expect(getColor()).toBe("red")
      })
    })

    describe("is one", () => {
      it("color is blu", () => {
        number.state = {clicks:1}
        expect(getColor()).toBe("blue")
      })
    })

  })

})