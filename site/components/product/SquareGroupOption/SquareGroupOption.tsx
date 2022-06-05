import React, { useState } from 'react'

interface Props {}

const testData = [
  { id: 1, name: 'D' },
  { id: 2, name: 'E' },
  { id: 3, name: 'F' },
  { id: 4, name: 'G' },
  { id: 5, name: 'LESLIE' },
  { id: 6, name: 'LOVE' },
  { id: 7, name: 'GOD' },
  { id: 8, name: 'EVER' },
]

const SquareGroupOption = (props: Props) => {
  const [value, setValue] = useState<string>('')
  return (
    <div>
      <p>Main stone clarity</p>
      <div className="flex flex-wrap">
        {testData.map((i) => {
          const { id, name } = i
          return (
            <button
              key={id}
              className="px-4 py-2 border-[0.5px] border-gold mr-2 mb-2 focus:border-b-4 focus:border-brown"
              onClick={(e) => {
                e.preventDefault()
                setValue(name)
              }}
            >
              {name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
export default SquareGroupOption
