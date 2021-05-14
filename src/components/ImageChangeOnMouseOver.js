import { useRef } from "react"

const ImageChangeOnMouseOver = () => {

  const imageRef = useRef(null)
  const publicUrl = process.env.PUBLIC_URL
  const [mainImg, overImg] = ["computer_bw.jpg", "computer.jpg"]

  return (    
      <img 
        alt="computer"
        src={publicUrl + "/" + mainImg} 
        onMouseOver={() => { imageRef.current.src = publicUrl + "/" + overImg }}
        onMouseOut={() => { imageRef.current.src = publicUrl + "/" + mainImg }}
        ref={imageRef}
       />
  )
}

export default ImageChangeOnMouseOver