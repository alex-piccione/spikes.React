import React, { useState } from "react"
import DatePicker, {registerLocale} from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import fns_locale from "date-fns/locale/en-GB"  // <-- this is OK

const userLocale = "en-GB"  // navigator.language
/*
if (!userLocale) throw ("navigator.language is not defined")
const fns_locale:Locale = require(`date-fns/locale/${userLocale}`)        // this does NOT work ! 
*/

registerLocale(userLocale, fns_locale)

interface Props {
  onChange: (date:Date|undefined) => void  
  class?: string
}


const MyDatePicker = (props:Props) => {
  const [date, setDate] = useState(new Date())
  const defaultClass = "form-control"
  
  function onChange (dates: Date|[Date,Date], evt:React.SyntheticEvent<any, Event>) {
    console.log(dates)    

    if (dates) {
      const date = dates as Date
      setDate(date)
      props.onChange(date)
    }
    else 
      throw new Error(`Selection must be a "Date", it is "${typeof date}" instead.`);    
  }

  return (<>      
    {/* P = date   PP = date & time */} 
    <DatePicker onChange={onChange} selected={date} locale={userLocale} dateFormat="P"  className={props.class||defaultClass}/> Locale: {userLocale}
    </>)
}

export default MyDatePicker