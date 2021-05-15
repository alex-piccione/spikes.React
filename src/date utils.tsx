//import { useContext } from "react"
//import { ConfigContext } from "."

//const config = useContext(ConfigContext)

export function getDatePart(date:Date)  {
  //alert(date.toISOString())
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  //alert(date.toISOString())
  return date
}
