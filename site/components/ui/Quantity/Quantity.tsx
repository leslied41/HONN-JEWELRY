import React, { FC } from 'react'
import s from './Quantity.module.css'
import Minus from '@components/icon/Minus'
import Plus from '@components/icon/Plus'
import { useRouter } from 'next/router'

import cn from 'clsx'
export interface QuantityProps {
  value: number
  increase: () => any
  decrease: () => any
  handleRemove: React.MouseEventHandler<HTMLButtonElement>
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  max?: number
  svgColor?: string
}

const Quantity: FC<QuantityProps> = ({
  value,
  increase,
  decrease,
  handleChange,
  handleRemove,
  max = 6,
  svgColor,
}) => {
  const handleDecrease = () => {
    if (value === 1) return handleRemove
    return decrease
  }
  return (
    <div className="flex flex-row items-center gap-x-[17px]">
      {/* <button className={s.actions} onClick={handleRemove}>
        <Cross width={20} height={20} />
      </button> */}
      <p>Quantity</p>
      <div className="flex justify-start items-center gap-x-[5px]">
        <button
          type="button"
          onClick={handleDecrease()}
          className={s.actions}
          disabled={value <= 0}
        >
          <Minus width={6} height={18} stroke={svgColor} />
        </button>
        <label>
          <input
            className={s.input}
            onChange={(e) =>
              Number(e.target.value) < max + 1 ? handleChange(e) : () => {}
            }
            value={value}
            type="number"
            max={max}
            min="0"
            // readOnly
          />
        </label>
        <button
          type="button"
          onClick={increase}
          className={cn(s.actions)}
          disabled={value < 1 || value >= max}
        >
          <Plus width={8} height={8} stroke={svgColor} />
        </button>
      </div>
    </div>
  )
}

export default Quantity
