import InputField from "../Fields/InputField"
import ImageChangeOnMouseOver from "./spike.ImageChangeOnMouseOver"
import UseEffect from "./spike.UseEffect"
import ImageToggleOnScroll from "./spike.ImageToggleOnScroll"
import { Container } from "./spike_child"

const Spikes = () => <>     
  <h1>React Hooks spikes</h1>

  <InputField />
  <hr/>
  <ImageChangeOnMouseOver></ImageChangeOnMouseOver>
  <hr/>
  <UseEffect />
  <hr/>
  <ImageToggleOnScroll />
  <hr />
  <Container />

</>

export default Spikes