import React, { FC } from 'react'

interface Props {
  width?: number
  height?: number
  stroke?: string
  className?: string
}

const ArrowDown: FC<Props> = ({ width, height, stroke, className }) => {
  return (
    <svg
      className={className}
      width={width ? width : '15'}
      height={height ? height : '8'}
      viewBox="0 0 15 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 0.5L7.5 7.5L14 0.5"
        stroke={stroke ? stroke : '#8D5535'}
        strokeWidth="0.5"
      />
    </svg>
  )
}
export default ArrowDown
