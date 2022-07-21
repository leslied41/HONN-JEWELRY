import React, {
  FC,
  ButtonHTMLAttributes,
  forwardRef,
  useRef,
  JSXElementConstructor,
} from 'react'
import s from './Button.module.css'
import { LoadingDots } from '@components/ui'
import cn from 'clsx'
import mergeRefs from 'react-merge-refs'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: 'toRequest' | 'naked' | 'floating'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  loading?: boolean
  disabled?: boolean
  href?: string
  Component?: string | JSXElementConstructor<any>
  width?: number | string
}

const Button: FC<Props> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant,
    active,
    loading = false,
    disabled = false,
    children,
    type,
    width,
    Component = 'button',
    ...rest
    //in order to make onClick in here, all the props including onclick handler have to be passed here.
  } = props
  const ref = useRef<typeof Component>(null)

  const rootClassName = cn(
    s.root,
    {
      [s.toRequest]: variant === 'toRequest',
      [s.loading]: loading,
      [s.disabled]: disabled,
      [s.naked]: variant === 'naked',
      [s.floating]: variant === 'floating',
    },
    className
  )
  return (
    <Component
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      type={type}
      aria-pressed={active}
      data-variant={variant}
      disabled={disabled}
      style={{ width: `${width}` }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
    </Component>
  )
})

export default Button
