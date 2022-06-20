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

  const arrayFilter = (array: boolean[]) => {
    let tag: number[] = []
    let targetNum: number
    array.forEach((item, index) => {
      if (item === true) {
        tag.push(index)
      }
    })
    if (tag.length === 0) return array

    if (tag.includes(0)) {
      targetNum = 0
    } else {
      targetNum = tag[tag.length - 1]
    }
    const filteredArray = array.map((item, index) => {
      if (index === targetNum) {
        item = true
      } else {
        item = false
      }
      return item
    })

    return filteredArray
  }

  useEffect(() => {
    // add or remove refs
    setElRefs((elRefs) =>
      Array(product.images.length)
        .fill(null)
        .map((_, index) => elRefs[index] || createRef())
    )
  }, [])

  const options = useMemo(() => {
    return { root: null, rooMargin: '8px', threshold: 1 }
  }, [])

  const observeCallback = (entries: any) => {
    entries.forEach((entry: any, i: number) => {
      if (entry.isIntersecting) {
        newImgArray[entry.target.id] = true
        const filteredImgArray = arrayFilter(newImgArray)
        setIsVisible([...filteredImgArray])
      } else {
        newImgArray[entry.target.id] = false
        const filteredImgArray = arrayFilter(newImgArray)
        setIsVisible([...filteredImgArray])
      }
    })
  }

  useEffect(() => {
    //at first render, there were no elRefs as elRefs are generated in another useEffect
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
