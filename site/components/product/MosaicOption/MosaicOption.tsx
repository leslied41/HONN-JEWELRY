import React from 'react'
import Image from 'next/image'
import { useProductContext } from '../productProvider'
import cn from 'clsx'
import s from './Mosaic.module.css'

interface Props {}

const MosaicOption = (props: Props) => {
  const { setMosaic, mosaic } = useProductContext()
  const aButtonClassName = cn(s.button, {
    [s.outterCircle]: mosaic === 'c',
  })
  const bButtonClassName = cn(s.button, {
    [s.outterCircle]: mosaic === 'd',
  })

  return (
    <div>
      <div>
        <p>
          Setting: <span>{mosaic}</span>
        </p>
        <div className="flex gap-x-2">
          <button
            className={aButtonClassName}
            onClick={() => {
              setMosaic?.('c')
            }}
          >
            <div className={s.innerCircle}>
              <Image
                src="/landing_bg2.jpg"
                layout="responsive"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </div>
          </button>
          <button
            className={bButtonClassName}
            onClick={() => {
              setMosaic?.('d')
            }}
          >
            <div className={s.innerCircle}>
              <Image
                src="/landing_bg2.jpg"
                layout="responsive"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
export default MosaicOption
