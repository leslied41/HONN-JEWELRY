import React, { FC, useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import s from './ImageGallery.module.css'
import cn from 'clsx'
import Link from 'next/link'

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
  link?: boolean
  intro?: boolean
}

const ImageGallery: FC<Props> = ({
  insData,
  layout,
  products,
  imageDivClassName,
  divClassName,
  link,
  intro,
}) => {
  const className = cn(
    {
      [s.layoutA]: layout == 'A',
      [s.layoutB]: layout == 'B',
      [s.layoutC]: layout == 'C',
    },
    divClassName
  )
  const [divIndex, setDvIndex] = useState<string>('')

  const filteredProducts = useMemo(
    () => products?.filter((p) => p.name !== 'CUSTOM'),
    [products]
  )

  return (
    <>
      <div className={className} id="image-gallery-div">
        {/* instagram */}
        {insData?.map((p) => {
          const { id, media_url, caption } = p
          return (
            <div key={id} className={imageDivClassName}>
              <img
                src={media_url ? media_url : ''}
                alt={caption}
                className="w-full h-full object-cover"
              />
            </div>
          )
        })}

        {filteredProducts?.map((p, index) => {
          const { id, images, name, price } = p
          return (
            <div
              key={id}
              className={imageDivClassName}
              // onMouseOver={handleMouseOver}
            >
              {link ? (
                <Link href={`/product/${p.slug}`}>
                  <a aria-label={p.name}>
                    <Image
                      src={images[0]?.url}
                      alt={name}
                      layout="responsive"
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                    {intro && (
                      <div className="text-body-2 text-brown md:hidden mt-2">
                        <h2>{name}</h2>
                        <p>
                          {price.currencyCode}
                          {price.value}
                        </p>
                      </div>
                    )}
                  </a>
                </Link>
              ) : (
                <Image
                  src={images[0]?.url}
                  alt={name}
                  layout="responsive"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
export default ImageGallery
