import React, { FC, useEffect, useState, createRef, useMemo } from 'react'
import cn from 'clsx'
import Image from 'next/image'
import s from './ProductPicsbar.module.css'
import { useScrollDirection } from 'react-use-scroll-direction'
import { useProductContext } from '../productProvider'

interface ProductPicsbarProps {
  className?: string
}

const ProductPicsbar: FC<ProductPicsbarProps> = ({ className }) => {
  const { product } = useProductContext()
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
  }, [])

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
    //at first render, there are on elRefs as elRefs are generated in another useEffect
    //at the same time in first render. when elrefs are created, setElrefs is called, so
    //the second render will be triggered. and at this second render, this useeffec will work
    //at second time due to the dependency elrefs changed from empty to normal. And after this time,
    //as elrefs will not change, so this useeffecet will not work any more. Until this componet is about to
    //disappear, the clean up function will be called, that is the observer.disconnect(). it will stop the observer.
    const observer = new IntersectionObserver(observeCallback, options)
    elRefs.forEach((ref, i) => {
      if (ref.current) observer.observe(ref.current)
      // return () => {
      //   if (ref.current) observer.unobserve(ref.current)
      // }
    })
    return () => {
      observer.disconnect()
    }
  }, [elRefs])

  return (
    <div className={cn(className, 'grid grid-cols-7 ')}>
      <div className="col-span-2 px-10 ">
        <div className="sticky top-[88px]">
          {product.images.map((image, i) => (
            <a href={`#${i}`} key={i}>
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
