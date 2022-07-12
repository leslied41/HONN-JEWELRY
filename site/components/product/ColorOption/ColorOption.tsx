import React, { FC, memo } from 'react'
import { useProductContext } from '../productProvider'
import { titleA, titleB, dataA, dataB, colorDataType } from './data'
import s from './ColorOption.module.css'
import cn from 'clsx'

interface Props {
  variant: 'A' | 'B'
  className?: string
  setMetalColor?: (metalColor: string) => void
  metalColor?: string
  littleDiamondColor?: string
  setLittleDiamondColor?: (littleDiamondColor: string) => void
}
const ColorOption: FC<Props> = ({ variant, className }) => {
  const {
    setMetalColor,
    metalColor,
    littleDiamondColor,
    setLittleDiamondColor,
  } = useProductContext()
  return (
    <InnerColoroption
      variant={variant}
      className={className}
      metalColor={metalColor}
      littleDiamondColor={littleDiamondColor}
      setLittleDiamondColor={setLittleDiamondColor}
      setMetalColor={setMetalColor}
    />
  )
}

const InnerColoroption: FC<Props> = memo(
  ({
    variant,
    className,
    metalColor,
    setMetalColor,
    littleDiamondColor,
    setLittleDiamondColor,
  }) => {
    let data: colorDataType
    let func: any
    let colorValue: string | undefined
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
      <div className={className}>
        <div className="mb-2">
          <p className="uppercase text-nav">
            {title!} | <span className="text-brown">{colorValue!}</span>
          </p>
        </div>

        <div className="flex">
          {data!.map((i) => {
            const { name, value, id } = i
            return (
              <button
                key={id}
                className={cn(s.button, {
                  ['border-2 border-darkGray bg-white']: value === colorValue,
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
)
ColorOption.displayName = 'ColorOption'
export default ColorOption
