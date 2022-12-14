import React, { FC } from 'react'

interface Props {
  width?: number
  height?: number
  fill?: string
  className?: string
}
const Estimated: FC<Props> = ({ width, height, fill, className }) => {
  return (
    <svg
      className={className}
      width={width ? width : '16'}
      height={height ? height : '14'}
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.675 0.5V1.5H12.225V0.5H13.475V1.5H14.25C14.9404 1.5 15.5 2.05964 15.5 2.75V12.25C15.5 12.9404 14.9404 13.5 14.25 13.5H1.75C1.05964 13.5 0.5 12.9404 0.5 12.25V2.75C0.5 2.05964 1.05964 1.5 1.75 1.5H2.425V0.5H3.675ZM1.75 2.75H14.25V4H1.75V2.75ZM1.75 5.25L1.75 12.25H14.25V5.25H1.75Z"
        fill={fill ? fill : '#8D5535'}
      />
    </svg>
  )
}

export default Estimated
