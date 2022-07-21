import React, { FC } from 'react'

interface Props {
  width?: number
  height?: number
  stroke?: string
  className?: string
}
const ArrowRight: FC<Props> = ({ width, height, stroke, className }) => {
  return (
    <svg
      className={className}
      width={width ? width : '8'}
      height={height ? height : '14'}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 13L6.78739 7.21261V7.21261C6.90481 7.09519 6.90481 6.90481 6.78739 6.78739V6.78739L1 1"
        stroke={stroke ? stroke : '#F7F2EE'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowRight
