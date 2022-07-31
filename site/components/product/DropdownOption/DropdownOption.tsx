import React, { FC, memo, useState, useEffect, useMemo } from 'react'
import s from './Dropdown.module.css'
import { useProductContext } from '../productProvider'
import { dataA, dataB, titleA, titleB, selectorDataType } from './data'
import cn from 'clsx'
import DropdownArrow from '@components/icon/DropdownArrow'

interface Props {
  variant: string
  className?: string
  setShape?: (shape: string) => void
  shape?: string
  setSize?: (size: string) => void
  size?: string
}
type Obj =
  | {
      data: selectorDataType
      func: ((size: string) => void) | undefined
      selectorValue: string | undefined
      title: string
    }
  | undefined

const DropdownOption: FC<Props> = ({ variant, className }) => {
  const { setShape, shape, setSize, size } = useProductContext()

  return (
    <InnerDropdownOption
      shape={shape}
      size={size}
      setShape={setShape}
      setSize={setSize}
      variant={variant}
      className={className}
    />
  )
}

const InnerDropdownOption: FC<Props> = memo(
  ({ setShape, shape, setSize, size, variant, className }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const [imgSrc, setImgSrc] = useState('')

    const obj: Obj = useMemo(() => {
      if (variant === 'A')
        return {
          data: dataA,
          func: setShape,
          selectorValue: shape,
          title: titleA,
        }
      if (variant === 'B')
        return {
          data: dataB,
          func: setSize,
          selectorValue: size,
          title: titleB,
        }
    }, [variant, size, shape])

    useEffect(() => {
      const cancelDropDown = (e: MouseEvent) => {
        if ((e.target as HTMLElement)!.closest('#data-select-field')) return
        setCollapsed(false)
      }
      window.addEventListener('click', cancelDropDown)
      return () => {
        window.removeEventListener('click', cancelDropDown)
      }
    }, [])

    return (
      <div data-selector className={cn(className)}>
        <p className="text-nav mb-2">{obj?.title}</p>
        <div
          id="data-select-field"
          data-select-field
          className={s.dropDown}
          onClick={() => {
            setCollapsed(!collapsed)
          }}
        >
          {obj?.selectorValue ? (
            <div className="flex justify-center items-center gap-x-[7px]">
              {imgSrc && <img src={imgSrc} className="w-[21px] h-[25px]" />}
              <p className="text-[11px] leading-[13px]">
                {obj?.selectorValue.toUpperCase()}
              </p>
            </div>
          ) : (
            <p className="text-[11px] leading-[13px]">Please Select</p>
          )}

          <DropdownArrow
            className={cn('transition-all duration-75 ease-in-out', {
              ['rotate-180']: collapsed,
              ['rotate-0']: !collapsed,
            })}
          />
        </div>
        <div className="relative z-10 w-full">
          <ul
            data-option-group
            className={cn(
              s.optionsGroup,
              'transition-all origin-top  duration-50 ease-in-out',
              {
                ['scale-y-0 ']: !collapsed,
                ['scale-y-100']: collapsed,
              }
            )}
          >
            {obj?.data.map((i) => {
              const { id, name, src } = i
              return (
                <li
                  key={id}
                  className={s.optionItem}
                  onClick={() => {
                    obj.func?.(name)
                    if (src) setImgSrc(src)
                  }}
                >
                  {src && <img src={src} alt={name} className="w-6 " />}
                  <p className="flex justify-center items-center text-[11px] leading-[13px]">
                    {name.toUpperCase()}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
)
InnerDropdownOption.displayName = 'InnerDropdownOption'
DropdownOption.displayName = 'DropdownOption'
export default DropdownOption
