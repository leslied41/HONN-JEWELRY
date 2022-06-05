import React, { FC } from 'react'

interface Props {
  setColor: (color: any) => void
  state: {
    shape: {
      value: string
      label: string
    }
    color: string
  }
}

const ColorOption: FC<Props> = ({ setColor, state }) => {
  return (
    <div>
      <p>
        METAL | <span>{state.color}</span>
      </p>
      <div className="flex">
        <button
          className="w-6 h-6 rounded-xl  flex items-center justify-center mr-2 focus:border-2 focus:border-basic focus:bg-white"
          onClick={() => {
            setColor('#f44336')
          }}
        >
          <div className="w-[16px] h-[16px] rounded-xl bg-red"></div>
        </button>
        <button
          className="w-6 h-6 rounded-xl  flex items-center justify-center mr-2 focus:border-2 focus:border-basic focus:bg-white"
          onClick={() => {
            setColor('#e91e63')
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
