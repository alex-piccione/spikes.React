export function getDatePart(date:Date)  {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}

export function calculateDateFormat() {
  const d = new Date(2000, 11, 31).toLocaleDateString()
  try {  

    const format = d
      .replace("2000", "yyyy")
      .replace("12", "MM")
      .replace("31", "dd")

    return format
  }
  catch(error)
  {
    console.error(`Failed to calculate date format for date: ${d}`)
    return "dd/MM/yyyy"
  }
}
