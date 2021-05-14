import { useRef } from "react"
import { mainImage, bwImage } from "./spike.utils"

const ImageChangeOnMouseOver = () => {

  const imageRef = useRef(null)
  //const publicUrl = process.env.PUBLIC_URL
  //const [mainImg, overImg] = ["computer_bw.jpg", "computer.jpg"]

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