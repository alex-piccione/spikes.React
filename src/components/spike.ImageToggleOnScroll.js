import { useEffect, useRef, useState } from "react"
import { mainImage, bwImage } from "./spike.utils"

const ImageToggleOnScroll = () => {

  const imageRef = useRef()
  const [inView, setInView] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // when component is mounted
  // called after the page is rendered
  useEffect(() => {

    const scrollHandler = () => {

      const isInView = () => {
        if (imageRef.current) {
          const rect = imageRef.current.getBoundingClientRect()
          return rect.top >= 0 && rect.bottom <= window.innerHeight
        }
        else return false
      }

      setInView(() => isInView())
    }

    window.addEventListener("scroll", scrollHandler)
    //setInView(isInView())
    setIsLoading(false)
    return( () => {
      window.removeEventListener("scroll", scrollHandler)
    })
  }, [isLoading] )  // dependencies

  return (isLoading ? null : (<img alt="computer" src={ inView ? mainImage : bwImage } ref={imageRef} />))
}

export default ImageToggleOnScroll