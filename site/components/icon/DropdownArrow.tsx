import React, { FC } from 'react'

interface Props {
  width?: number
  height?: number
  fill?: string
  className?: string
}
const DropdownArrow: FC<Props> = ({ width, height, fill, className }) => {
  return (
    <svg
      className={className}
      width={width ? width : '10'}
      height={height ? height : '6'}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 5.5L0 0.5H10L5 5.5Z"
        fill={fill ? fill : '#393939'}
        fillOpacity="0.59"
      />
    </svg>
  )
}

export default DropdownArrow
