import { useEffect, useState } from "react"

const UseEffect = () => {

  const [checkboxValue, setCheckboxValue] = useState(false)
   
  useEffect(() => {
    console.log("useEffect")

    return () => { console.log("return function from useEffect") }
  }, [checkboxValue])

  return(<>
    <h2>UseEffect example</h2>
    <span onClick={() => setCheckboxValue(!checkboxValue)}>click here</span>: {checkboxValue? "True" : "False"}
  </>)
}

export default UseEffect