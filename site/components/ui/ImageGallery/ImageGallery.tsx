import React, { FC, useState, useEffect } from 'react'
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
}

const ImageGallery: FC<Props> = ({
  insData,
  layout,
  products,
  imageDivClassName,
  divClassName,
  link,
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

  // useEffect(() => {
  //   const mouseOver = (e: MouseEvent) => {
  //     if ((e.target as HTMLElement).closest('#image-gallery-div')) return
  //     setDvIndex('')
  //   }
  //   window.addEventListener('mouseover', mouseOver)
  //   return () => {
  //     window.removeEventListener('mouseover', mouseOver)
  //   }
  // }, [])
  // const handleMouseOver = (e: React.MouseEvent) => {
  //   setDvIndex(e.currentTarget.id)
  // }
  return (
    <>
      <div className={className} id="image-gallery-div">
        {/* instagram */}
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

        {products?.map((p, index) => {
          const { id, images, name } = p
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
    </>
  )
}
export default ImageGallery
