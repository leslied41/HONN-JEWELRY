import React, { FC, useMemo } from 'react'
import cn from 'clsx'

interface Props {
  numberOfLines: number
  passednumberOfImages: number
  index: number
}

const BottomLine: FC<Props> = ({
  numberOfLines,
  index,
  passednumberOfImages,
}) => {
  const arraryOfLines = useMemo(
    () => Array(numberOfLines).fill(''),
    [numberOfLines]
  )

  if (passednumberOfImages > 0)
    return (
      <div
        className={`grid  mt-10 h-[2px] bg-gold`}
        style={{
          gridTemplateColumns: `repeat(${numberOfLines}, minmax(0, 1fr))`,
        }}
      >
        {numberOfLines === 0 && (
          <div className={cn('bg-brown col-span-1')}></div>
        )}
        {numberOfLines !== 0 &&
          arraryOfLines!.map((line, i) => {
            return (
              <div
                key={i}
                className={cn(
                  'transition-all duration-75 ease-linear w-0 bg-brown col-span-1 h-full',
                  {
                    ['!w-full']: i === index,
                  }
                )}
              ></div>
            )
          })}
      </div>
    )
  return <></>
}

export default BottomLine
