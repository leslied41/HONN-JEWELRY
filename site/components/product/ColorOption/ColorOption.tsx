import React, { FC } from 'react'
import { useProductContext } from '../productProvider'

const ColorOption = () => {
  const { setColor, state } = useProductContext()
  return (
    <div>
      <p>
        METAL | <span>{state.color}</span>
      </p>
      <div className="flex">
        <button
          className="w-6 h-6 rounded-xl  flex items-center justify-center mr-2 focus:border-2 focus:border-basic focus:bg-white"
          onClick={() => {
            setColor ? setColor('#f44336') : null
          }}
        >
          <div className="w-[16px] h-[16px] rounded-xl bg-red"></div>
        </button>
        <button
          className="w-6 h-6 rounded-xl  flex items-center justify-center mr-2 focus:border-2 focus:border-basic focus:bg-white"
          onClick={() => {
            setColor ? setColor('#e91e63') : null
          }}
        >
          <div className="w-[16px] h-[16px] rounded-xl bg-blue"></div>
        </button>
        <button className="w-6 h-6 rounded-xl  flex items-center justify-center mr-2 focus:border-2 focus:border-basic focus:bg-white">
          <div className="w-[16px] h-[16px] rounded-xl bg-pink"></div>
        </button>
      </div>
    </div>
  )
}
export default ColorOption
