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
  const thickLineRef = useRef<HTMLDivElement>(null)
  const [startMoving, setStartMoving] = useState(false)
  const [update, setUpdate] = useState(false)
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
    if (moveDistanceRef.current.x < -8) moveDistanceRef.current.x = -8
    if (moveDistanceRef.current.x > lineWidth - 8)
      moveDistanceRef.current.x = lineWidth - 8
    roundRef.current!.style.transform = `translate(${moveDistanceRef.current.x}px,-50%)`
    thickLineRef.current!.style.width = `${moveDistanceRef.current.x + 16}px`
    caratWeightRef.current = calculateWeight(moveDistanceRef.current.x + 8)
  }

  const handleJump = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement)!.closest('#line-round')) return
    const x = e.clientX
    const leftEnd = lineRef.current!.getBoundingClientRect().x
    moveDistanceRef.current = {
      x: x - leftEnd,
    }
    roundRef.current!.style.transform = `translate(${moveDistanceRef.current.x}px,-50%)`
    thickLineRef.current!.style.width = `${moveDistanceRef.current.x + 16}px`
    caratWeightRef.current = calculateWeight(moveDistanceRef.current.x + 8)
    setUpdate(!update)
  }

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if ((e.target as HTMLElement)!.closest('#line-round')) return
      setMouseDown(false)
    }
    window.addEventListener('mousemove', throttle(handleMove, 500))
    return () => {
      window.removeEventListener('mousemove', throttle(handleMove, 500))
    }
  }, [])

  useEffect(() => {
    const getWidth = () => {
      const width = lineRef.current!.offsetWidth
      setLineWidth((lineWidth) => (width ? width : lineWidth))
    }
    window.addEventListener('resize', getWidth)
    setLineWidth(lineRef.current!.offsetWidth)
    return () => {
      window.removeEventListener('resize', getWidth)
    }
  }, [])

  return (
    <div>
      <p>
        CARAT | <span>{caratWeightRef.current}ct</span>
      </p>
      <div
        className="h-[1px] bg-basic cursor-pointer"
        ref={lineRef}
        onClick={handleJump}
      >
        <div
          id="line-round"
          ref={roundRef}
          onMouseUp={() => {
            setMouseDown(false)
          }}
          onMouseMove={throttle(mouseMove, 20)}
          onMouseDown={mouseDownards}
          className="-translate-y-2/4 w-4  h-4 bg-white rounded border-[0.5px] border-basic cursor-pointer"
        ></div>
      </div>
      <div className="bg-basic h-[1px] w-0" ref={thickLineRef}></div>

      <div className="flex justify-between">
        <p>0.5ct</p>
        <p>3.9ct</p>
      </div>
    </div>
  )
}
export default Carat
