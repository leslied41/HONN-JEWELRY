import React, { FC } from 'react'

interface Props {
  width?: number
  height?: number
  stroke?: string
  className?: string
}
const Minus: FC<Props> = ({ width, height, stroke, className }) => {
  return (
    <svg
      className={className}
      width={width ? width : '9'}
      height={height ? height : '8'}
      viewBox="0 0 9 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.17383 4H1.17383"
        stroke={stroke ? stroke : '#F7F2EE'}
        strokeMiterlimit="10"
      />
    </svg>
  )
}

export default Minus
