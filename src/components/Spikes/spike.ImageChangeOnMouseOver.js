import { useRef } from "react"
import { mainImage, bwImage } from "./spike.utils"

const ImageChangeOnMouseOver = () => {

  const imageRef = useRef(null)

  return (    
      <img 
        alt="computer"
        src={bwImage} 
        onMouseOver={() => { imageRef.current.src = mainImage }}
        onMouseOut={() => { imageRef.current.src = bwImage }}
        ref={imageRef}
       />
  )
}

export default ImageChangeOnMouseOver