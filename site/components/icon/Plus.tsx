import React, { FC } from 'react'

interface Props {
  width?: number
  height?: number
  stroke?: string
  className?: string
}
const Plus: FC<Props> = ({ width, height, stroke, className }) => {
  return (
    <svg
      className={className}
      width={width ? width : '9'}
      height={height ? height : '8'}
      viewBox="0 0 9 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2283_995)">
        <path
          d="M4.14893 1V7"
          stroke={stroke ? stroke : '#F7F2EE'}
          strokeMiterlimit="10"
        />
        <path
          d="M7.17383 3.97498H1.17383"
          stroke={stroke ? stroke : '#F7F2EE'}
          strokeMiterlimit="10"
        />
      </g>
      <defs>
        <clipPath id="clip0_2283_995">
          <rect
            width="6.95"
            height="6.95"
            fill="white"
            transform="translate(0.673828 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Plus
