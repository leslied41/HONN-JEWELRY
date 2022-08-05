import React, { FC, useEffect, useState, createRef, useMemo, memo } from 'react'
import cn from 'clsx'
import Image from 'next/image'
import s from './ProductPicsbar.module.css'
import type { Product } from '@commerce/types/product'
import { Buttons } from '@components/ui'
import { Slider } from '@components/common'
import LayeredImages from '../LayeredImages'
import { useRouter } from 'next/router'

interface ProductPicsbarProps {
  className?: string
  product: Product
}

const ProductPicsbar: FC<ProductPicsbarProps> = ({ className, product }) => {
  const router = useRouter()
  const newImgArray = useMemo(
    () => product.images.map((img, i) => false),
    [product.images]
  )
  const [isVisible, setIsVisible] = useState<boolean[]>(newImgArray)
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
    } else if (tag.length === 1) {
      targetNum = tag[0]
    } else {
      targetNum = tag[tag.length - 2]
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
      Array(product.images.length + 1)
        .fill(null)
        .map((_, index) => elRefs[index] || createRef())
    )
  }, [product.images.length])

  const options = useMemo(() => {
    return { root: null, rooMargin: '0px', threshold: 0.5 }
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
    })
    return () => {
      observer.disconnect()
    }
  }, [elRefs])

  return (
    <div className={cn(className, 'grid grid-cols-7 ')}>
      <div className="hidden md:block col-span-2">
        <div className="sticky top-[96px]">
          <LayeredImages
            embeded="thumbnail"
            className={cn('mb-2 sm:mb-2 w-24 h-24 relative ', {
              [s.thumbnail_border]: isVisible[0] === true,
            })}
          />
          {product.images.map((image, i) => (
            <a href={`#${i + 1}`} key={i + 1}>
              <div
                key={image.url}
                className={cn('mb-2 w-24 h-24 relative', {
                  [s.thumbnail_border]: isVisible[i + 1] === true,
                })}
              >
                <Image
                  src={image?.url!}
                  alt={image?.alt || 'Product Image'}
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
      {router.query.slug !== 'CUSTOM' && (
        <Slider
          variant="product"
          product={product}
          addToOrder
          mark="text"
          className="sm:hidden col-span-7 w-full"
        />
      )}
      {router.query.slug === 'CUSTOM' && (
        <LayeredImages className="sm:hidden relative col-span-7 w-full" />
      )}
      <div className="hidden sm:block col-span-7  md:col-span-5 h-fit relative">
        <div ref={elRefs[0]} id={'0'} className="sm:mb-5">
          <LayeredImages />
        </div>

        {product.images.map((image, i) => (
          <div
            key={image.url}
            className={cn('sm:pb-5')}
            id={(i + 1).toString()}
            ref={elRefs[i + 1]}
          >
            <Image
              src={image?.url!}
              alt={image?.alt || 'Product Image'}
              layout="responsive"
              width="100%"
              height="100%"
              priority={i === 0}
              quality="85"
              objectFit="cover"
            />
          </div>
        ))}
        <Buttons className="absolute top-2 left-2 z-20" variant="floating">
          made to order
        </Buttons>
      </div>
    </div>
  )
}

export default memo(ProductPicsbar)
