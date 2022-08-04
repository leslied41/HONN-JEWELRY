import React, {
  FC,
  useEffect,
  useState,
  createRef,
  useRef,
  useMemo,
} from 'react'
import cn from 'clsx'
import Image from 'next/image'
import s from './ProductPicsbar.module.css'
import type { Product } from '@commerce/types/product'
import { Buttons } from '@components/ui'
import { Slider } from '@components/common'
import { useProductContext } from '../productProvider'

interface ProductPicsbarProps {
  className?: string
  product: Product
}

const ProductPicsbar: FC<ProductPicsbarProps> = ({ className, product }) => {
  const newImgArray = product.images.map((img, i) => false)
  const [isVisible, setIsVisible] = useState<boolean[]>(newImgArray)
  const [elRefs, setElRefs] = useState<
    React.MutableRefObject<HTMLDivElement>[]
  >([])

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
      Array(product.images.length)
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
          {product.images.map((image, i) => (
            <a href={`#${i}`} key={i}>
              <div
                key={image.url}
                className={cn('mb-2 w-24 h-24 relative', {
                  [s.thumbnail_border]: isVisible[i] === true,
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
      <Slider
        variant="product"
        product={product}
        addToOrder
        mark="text"
        className="sm:hidden col-span-7 w-full"
      />
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

        {product.images.map((image, i) => (
          <div
            key={image.url}
            className={cn('sm:pb-5')}
            id={i.toString()}
            ref={elRefs[i]}
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
        <Buttons className="absolute top-2 left-2" variant="floating">
          made to order
        </Buttons>
      </div>
    </div>
  )
}
export default ProductPicsbar
