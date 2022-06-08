import React, { FC, useState } from 'react'
import Image from 'next/image'
import s from './ImageGallery.module.css'
import cn from 'clsx'

interface Props {
  insData?: {
    media_url?: string
    id: string
    caption?: string
  }[]
  layout: 'A' | 'B' | 'C' | 'D'
  products?: any[]
  imageDivClassName?: string
  divClassName?: string
  variant?: string
}

const ImageGallery: FC<Props> = ({
  insData,
  layout,
  products,
  imageDivClassName,
  divClassName,
  variant,
}) => {
  const newInsData = insData?.slice(0, 5)
  const className = cn(
    {
      [s.layoutA]: layout == 'A',
      [s.layoutB]: layout == 'B',
    },
    divClassName
  )
  const [divIndex, setDvIndex] = useState('')
  const handleMouseOver = (e: React.MouseEvent) => {
    setDvIndex(e.currentTarget.id)
  }
  return (
    <>
      <div className={className}>
        {newInsData?.map((p) => {
          const { id, media_url, caption } = p
          return (
            <div key={id} className={imageDivClassName}>
              <Image
                src={media_url ? media_url : ''}
                alt={caption}
                layout="responsive"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </div>
          )
        })}
        {products?.map((p, index) => {
          const { id, images, name } = p
          return (
            <div
              key={id}
              id={index.toString()}
              className={imageDivClassName}
              onMouseOver={handleMouseOver}
            >
              <Image
                src={images[0].url}
                alt={name}
                layout="responsive"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </div>
          )
        })}
      </div>
      {variant === 'hover-bottom-line' && (
        <div className="grid grid-cols-3 mt-20 h-[2px] bg-gold">
          <div className={divIndex == '0' ? 'bg-brown' : ''}></div>
          <div className={divIndex == '1' ? 'bg-brown' : ''}></div>
          <div className={divIndex == '2' ? 'bg-brown' : ''}></div>
        </div>
      )}
    </>
  )
}
export default ImageGallery
