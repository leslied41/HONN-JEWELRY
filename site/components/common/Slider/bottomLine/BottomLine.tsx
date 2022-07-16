import React, { FC, useMemo } from 'react'
import cn from 'clsx'

interface Props {
  numberOfMoves: number
  index: number
}

const BottomLine: FC<Props> = ({ numberOfMoves, index }) => {
  const arraryOfLines = useMemo(
    () => Array(numberOfMoves).fill(''),
    [numberOfMoves]
  )

  return (
    <div
      className={cn(
        `grid grid-cols-${
          numberOfMoves + 1
        } mx-4 mt-10 h-[2px] bg-gold gap-x-5 `
      )}
    >
      {arraryOfLines.map((line, i) => {
        return (
          <div
            key={i}
            className={cn(
              'transition-all duration-75 ease-linear w-0 bg-brown col-span-1',
              {
                ['!w-full']: i === index,
              }
            )}
          ></div>
        )
      })}
    </div>
  )
}

export default BottomLine
