import React, { FC, useState, useEffect } from 'react'
import Image from 'next/image'
import s from './ImageGallery.module.css'
import cn from 'clsx'
import Link from 'next/link'
import ImageSlider from '../ImageSlider'

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
  hoverBottomLine?: boolean
  link?: boolean
  slider?: boolean
}

const ImageGallery: FC<Props> = ({
  insData,
  layout,
  products,
  imageDivClassName,
  divClassName,
  hoverBottomLine,
  link,
  slider,
}) => {
  const className = cn(
    {
      [s.layoutA]: layout == 'A',
      [s.layoutB]: layout == 'B',
      [s.marginX]: slider,
    },
    divClassName
  )
  const [divIndex, setDvIndex] = useState<string>('')

  useEffect(() => {
    const mouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('#image-gallery-div')) return
      setDvIndex('')
    }
    window.addEventListener('mouseover', mouseOver)
    return () => {
      window.removeEventListener('mouseover', mouseOver)
    }
  }, [])
  const handleMouseOver = (e: React.MouseEvent) => {
    setDvIndex(e.currentTarget.id)
  }
  return (
    <>
      <div className={className} id="image-gallery-div">
        {insData?.map((p) => {
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

        {slider && (
          <ImageSlider
            products={products}
            bottomLine={hoverBottomLine ? true : false}
            className="block sm:hidden"
          />
        )}

        {products?.map((p, index) => {
          const { id, images, name } = p
          return (
            <div
              key={id}
              id={index.toString()}
              className={imageDivClassName}
              onMouseOver={handleMouseOver}
            >
              {link ? (
                <Link href={`/product/${p.slug}`}>
                  <a aria-label={p.name}>
                    <Image
                      src={images[0].url}
                      alt={name}
                      layout="responsive"
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  </a>
                </Link>
              ) : (
                <Image
                  src={images[0].url}
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
      {hoverBottomLine && (
        <div className="hidden sm:grid grid-cols-3 mx-4 sm:mx-10 mt-[60px] h-[2px] bg-gold gap-x-5 ">
          <div className={divIndex == '0' ? 'bg-brown' : ''}></div>
          <div className={divIndex == '1' ? 'bg-brown' : ''}></div>
          <div className={divIndex == '2' ? 'bg-brown' : ''}></div>
        </div>
      )}
    </>
  )
}
export default ImageGallery
