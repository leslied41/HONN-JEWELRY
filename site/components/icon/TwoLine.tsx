import React, { FC } from 'react'

interface Props {
  width?: number
  height?: number
  stroke?: string
  className?: string
}
const TwoLine: FC<Props> = ({ width, height, stroke, className }) => {
  return (
    <svg
      className={className}
      width={width ? width : '24'}
      height={height ? height : '24'}
      viewBox="0 0 24 24"
      fill={'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 10H19"
        stroke={stroke ? stroke : '#8D5535'}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 14H19"
        stroke={stroke ? stroke : '#8D5535'}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default TwoLine