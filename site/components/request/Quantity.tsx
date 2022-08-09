import React, { FC } from 'react'
import s from './Quantity.module.css'
import Minus from '@components/icon/Minus'
import Plus from '@components/icon/Plus'
import cn from 'clsx'
export interface QuantityProps {
  value: number
  handleRemove: React.MouseEventHandler<HTMLButtonElement>
  handleIncrease: React.MouseEventHandler<HTMLButtonElement>
  handleDecrease: React.MouseEventHandler<HTMLButtonElement>
  max?: number
  svgColor?: string
}

const Quantity: FC<QuantityProps> = ({
  value,
  handleRemove,
  handleIncrease,
  handleDecrease,
  max = 6,
  svgColor,
}) => {
  const decrease = () => {
    if (value === 1) return handleRemove
    return handleDecrease
  }
  return (
    <div className="flex flex-row items-center gap-x-[17px]">
      <p>Quantity</p>
      <div className="flex justify-start items-center gap-x-[5px]">
        <button
          type="button"
          onClick={decrease()}
          className={s.actions}
          disabled={value <= 0}
        >
          <Minus width={6} height={18} stroke={svgColor} />
        </button>
        <p>{value}</p>

        <button
          type="button"
          onClick={handleIncrease}
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
