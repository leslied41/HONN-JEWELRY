import React, { useEffect, useRef } from 'react'

const useEffectSkipInitial = (func: () => void, deps: any) => {
  const didMount = useRef<boolean>(false)

  useEffect(() => {
    if (didMount.current) {
      func()
    } else {
      didMount.current = true
    }
  }, deps)
}

export default useEffectSkipInitial
