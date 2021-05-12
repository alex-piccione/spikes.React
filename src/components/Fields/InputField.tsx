// useState is a default Hook in React
import React, { useState } from "react"

const InputField = () => {
  
  // use destructuring to get the text value andf the funtion to update it  
  // also, set the initial value to ""
  const [text, setText] = useState("")

  return (<>
    <input
      placeholder="Enter some text" 
      onChange={(ev => setText(ev.target.value))}
    />
    <div>{text}</div>
   </>)
}

export default InputField