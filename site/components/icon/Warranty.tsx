import React, { FC } from 'react'

interface Props {
  width?: number
  height?: number
  fill?: string
  className?: string
}
const Warranty: FC<Props> = ({ width, height, fill, className }) => {
  return (
    <svg
      className={className}
      width={width ? width : '14'}
      height={height ? height : '14'}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2598 9.70995L10.5798 6.99995L12.8398 4.73995C13.0723 4.50857 13.2568 4.23354 13.3827 3.93064C13.5086 3.62775 13.5734 3.30296 13.5734 2.97495C13.5734 2.64693 13.5086 2.32215 13.3827 2.01925C13.2568 1.71636 13.0723 1.44132 12.8398 1.20995C12.3712 0.742797 11.7365 0.480477 11.0748 0.480477C10.4131 0.480477 9.77843 0.742797 9.30981 1.20995L8.41981 2.08995L7.00981 3.49995L4.28981 0.749948C4.05446 0.520281 3.73865 0.391724 3.40981 0.391724C3.08097 0.391724 2.76516 0.520281 2.52981 0.749948L0.759813 2.51995C0.643404 2.63606 0.551047 2.774 0.488031 2.92586C0.425015 3.07773 0.392578 3.24053 0.392578 3.40495C0.392578 3.56937 0.425015 3.73217 0.488031 3.88403C0.551047 4.03589 0.643404 4.17383 0.759813 4.28995L3.50981 6.99995L3.28981 7.21995L2.39981 8.09995L0.649813 11.7599C0.536552 11.9937 0.4989 12.2568 0.542087 12.5129C0.585275 12.769 0.707157 13.0053 0.8908 13.189C1.07444 13.3726 1.31073 13.4945 1.56682 13.5377C1.82291 13.5809 2.0861 13.5432 2.31981 13.4299L5.93981 11.6799L6.81981 10.7999L7.00981 10.5699L9.68981 13.2499C9.92516 13.4796 10.241 13.6082 10.5698 13.6082C10.8987 13.6082 11.2145 13.4796 11.4498 13.2499L13.2198 11.4799C13.3389 11.3665 13.4344 11.2306 13.5009 11.0802C13.5673 10.9298 13.6035 10.7677 13.6072 10.6032C13.6109 10.4388 13.5821 10.2753 13.5225 10.122C13.4629 9.96869 13.3736 9.82867 13.2598 9.70995ZM11.0698 1.70995C11.4022 1.70887 11.7217 1.83812 11.9598 2.06995C12.0762 2.18606 12.1686 2.324 12.2316 2.47586C12.2946 2.62773 12.327 2.79053 12.327 2.95495C12.327 3.11937 12.2946 3.28217 12.2316 3.43403C12.1686 3.58589 12.0762 3.72383 11.9598 3.83995L10.1898 2.11995C10.4255 1.89053 10.7409 1.76148 11.0698 1.75995V1.70995ZM1.63981 3.39995L3.40981 1.63995L4.22981 2.45995L3.35981 3.33995L4.23981 4.21995L5.11981 3.33995L6.11981 4.33995L4.38981 6.14995L1.63981 3.39995ZM1.76981 12.3099L3.33981 9.07995L5.00981 10.7399L1.76981 12.3099ZM5.93981 9.90995L4.16981 8.13995L9.30981 2.99995L11.0698 4.75995L5.93981 9.90995ZM10.6098 12.3599L7.92981 9.68995L9.69981 7.91995L10.6298 8.84995L9.74981 9.72995L10.6298 10.6199L11.5198 9.72995L12.3798 10.5999L10.6098 12.3599Z"
        fill={fill ? fill : '#8D5535'}
      />
    </svg>
  )
}

export default Warranty