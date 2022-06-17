import React, { FC } from 'react'
import Image from 'next/image'
import cn from 'clsx'
import s from './CirclePicOption.module.css'
import { useProductContext } from '../productProvider'
import { dataA, dataB, dataType, titleA, titleB } from './data'

interface Props {
  variant: 'A' | 'B'
  className?: string
}

export const CirclePicOption: FC<Props> = ({ variant, className }) => {
  const { setBand, band, setMosaic, mosaic } = useProductContext()
  let data: dataType
  let func: any
  let value: string
  let title: string
  switch (variant) {
    case 'A':
      data = dataA
      func = setMosaic
      value = mosaic
      title = titleA
      break
    case 'B':
      data = dataB
      func = setBand
      value = band
      title = titleB
      break

    default:
      break
  }

  return (
    <div className={className}>
      <div>
        <p>
          {title!} <span>{value!}</span>
        </p>
      </div>
      <div className="flex gap-x-2">
        {data?.map((i) => {
          const { name, src, id } = i
          return (
            <button
              key={id}
              className={cn(s.button, {
                [s.outterCircle]: value === name,
              })}
              onClick={() => {
                func?.(name)
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
