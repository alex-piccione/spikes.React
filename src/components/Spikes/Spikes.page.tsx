import InputField from "../Fields/InputField"
import ImageChangeOnMouseOver from "./spike.ImageChangeOnMouseOver"
import UseEffect from "./spike.UseEffect"
import ImageToggleOnScroll from "./spike.ImageToggleOnScroll"
import { Container } from "./spike.child"
import {DatePicker} from "../../components/Fields/index"

const Spikes = () => <>     
  <h1>React Hooks spikes</h1>

  <InputField />
  <hr/>
  Image with "mouse over"/"mouse out" events
  <ImageChangeOnMouseOver />
  <hr/>
  <UseEffect />
  <hr/>
  <ImageToggleOnScroll />
  <hr />
  <Container />
  <hr />
  <DatePicker onChange={(d) => alert(d)} />
</>

export default Spikes