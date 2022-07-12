import React, { FC, memo, useState, useEffect } from 'react'
import s from './Dropdown.module.css'
import { useProductContext } from '../productProvider'
import { dataA, dataB, titleA, titleB, selectorDataType } from './data'
import cn from 'clsx'

interface Props {
  variant: string
  className?: string
  setShape?: (shape: string) => void
  shape?: string
  setSize?: (size: string) => void
  size?: string
}

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
    let data: selectorDataType
    let func: any
    let selectorValue: string | undefined
    let title: string
    switch (variant) {
      case 'A':
        data = dataA
        func = setShape
        selectorValue = shape
        title = titleA
        break
      case 'B':
        data = dataB
        func = setSize
        selectorValue = size
        title = titleB
        break

      default:
        break
    }
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
        <p className="text-nav mb-2">{title!}</p>
        <div
          id="data-select-field"
          data-select-field
          className={s.dropDown}
          onClick={() => {
            setCollapsed(!collapsed)
          }}
        >
          <p>
            {selectorValue! ? selectorValue.toUpperCase() : 'Please Select'}
          </p>
          <img
            src="/dropdownArrow.svg"
            alt="arrow-icon"
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
            {data!.map((i) => {
              const { id, name, src } = i
              return (
                <li
                  key={id}
                  className={s.optionItem}
                  onClick={() => {
                    func?.(name)
                  }}
                >
                  {src && <img src={src} alt={name} className="w-6 " />}
                  <p>{name.toUpperCase()}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
)
DropdownOption.displayName = 'DropdownOption'
export default DropdownOption
