import React, { FC, useMemo } from 'react'
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
  layout?: 'A' | 'default'
  className?: string
  stoneColorLevel?: string
  stoneClarity?: string
  stoneCut?: string
  textStyle?: string
  setStoneColorLevel?: (stoneColorLevel: string) => void
  setStoneClarity?: (stoneClarity: string) => void
  setStoneCut?: (stoneCut: string) => void
  setTextStyle?: (textStyle: string) => void
}
export enum Variant {
  A = 'CLARITY',
  B = 'COLORLEVEL',
  C = 'STONECUT',
  D = 'TEXTSYLE',
  E = 'EXPLORE',
}
export const SquareGroupOption: FC<Props> = ({
  variant,
  layout = 'A',
  className,
}) => {
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

  return (
    <InnerSquareGroupOption
      stoneColorLevel={stoneColorLevel}
      stoneClarity={stoneClarity}
      stoneCut={stoneCut}
      textStyle={textStyle}
      setStoneColorLevel={setStoneColorLevel}
      setStoneClarity={setStoneClarity}
      setStoneCut={setStoneCut}
      setTextStyle={setTextStyle}
      variant={variant}
      className={className}
      layout={layout}
    />
  )
}

const InnerSquareGroupOption: FC<Props> = React.memo(
  ({
    stoneColorLevel,
    stoneClarity,
    stoneCut,
    textStyle,
    setStoneColorLevel,
    setStoneClarity,
    setStoneCut,
    setTextStyle,
    variant,
    layout,
    className,
  }) => {
    const obj = useMemo(() => {
      if (variant === Variant.A)
        return {
          data: dataA,
          title: titleA,
          value: stoneColorLevel,
          func: setStoneColorLevel,
        }

      if (variant === Variant.B)
        return {
          data: dataB,
          title: titleB,
          value: stoneClarity,
          func: setStoneClarity,
        }
      if (variant === Variant.C)
        return {
          data: dataC,
          title: titleC,
          value: stoneCut,
          func: setStoneCut,
        }
      if (variant === Variant.D)
        return {
          data: dataD,
          title: titleD,
          value: textStyle,
          func: setTextStyle,
        }
      if (variant === Variant.E)
        return {
          data: dataE,
          title: titleE,
        }
    }, [variant, textStyle, stoneCut, stoneClarity, stoneColorLevel])
    return (
      <div
        className={cn(className, 'grid', {
          ['grid-cols-4 gap-x-4']: layout === 'default',
          ['grid-cols-1']: layout === 'A',
        })}
      >
        <div className="col-span-1 mb-2">
          <p className="text-nav uppercase">{obj?.title}</p>
        </div>
        <div
          className={cn(' flex flex-wrap', {
            ['col-span-3 ']: layout === 'default',
            ['col-span-1 ']: layout === 'A',
          })}
        >
          {obj?.data?.map((i) => {
            const { id, name } = i
            return (
              <button
                key={id}
                className={cn(s.button, { [s.focus]: name === obj.value })}
                onClick={(e) => {
                  e.preventDefault()
                  obj.func?.(name)
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
)
SquareGroupOption.displayName = 'SquareGroupOption'
InnerSquareGroupOption.displayName = 'InnerSquareGroupOption'
