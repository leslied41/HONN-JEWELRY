import React, { memo } from 'react'
import s from './Dropdown.module.css'
import { useProductContext } from '../productProvider'

const DropdownOption = () => {
  const { setShape, shape } = useProductContext()
  return (
    <div>
      <p>SHAPE</p>
      <select
        value={shape}
        className={s.dropDown}
        onChange={(e) => {
          setShape?.(e.target.value)
        }}
      >
        <option value="">Please Select</option>
        <option value="round">Round</option>
        <option value="square">Square</option>
      </select>
    </div>
  )
}

export default memo(DropdownOption)
