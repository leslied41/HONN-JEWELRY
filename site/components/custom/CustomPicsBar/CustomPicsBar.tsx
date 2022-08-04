import React, { FC } from 'react'
import cn from 'clsx'
import Buttons from '@components/ui/Buttons'
import { useProductContext } from '../../product/productProvider'

interface Props {
  className?: string
}

const CustomPicsBar: FC<Props> = ({ className }) => {
  const {
    metalColor,
    shape,
    band,
    mosaic,
    stoneColorLevel,
    stoneClarity,
    stoneCut,
    textStyle,
    littleDiamondColor,
    size,
    weight,
    engraved,
  } = useProductContext()
  return (
    <div className={cn(className, 'grid grid-cols-7 ')}>
      <div className="hidden md:block col-span-2">
        <div className="sticky top-[96px]">
          <a>
            <div className={cn('mb-2 w-24 h-24 relative')}></div>
          </a>
        </div>
      </div>

      <div className="hidden sm:block col-span-7  md:col-span-5 h-fit relative">
        <div
          className={cn('sm:mb-5')}
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
              backgroundColor:
                metalColor === '#f44336' ? 'transparent' : '#fff',
              mixBlendMode: 'color',
            }}
          ></div>
          {/* 
      {metalColor}
      {mosaic}
      {engraved} */}
        </div>

        <Buttons className="absolute top-2 left-2" variant="floating">
          made to order
        </Buttons>
      </div>
    </div>
  )
}
export default CustomPicsBar
