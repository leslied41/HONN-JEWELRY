import React from 'react'
import Image from 'next/image'
import s from './BandOption.module.css'
import { useProductContext } from '../productProvider'
import cn from 'clsx'
const BandOption = () => {
  const { setBand, band } = useProductContext()
  const aButtonClassName = cn(s.button, {
    [s.outterCircle]: band === 'a',
  })
  const bButtonClassName = cn(s.button, {
    [s.outterCircle]: band === 'b',
  })
  return (
    <div>
      <p>
        Band: <span>{band}</span>
      </p>
      <div className="flex gap-x-2">
        <button
          className={aButtonClassName}
          onClick={() => {
            setBand?.('a')
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
            setBand?.('b')
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
  )
}
export default BandOption
