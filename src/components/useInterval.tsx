import { useEffect, useRef } from "react";

export default function useInterval(action:() => void, delay:number|null ) {
  const newAction = useRef<() => void>()

  useEffect( () => {
    newAction.current = action
    }, [action])

  useEffect( () => {
    function tick() {
      newAction.current && newAction.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
  
}