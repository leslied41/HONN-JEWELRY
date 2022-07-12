import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  memo,
} from 'react'
import cn from 'clsx'
import s from './Carat.module.css'
import { useProductContext } from '../productProvider'
var throttle = require('lodash.throttle')

import Slider from '@mui/material/Slider'

const canUseDOM = typeof window !== 'undefined'
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect

interface Props {
  className?: string
  setWeight?: (weight: string) => void
  weight?: string
}

const Carat: FC<Props> = ({ className }) => {
  const { setWeight, weight } = useProductContext()
  return (
    <InnerCarat setWeight={setWeight} weight={weight} className={className} />
  )
}

const InnerCarat: FC<Props> = memo(({ setWeight, weight, className }) => {
  const convertCarat = (value: string) => {
    const carat = (Number(value) / 100) * (3.9 - 0.5)
    return (Math.floor((carat + 0.5) * 10) / 10).toString()
  }
  const handleChange = (e: { target: { value: string } }) => {
    const convertedCarat = convertCarat(e.target.value)
    setWeight?.(convertedCarat)
  }
  return (
    <div className={className}>
      <p className="uppercase text-nav">
        <span>CARAT | </span>
        <span className="text-brown">
          {weight} {weight && 'ct'}
        </span>
      </p>
      <Slider
        aria-label="Default"
        className={s.slider}
        defaultValue={0}
        onChange={throttle(handleChange, 100)}
        sx={{
          width: '100%',
          padding: '0',
          color: '#8D5535',
          height: '1px',
          '& .MuiSlider-thumb': {
            '&:hover,&.Mui-focusVisible': {
              boxShadow: 'unset',
            },
            height: '8px',
            width: '8px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: 'solid 0.1px black',
          },
        }}
      />

      <div className="w-full flex justify-between text-nav">
        <p className="text-darkGray opacity-50">0.5ct</p>
        <p className="text-darkGray opacity-50">3.9ct</p>
      </div>
    </div>
  )
})
Carat.displayName = 'Carat slider'

export default Carat
