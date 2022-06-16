import React, { FC, memo, useState, useEffect } from 'react'
import s from './Dropdown.module.css'
import { useProductContext } from '../productProvider'
import { dataA, dataB, titleA, titleB, selectorDataType } from './data'
import cn from 'clsx'

interface Props {
  variant: string
}

const DropdownOption: FC<Props> = ({ variant }) => {
  const { setShape, shape, setSize, size } = useProductContext()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  let data: selectorDataType
  let func: any
  let selectorValue: string
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
    <div data-selector className="w-full">
      <p>{title!}</p>
      <div
        id="data-select-field"
        data-select-field
        className={s.dropDown}
        onClick={() => {
          setCollapsed(!collapsed)
        }}
      >
        <p>{selectorValue! ? selectorValue.toUpperCase() : 'Please Select'}</p>
        <img
          src="/dropdownArrow.svg"
          alt="arrow-icon"
          className={cn({
            ['rotate-180']: collapsed,
            ['rotate-0']: !collapsed,
          })}
        />
      </div>
      <div className="relative z-10 w-full">
        <ul
          data-option-group
          className={cn(s.optionsGroup, {
            ['h-0']: !collapsed,
            ['h-fit']: collapsed,
          })}
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
                {src && <img src={src} alt={name} className="w-6" />}
                <p>{name.toUpperCase()}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default memo(DropdownOption)
