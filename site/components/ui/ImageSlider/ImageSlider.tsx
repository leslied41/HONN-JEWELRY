import React, { FC, useState } from 'react'
import Image from 'next/image'
import cn from 'clsx'
import s from './ImageSlider.module.css'
import Link from 'next/link'
interface Props {
  products?: any[]
  className?: string
  bottomLine?: boolean
}

const ImageSlider: FC<Props> = ({ products, className, bottomLine }) => {
  console.log(products)
  const [targetIndex, setTargetIndex] = useState<number>(0)
  const handleClick = () => {
    if (targetIndex === 2) return setTargetIndex(0)
    setTargetIndex((index) => index + 1)
  }
  return (
    <div className={cn(className, 'relative')}>
      {products?.map((p, index) => {
        const { images, name } = p

        return (
          <div
            key={index}
            className={cn('hidden relative mx-4', {
              [s.block]: index === targetIndex,
            })}
          >
            <Link href={`/product/${p.slug}`}>
              <a aria-label={p.name}>
                <Image
                  id={index.toString()}
                  src={images[0].url}
                  alt={name}
                  layout="responsive"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </a>
            </Link>
          </div>
        )
      })}
      <button
        onClick={handleClick}
        className="absolute flex justify-center items-center h-16 w-16 bg-brown top-1/2 right-0 -translate-y-1/2"
      >
        <img src="/righticon.svg" alt="right icon" />
      </button>
      {bottomLine && (
        <div className="grid grid-cols-3 mx-4 mt-10 h-[2px] bg-gold gap-x-5 ">
          <div className={targetIndex === 0 ? 'bg-brown' : ''}></div>
          <div className={targetIndex === 1 ? 'bg-brown' : ''}></div>
          <div className={targetIndex === 2 ? 'bg-brown' : ''}></div>
        </div>
      )}
    </div>
  )
}
export default ImageSlider
