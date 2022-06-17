import React, { FC, ButtonHTMLAttributes, forwardRef, useRef } from 'react'
import s from './Button.module.css'
import { LoadingDots } from '@components/ui'
import cn from 'clsx'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: 'toRequest'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  loading?: boolean
  disabled?: boolean
}

const Button: FC<Props> = ({
  className,
  variant,
  active,
  loading = false,
  disabled = false,
  children,
  type,
  ...props
  //in order to make onClick in here, all the props including onclick handler have to be passed here.
}) => {
  const rootClassName = cn(
    s.root,
    {
      [s.toRequest]: variant === 'toRequest',
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className
  )
  return (
    <button
      className={rootClassName}
      type={type}
      aria-pressed={active}
      data-variant={variant}
      disabled={disabled}
      {...props}
    >
      {children}
      {loading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
    </button>
  )
}

export default Button
