import React from 'react'
import Image from 'next/image'
import s from './BandOption.module.css'
import { useProductContext } from '../productProvider'

const BandOption = () => {
  const { setBand, band } = useProductContext()
  console.log(band)

  return (
    <div>
      <p>
        Band: <span>{band}</span>
      </p>
      <div className="flex gap-x-2">
        <button
          className={s.button}
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
          className={s.button}
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
