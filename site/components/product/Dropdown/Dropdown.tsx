import React, { FC } from 'react'
import s from './Dropdown.module.css'

interface Props {
  setShape: (shape: string) => void
}

const Dropdown: FC<Props> = ({ setShape }) => {
  return (
    <div>
      <p>SHAPE</p>
      <select
        className={s.dropDown}
        onChange={(e) => {
          setShape(e.target.value)
        }}
      >
        <option value="round">Round</option>
        <option value="square">Square</option>
      </select>
    </div>
  )
}

export default Dropdown
