import React from 'react'
import s from './Dropdown.module.css'
import { useProductContext } from '../productProvider'

const Dropdown = () => {
  const { setShape } = useProductContext()
  return (
    <div>
      <p>SHAPE</p>
      <select
        className={s.dropDown}
        onChange={(e) => {
          setShape ? setShape(e.target.value) : null
        }}
      >
        <option value="round">Round</option>
        <option value="square">Square</option>
      </select>
    </div>
  )
}

export default Dropdown
