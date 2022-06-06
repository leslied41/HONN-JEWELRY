import React, { FC, useEffect, useState, createRef, useMemo } from 'react'
import type { Product } from '@commerce/types/product'
import cn from 'clsx'
import Image from 'next/image'
import s from './ProductPicsbar.module.css'
import { useScrollDirection } from 'react-use-scroll-direction'

interface ProductPicsbarProps {
  product: Product
  className?: string
}

const ProductPicsbar: FC<ProductPicsbarProps> = ({ product, className }) => {
  const newImgArray = product.images.map((img, i) => false)
  const [isVisible, setIsVisible] = useState<boolean[]>(newImgArray)
  const { isScrollingUp } = useScrollDirection()

  const [elRefs, setElRefs] = useState<
    React.MutableRefObject<HTMLDivElement>[]
  >([])

  useEffect(() => {
    // add or remove refs
    setElRefs((elRefs) =>
      Array(product.images.length)
        .fill(null)
        .map((_, index) => elRefs[index] || createRef())
    )
  }, [product.images.length])

  const options = useMemo(() => {
    return { root: null, rooMargin: '0px', threshold: 0.6 }
  }, [])

  const observeCallback = (entries: any) => {
    entries.forEach((entry: any, i: number) => {
      if (entry.isIntersecting) {
        if (!isScrollingUp) {
          newImgArray[entry.target.id - 1] = false
          newImgArray[entry.target.id] = true
        }
        if (isScrollingUp) {
          newImgArray[entry.target.id] = true
          newImgArray[entry.target.id + 1] = false
        }

        setIsVisible([...newImgArray])
      } else {
        newImgArray[entry.target.id] = false
        setIsVisible([...newImgArray])
      }
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(observeCallback, options)
    elRefs.forEach((ref, i) => {
      if (ref.current) observer.observe(ref.current)
      return () => {
        if (ref.current) observer.unobserve(ref.current)
      }
    })
  }, [elRefs])

  return (
    <div className={cn(className, 'grid grid-cols-7 ')}>
      <div className="col-span-2 px-10 ">
        <div className="sticky top-[88px]">
          {product.images.map((image, i) => (
            <a href={`#${i}`}>
              <div
                key={image.url}
                className={cn('mb-2 w-24 h-24 relative', {
                  [s.thumbnail_border]: isVisible[i] === true,
                })}
              >
                {/* <img src={image.url!} alt={image.alt || 'Product Image'} /> */}
                <Image
                  src={image.url!}
                  alt={image.alt || 'Product Image'}
                  layout="fill"
                  priority={true}
                  quality="55"
                  objectFit="cover"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="col-span-5">
        {product.images.map((image, i) => (
          <div
            key={image.url}
            className="pb-5"
            id={i.toString()}
            ref={elRefs[i]}
          >
            <Image
              src={image.url!}
              alt={image.alt || 'Product Image'}
              layout="responsive"
              width="100%"
              height="100%"
              priority={i === 0}
              quality="85"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default ProductPicsbar
