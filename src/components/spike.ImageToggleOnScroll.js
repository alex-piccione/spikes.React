import { useEffect, useRef, useState } from "react"
import { mainImage, bwImage } from "./spike.utils"

const ImageToggleOnScroll = () => {

  const imageRef = useRef()
  const [inView, setInView] = useState(false)

  // when component is mounted
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler)
    setInView(isInView())

    return( () => {
      window.removeEventListener("scroll", scrollHandler)
    })
  }, [] )  // dependencies

  const scrollHandler = () => {
    setInView(() => isInView())
  }

  const isInView = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect()
      return rect.top >= 0 && rect.bottom <= window.innerHeight
    }
    else return false
  }

  return (<img alt="computer" src={ inView ? mainImage : bwImage } ref={imageRef} />)

}

export default ImageToggleOnScroll