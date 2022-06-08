import React, { FC } from 'react'
import { useProductContext } from '../productProvider'
import s from './ColorOption.module.css'
import cn from 'clsx'

const ColorOption = () => {
  const { setColor, color } = useProductContext()
  return (
    <div>
      <p>
        METAL | <span>{color}</span>
      </p>
      <div className="flex">
        <button
          className={s.button}
          onClick={() => {
            setColor?.('#f44336')
          }}
        >
          <div className={cn(s.innerCircle, 'bg-red')}></div>
        </button>
        <button
          className={s.button}
          onClick={() => {
            setColor?.('#e91e63')
          }}
        >
          <div className={cn(s.innerCircle, 'bg-blue')}></div>
        </button>
        <button className={s.button}>
          <div className={cn(s.innerCircle, 'bg-pink')}></div>
        </button>
      </div>
    </div>
  )
}
export default ColorOption
