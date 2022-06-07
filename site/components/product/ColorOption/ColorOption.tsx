import React, { FC } from 'react'
import { useProductContext } from '../productProvider'
import s from './ColorOption.module.css'
import cn from 'clsx'

const ColorOption = () => {
  const { setColor, state } = useProductContext()
  return (
    <div>
      <p>
        METAL | <span>{state.color}</span>
      </p>
      <div className="flex">
        <button
          className={s.button}
          onClick={() => {
            setColor ? setColor('#f44336') : null
          }}
        >
          <div className={cn(s.innerCircle, 'bg-red')}></div>
        </button>
        <button
          className={s.button}
          onClick={() => {
            setColor ? setColor('#e91e63') : null
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
