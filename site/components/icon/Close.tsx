import React, { FC } from 'react'

interface Props {
  width?: number
  height?: number
  stroke?: string
  className?: string
}
const Close: FC<Props> = ({ width, height, stroke, className }) => {
  return (
    <svg
      className={className}
      width={width ? width : '11'}
      height={height ? height : '11'}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L10.5 10.5"
        stroke={stroke ? stroke : '#F7F2EE'}
        strokeWidth="0.5"
      />
      <path
        d="M10.5 1L1 10.5"
        stroke={stroke ? stroke : '#F7F2EE'}
        strokeWidth="0.5"
      />
    </svg>
  )
}

export default Close
