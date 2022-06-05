import React, { useState, useRef, useEffect } from 'react'
var throttle = require('lodash.throttle')

interface Props {}

const Carat = (props: Props) => {
  const [mouseDown, setMouseDown] = useState<boolean>(false)
  const roundRef = useRef<HTMLDivElement>(null)
  const [startPoint, setStartPoint] = useState({ x: 0 })
  const moveDistanceRef = useRef({ x: 0 })
  const lineRef = useRef<HTMLDivElement>(null)
  const [lineWidth, setLineWidth] = useState(0)

  const mouseDownards = (e: React.MouseEvent) => {
    const x = e.clientX
    setStartPoint({ x: x - moveDistanceRef.current.x })
    setMouseDown(true)
  }
  const mouseMove = (e: React.MouseEvent) => {
    const x = e.clientX
    if (!mouseDown) return
    moveDistanceRef.current = {
      x: x - startPoint.x,
    }
    if (moveDistanceRef.current.x < -24) moveDistanceRef.current.x = -24
    if (moveDistanceRef.current.x > lineWidth - 24)
      moveDistanceRef.current.x = lineWidth - 24
    roundRef.current!.style.transform = `translate(${moveDistanceRef.current.x}px,-50%)`
    console.log(moveDistanceRef.current) //sothis movedistance will be the value determining the carat and passed to shopify.
    //next, I need to use some mathematics to calculate the real carat. (movedistance/width of line) * total weight=real carat.
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      const width = lineRef.current!.offsetWidth
      setLineWidth(width)
    })
    setLineWidth(lineRef.current!.offsetWidth)
    window.addEventListener(
      'mousemove',
      throttle((e: MouseEvent) => {
        if ((e.target as HTMLElement)!.closest('#line-round')) return
        setMouseDown(false)
      }, 100)
    )
  }, [])

  return (
    <div>
      <p>CARAT</p>
      <div className="h-[0.5px] bg-basic " ref={lineRef}>
        <div
          id="line-round"
          ref={roundRef}
          onMouseUp={() => {
            setMouseDown(false)
          }}
          onMouseMove={throttle(mouseMove, 50)}
          onMouseDown={mouseDownards}
          className="-translate-y-2/4 w-14   h-8 bg-transparent flex items-center justify-center"
        >
          <div className="w-2  h-2 bg-white rounded border-[0.5px] border-basic"></div>
        </div>
      </div>
    </div>
  )
}
export default Carat
