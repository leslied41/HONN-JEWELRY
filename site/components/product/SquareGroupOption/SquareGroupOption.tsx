import React, { FC, useEffect } from 'react'
import {
  dataA,
  dataB,
  dataC,
  dataD,
  dataE,
  titleA,
  titleB,
  titleC,
  titleD,
  titleE,
} from './data'
import { useProductContext } from '../productProvider'
import cn from 'clsx'
import s from './SquareGroupOption.module.css'

interface Props {
  variant: Variant
}
export enum Variant {
  A = 'CLARITY',
  B = 'COLORLEVEL',
  C = 'STONECUT',
  D = 'TEXTSYLE',
  E = 'EXPLORE',
}

export const SquareGroupOption: FC<Props> = ({ variant }) => {
  const {
    stoneColorLevel,
    stoneClarity,
    stoneCut,
    textStyle,
    setStoneColorLevel,
    setStoneClarity,
    setStoneCut,
    setTextStyle,
  } = useProductContext()

  let data: any
  let title: string | undefined
  let value: string | undefined
  let func: any
  switch (variant) {
    case Variant.A:
      data = dataA
      title = titleA
      value = stoneColorLevel
      func = setStoneColorLevel
      break
    case Variant.B:
      data = dataB
      title = titleB
      value = stoneClarity
      func = setStoneClarity
      break
    case Variant.C:
      data = dataC
      title = titleC
      value = stoneCut
      func = setStoneCut
      break
    case Variant.D:
      data = dataD
      title = titleD
      value = textStyle
      func = setTextStyle
      break
    case Variant.E:
      data = dataE
      title = titleE
      break
    default:
      break
  }

  return (
    <div>
      <p>{title}</p>
      <div className="flex flex-wrap">
        {data?.map((i: any) => {
          const { id, name } = i
          return (
            <button
              key={id}
              className={cn(s.button, { [s.focus]: name === value })}
              onClick={(e) => {
                e.preventDefault()
                func?.(name)
              }}
            >
              {name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
