import React, { FC, useMemo } from 'react'
import { useProductContext } from '../productProvider'
import Buttons from 'components/ui/Buttons'

interface Props {
  className?: string
  embeded?: string
}

const LayeredImages: FC<Props> = ({ className, embeded }) => {
  const { metalColor, shape, band, mosaic } = useProductContext()

  return useMemo(() => {
    return (
      <div
        className={className}
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
        {embeded !== 'thumbnail' && (
          <Buttons
            className="sm:hidden absolute top-2 left-2 z-[99]"
            variant="floating"
          >
            made to order
          </Buttons>
        )}
      </div>
    )
  }, [metalColor, shape, band, mosaic, className])
}
export default LayeredImages
