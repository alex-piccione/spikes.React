
const logDate = (date:Date|null) => console.log(date)

const dateField = () => <input type="date" onChange={ evt => logDate(evt.target.valueAsDate)} defaultValue={new Date().toISOString().substr(0, 10)} />

export default dateField