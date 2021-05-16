// spike for useReducer Hook

import { useReducer, useState } from "react"

interface Props {
  isEditing:boolean,
  onChange: (value:number|undefined) => void
}

const AmountField = (props:Props) => {
  //const [isEditing, setEditing] = useState(false)
  //const [amount, setAmount] = useState(0)

  function amountReducer(state:{}, action: {type:string, data: number}) {
    switch (action.type) {
      case "amount": {
        return action.data
      }
      default:
        return state
    }
  } 

  const [amount, setAmount] = useReducer(amountReducer, [])

  return props.isEditing ?
    (<div className="row">
      <div className="col-auto">      
        <input type="number" className="form-control form-control-sm" defaultValue="0" 
          onChange={evt => { props.onChange(evt.target.valueAsNumber); setAmount({type:"amount", data: evt.target.valueAsNumber}) /*setAmount(evt.target.valueAsNumber);*/ }} style={{ display: "inline"}} />
      </div>
      <div className="col-auto" style={{ display: "flex", fontSize: "75%"}}>{amount}</div>
      </div>) :
    <div>{amount}</div>  
}

export default AmountField