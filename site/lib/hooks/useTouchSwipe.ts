import React, { useEffect, useState, useRef } from 'react'

const useTouchSwipe = (element: any, numbers: number) => {
  const startingPosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  const moveDis = useRef({ x: 0, y: 0 })
  const [targetId, setTargetId] = useState(0)

  useEffect(() => {
    const touchStart = (e: any) => {
      startingPosition.current.x = e.touches[0].clientX
      startingPosition.current.y = e.touches[0].clientY
    }
    const touchmove = (e: any) => {
      currentPosition.current.x = e.changedTouches[0].clientX
      currentPosition.current.y = e.changedTouches[0].clientY
    }
    const touchend = () => {
      moveDis.current.x = currentPosition.current.x - startingPosition.current.x
      moveDis.current.y = currentPosition.current.y - startingPosition.current.y

      if (Math.abs(moveDis.current.x) < Math.abs(moveDis.current.y)) return
      if (moveDis.current.x > 50) {
        setTargetId((targetId) => {
          if (targetId === numbers) return 0
          return targetId + 1
        })
      }
      if (moveDis.current.x < -50) {
        setTargetId((targetId) => {
          if (targetId === 0) return numbers
          return targetId - 1
        })
      }
    }

    element?.addEventListener('touchstart', touchStart)
    element?.addEventListener('touchmove', touchmove)
    element?.addEventListener('touchend', touchend)
    return () => {
      element?.removeEventListener('touchstart', touchStart)
      element?.removeEventListener('touchmove', touchmove)
      element?.removeEventListener('touchend', touchend)
    }
  }, [element])

  return targetId
}

export default useTouchSwipe
