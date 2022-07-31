import React, { FC, useMemo } from 'react'
import Image from 'next/image'
import cn from 'clsx'
import s from './CirclePicOption.module.css'
import { useProductContext } from '../productProvider'
import { dataA, dataB, dataType, titleA, titleB } from './data'

interface Props {
  variant: 'A' | 'B'
  className?: string
}
type Obj =
  | {
      data: dataType
      func: ((mosaic: string) => void) | undefined
      value: string
      title: string
    }
  | undefined

export const CirclePicOption: FC<Props> = ({ variant, className }) => {
  const { setBand, band, setMosaic, mosaic } = useProductContext()

  const obj: Obj = useMemo(() => {
    if (variant === 'A')
      return {
        data: dataA,
        func: setMosaic,
        value: mosaic,
        title: titleA,
      }
    if (variant === 'B')
      return {
        data: dataB,
        func: setBand,
        value: band,
        title: titleB,
      }
  }, [variant, band, mosaic])

  return (
    <div className={className}>
      <div className="mb-2">
        <p className="uppercase text-nav">
          {obj?.title} <span className="text-brown">{obj?.value}</span>
        </p>
      </div>
      <div className="flex gap-x-2">
        {obj?.data?.map((i) => {
          const { name, src, id } = i
          return (
            <button
              key={id}
              className={cn(s.button, {
                [s.outterCircle]: obj?.value === name,
              })}
              onClick={() => {
                obj?.func?.(name)
              }}
            >
              <div className={s.innerCircle}>
                <Image
                  src={src}
                  layout="responsive"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

CirclePicOption.displayName = 'CirclePicOption'
