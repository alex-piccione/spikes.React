// useState is a default Hook in React
import React, { useState } from "react"

const InputField = () => {
  
  // use destructuring to get the text value andf the funtion to update it  
  // also, set the initial value to ""
  // using multiple "useState" calls is recommended over less calls with complex object
  const [text, setText] = useState("")
  const [historyList, setHistoryList] = useState(Array.of<string>())

  return (<>
    <input
      placeholder="Enter some text" 
      onChange={(ev =>{
         setText(ev.target.value) 
         setHistoryList([...historyList, ev.target.value])
        })}
    />
    <div>{text}</div>
    <ul>
      {historyList.map(v => 
          <div>{v}</div>        
      )}
    </ul>
   </>)
}

export default InputField