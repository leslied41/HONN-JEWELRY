import React, { FC } from 'react'
import { useProductContext } from '../productProvider'
import { titleA, titleB, dataA, dataB, colorDataType } from './data'
import s from './ColorOption.module.css'
import cn from 'clsx'

interface Props {
  variant: 'A' | 'B'
}
const ColorOption: FC<Props> = ({ variant }) => {
  const {
    setMetalColor,
    metalColor,
    littleDiamondColor,
    setLittleDiamondColor,
  } = useProductContext()
  let data: colorDataType
  let func: any
  let colorValue: string
  let title: string
  switch (variant) {
    case 'A':
      data = dataA
      func = setMetalColor
      colorValue = metalColor
      title = titleA
      break
    case 'B':
      data = dataB
      func = setLittleDiamondColor
      colorValue = littleDiamondColor
      title = titleB
      break

    default:
      break
  }
  return (
    <div>
      <div>
        <p>
          {title!} | <span>{colorValue!}</span>
        </p>
      </div>

      <div className="flex">
        {data!.map((i) => {
          const { name, value, id } = i
          return (
            <button
              key={id}
              className={cn(s.button, {
                ['border-2 border-basic bg-white']: value === colorValue,
              })}
              onClick={() => {
                func?.(value)
              }}
            >
              <div className={cn(s.innerCircle, name)}></div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
export default ColorOption
