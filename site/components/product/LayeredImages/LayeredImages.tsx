import React, { FC, useMemo } from 'react'
import { useProductContext } from '../productProvider'
import cn from 'clsx'

interface Props {
  className?: string
}

const LayeredImages: FC<Props> = ({ className }) => {
  const { metalColor, shape, band, mosaic } = useProductContext()

  return useMemo(() => {
    return (
      <div
        className={cn('sm:mb-5', className)}
        style={{
          backgroundColor: '#fff',
        }}
      >
        {band === 'a' ? (
          <img
            src="/band_a.png"
            alt="square diamond"
            className="w-full absolute pt-0"
          />
        ) : (
          <img
            src="/band_b0.png"
            alt="round diamond"
            className="w-full absolute pt-0"
          />
        )}
        {shape === 'square' ? (
          <img
            src="/shape_square.png"
            alt="square diamond"
            className="w-full absolute pt-0"
          />
        ) : (
          <img
            src="/shape_round.png"
            alt="round diamond"
            className="w-full absolute pt-0"
          />
        )}
        {band === 'b' && (
          <img
            src="/band_b1.png"
            alt="square diamond"
            className="w-full absolute pt-0"
          />
        )}

        <div
          style={{
            paddingTop: '100%',
            backgroundColor: metalColor === '#f44336' ? 'transparent' : '#fff',
            mixBlendMode: 'color',
          }}
        ></div>
      </div>
    )
  }, [metalColor, shape, band, mosaic])
}
export default LayeredImages
