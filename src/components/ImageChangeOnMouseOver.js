import React, { useRef } from "react"

const ImageChangeOnMouseOver = () => {

  const imageRef = useRef(null)

  return (
    <div>
      <img 
        alt="computer"
        src="/%PUBLIC_URL%/computer.jpg"
        onMouseOver={() => { imageRef.current.src = "/%PUBLIC_URL%/computer.jpg" }}
        onMouseOut={() => { imageRef.current.src = "/%PUBLIC_URL%/computer_bw.jpg" }}
        ref={imageRef}
       />
      <ImageToggleOnMouseOver 
        primaryImg={process.env.PUBLIC_URL + "/computer.jpg"} 
        overImg={process.env.PUBLIC_URL + "/computer_bw.jpg"} 
         alt="" />
      &nbsp;&nbsp;&nbsp;
      <ImageToggleOnMouseOver primaryImg="/%PUBLIC_URL%/computer.jpg" overImg="/%PUBLIC_URL%/computer_bw.jpg" alt="computer" />
    </div>
  )
}

export default ImageChangeOnMouseOver


const ImageToggleOnMouseOver = ({primaryImg, overImg}) => {

  //const imageRef = useRef(null)

  return (
    <img src={primaryImg} alt="" />
  )

}