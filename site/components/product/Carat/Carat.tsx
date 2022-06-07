import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import cn from 'clsx'
import s from './Carat.module.css'
var throttle = require('lodash.throttle')

interface Props {}

const Carat = (props: Props) => {
  const [mouseDown, setMouseDown] = useState<boolean>(false)
  const roundRef = useRef<HTMLDivElement>(null)
  const [startPoint, setStartPoint] = useState({ x: 0 })
  const moveDistanceRef = useRef({ x: 0 })
  const lineRef = useRef<HTMLDivElement>(null)
  const [lineWidth, setLineWidth] = useState(0)
  const thinLineRef = useRef<HTMLDivElement>(null)
  const [startMoving, setStartMoving] = useState(false)
  const caratWeightRef = useRef(0.5)

  const calculateWeight = (dis: number) => {
    const weightScope = 3.9 - 0.5
    const chosenWeight = (weightScope / lineWidth) * dis
    const processedWeight = Math.round(chosenWeight * 10) / 10 + 0.5
    return processedWeight
  }

  const mouseDownards = (e: React.MouseEvent) => {
    const x = e.clientX
    setStartPoint({ x: x - moveDistanceRef.current.x })
    setMouseDown(true)
  }
  const mouseMove = (e: React.MouseEvent) => {
    const x = e.clientX
    if (!mouseDown) return
    setStartMoving(true)
    moveDistanceRef.current = {
      x: x - startPoint.x,
    }
    if (moveDistanceRef.current.x < -12) moveDistanceRef.current.x = -12
    if (moveDistanceRef.current.x > lineWidth - 12)
      moveDistanceRef.current.x = lineWidth - 12
    roundRef.current!.style.transform = `translate(${moveDistanceRef.current.x}px,-50%)`
    thinLineRef.current!.style.width = `${moveDistanceRef.current.x + 16}px`
    caratWeightRef.current = calculateWeight(moveDistanceRef.current.x + 12)
  }

  useEffect(() => {
    window.addEventListener(
      'mousemove',
      throttle((e: MouseEvent) => {
        if ((e.target as HTMLElement)!.closest('#line-round')) return
        setMouseDown(false)
      }, 100)
    )
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => {
      const width = lineRef.current!.offsetWidth
      setLineWidth((lineWidth) => (width ? width : lineWidth))
    })
    setLineWidth(lineRef.current!.offsetWidth)
  }, [])

  return (
    <div>
      <p>
        CARAT | <span>{caratWeightRef.current}ct</span>
      </p>
      <div className="h-[0.5px] bg-basic " ref={lineRef}>
        <div
          id="line-round"
          ref={roundRef}
          onMouseUp={() => {
            setMouseDown(false)
          }}
          onMouseMove={throttle(mouseMove, 20)}
          onMouseDown={mouseDownards}
          className={cn(
            '-translate-y-2/4 w-8   h-8 bg-transparent flex items-center justify-start',
            { 'justify-center': startMoving === true }
          )}
        >
          <div className="w-2  h-2 bg-white rounded border-[0.5px] border-basic cursor-grab"></div>
        </div>
      </div>
      <div className="bg-basic h-[2px] w-0" ref={thinLineRef}></div>
      <div className="flex justify-between">
        <p>0.5ct</p>
        <p>3.9ct</p>
      </div>
    </div>
  )
}
export default Carat
