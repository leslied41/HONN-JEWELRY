import React, {
  FC,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  useMemo,
  memo,
} from 'react'
React.useLayoutEffect = React.useEffect
import s from './Slider.module.css'
import type { Product } from '@commerce/types/product'
import cn from 'clsx'
import Image from 'next/image'
import { Buttons } from '@components/ui'
import Link from 'next/link'
import BottomLine from './bottomLine'
import ArrowRight from '@components/icon/ArrowRight'
import rangeMap from '@lib/range-map'
import { Skeleton } from '@components/ui'
var debounce = require('lodash.debounce')

interface Props {
  product?: Product
  products?: Product[]
  className?: string
  transition?: number
  mark?: 'text' | 'circles'
  addToOrder?: boolean
  controlBtn?: boolean
  bottomLine?: boolean
  productInfo?: boolean
  variant: 'product' | 'products'
}

const Slider: FC<Props> = ({
  products,
  product,
  className,
  transition = 0.3,
  addToOrder,
  mark,
  controlBtn,
  bottomLine,
  productInfo,
  variant,
}) => {
  const imagesDivRef = useRef<HTMLDivElement | null>(null)
  const startingPosition = useRef<number>()
  const currentIndex = useRef(0)
  const currentTranslate = useRef(0)
  const prevTranslate = useRef(0)
  const animationId = useRef<number>()
  const dragging = useRef(false)
  const [updateIndex, setUpdateIndex] = useState(false)
  const width = useRef<number>()
  const [vw, setVw] = useState<number>()
  const vwRef = useRef<number>()
  const [breakPointChanging, setBreakPointChanging] = useState<string>('')

  const numberOfImages = useMemo(
    () => product?.images.length || products?.length || 1,
    [products, product]
  )

  const transitionOn = () => {
    if (!imagesDivRef.current || !imagesDivRef) return
    imagesDivRef.current.style.transition = `transform ${transition}s ease-out`
  }

  const transitionOff = () => {
    if (!imagesDivRef.current || !imagesDivRef) return
    imagesDivRef.current.style.transition = 'none'
  }

  const getWidth = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
    if (!ref || !ref.current) return
    width.current = ref.current.clientWidth
    return width.current
  }

  const getViewportWidth = () => {
    if (typeof window === 'undefined') return
    setVw(window.innerWidth)
  }
  const getVwRefWidth = () => {
    if (!vwRef) return
    if (typeof window === 'undefined') return
    vwRef.current = window.innerWidth
    return vwRef.current
  }

  const setInitialPositionByIndex = (w: number, vw: number) => {
    if (!w || !vw) return
    if (vw < 640) {
      currentTranslate.current = currentIndex.current * -w
      prevTranslate.current = currentTranslate.current
    }
    if (vw >= 640 && vw < 768) {
      currentTranslate.current = (currentIndex.current * -w) / 2
      prevTranslate.current = currentTranslate.current
    }
    if (vw >= 768) {
      currentTranslate.current = (currentIndex.current * -w) / 3
      prevTranslate.current = currentTranslate.current
    }

    setSliderposition()
  }
  const setPositionByIndex = (w: number, vw: number) => {
    if (!w || !vw) return
    if (vw < 640) {
      currentTranslate.current = currentIndex.current * -w
      prevTranslate.current = currentTranslate.current
    }
    if (vw >= 640 && vw < 768) {
      // currentTranslate.current = currentIndex.current * -(w / 2 + 10)
      // prevTranslate.current = currentTranslate.current
      //the above two lines code is to move image one by one.
      currentTranslate.current = currentIndex.current * -(w + 20)
      prevTranslate.current = currentTranslate.current
    }
    if (vw >= 768) {
      currentTranslate.current = currentIndex.current * -(w + 20)
      prevTranslate.current = currentTranslate.current
      // currentTranslate.current = currentIndex.current * -(w / 3 + 20 / 3)
      // prevTranslate.current = currentTranslate.current
      //the above two lines code is to move image one by one.
    }

    setSliderposition()
  }
  const checkBreakPointsChanging = useCallback((w: number | undefined) => {
    if (!w) return
    if (w >= 768) {
      setBreakPointChanging('md')
    }
    if (w < 768 && w >= 640) {
      setBreakPointChanging('sm')
    }
    if (w < 640) {
      setBreakPointChanging('mobile')
    }
  }, [])

  useLayoutEffect(() => {
    const w = getWidth(imagesDivRef)
    getViewportWidth()
    const vwRefWidth = getVwRefWidth()
    transitionOff()
    setInitialPositionByIndex(w!, vwRefWidth!)
    checkBreakPointsChanging(vwRefWidth)
  }, [])
  useEffect(() => {
    const handleResize = () => {
      const w = getWidth(imagesDivRef)
      getViewportWidth()
      const vwRefWidth = getVwRefWidth()
      transitionOff()
      setInitialPositionByIndex(w!, vwRefWidth!)
      checkBreakPointsChanging(vwRefWidth)
    }
    const debounceFn = debounce(handleResize, 200)
    window.addEventListener('resize', debounceFn)
    return () => {
      window.removeEventListener('resize', debounceFn)
    }
  }, [])

  useEffect(() => {
    //when resize, currentindex will be 0
    currentIndex.current = 0
  }, [breakPointChanging])

  const setSliderposition = () => {
    if (!imagesDivRef.current || !imagesDivRef) return
    imagesDivRef.current.style.transform = `translateX(${currentTranslate.current}px)`
  }

  const animation = useCallback(() => {
    setSliderposition()
    if (!dragging.current) return
    requestAnimationFrame(animation)
  }, [])

  const handleTouchStart = (i: number) => {
    if (vw! >= 640) return
    return (e: React.TouchEvent) => {
      transitionOn()
      dragging.current = true
      startingPosition.current = e.touches[0].clientX
      // currentIndex.current = i
      animationId.current = requestAnimationFrame(animation)
    }
  }

  const maxNum = useMemo(() => {
    let number_max = 0
    if (vw! < 640) {
      number_max =
        (product && product.images.length - 1) ||
        (products && products.length - 1) ||
        0
    }
    if (vw! >= 640 && vw! < 768) {
      number_max =
        (product && Math.ceil(product.images.length / 2) - 1) ||
        (products && Math.ceil(products.length / 2) - 1) ||
        0
    }
    if (vw! >= 768) {
      number_max =
        (product && Math.ceil(product.images.length / 3) - 1) ||
        (products && Math.ceil(products.length / 3) - 1) ||
        0
    }
    if (number_max < 0) number_max = 0
    return number_max
  }, [vw, product, products])

  const numberOfLines = useMemo(() => maxNum! + 1, [maxNum])
  const passednumberOfImages = useMemo(
    () => product?.images.length || products?.length || 0,
    [products, product]
  )

  const handleTouchMove = (e: React.TouchEvent) => {
    if (vw! >= 640) return
    if (!dragging.current) return
    const currentPosition = e.touches[0].clientX
    currentTranslate.current =
      prevTranslate.current + currentPosition - startingPosition.current!
  }

  const handleTouchEnd = () => {
    if (vw! >= 640) return
    dragging.current = false
    cancelAnimationFrame(animationId.current!)
    const movedBy = currentTranslate.current - prevTranslate.current

    if (movedBy < -100 && currentIndex.current !== maxNum) {
      currentIndex.current += 1
    }
    if (movedBy > 100 && currentIndex.current > 0) {
      currentIndex.current -= 1
    }
    const w = getWidth(imagesDivRef)

    setPositionByIndex(w!, vw!)
    setUpdateIndex(!updateIndex)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (maxNum === 0) return
    e.stopPropagation()
    transitionOn()
    if (currentIndex.current === maxNum) currentIndex.current = 0
    else currentIndex.current += 1
    const w = getWidth(imagesDivRef)
    setPositionByIndex(w!, vw!)
    setUpdateIndex(!updateIndex)
  }

  return (
    <div className={cn('relative', className)}>
      <div className={cn('overflow-hidden w-full')}>
        <div className="flex w-full sm:gap-x-5  h-fit" ref={imagesDivRef}>
          {variant === 'product' &&
            (product ? (
              product.images.map((image, i) => (
                <div
                  key={image.url}
                  className="w-full h-full flex-shrink-0"
                  onTouchStart={handleTouchStart(i)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <Image
                    src={image.url!}
                    alt={image.alt || 'Product Image'}
                    layout="responsive"
                    width="100%"
                    height="100%"
                    priority={i === 0}
                    quality="65"
                    objectFit="cover"
                  />
                </div>
              ))
            ) : (
              <Skeleton className="w-full h-full flex-shrink-0" height={250} />
            ))}
          {variant === 'products' &&
            (products
              ? products.map((p, i) => {
                  const { images, name, price } = p
                  return (
                    <div
                      key={i}
                      className={cn(
                        'w-full sm:w-[calc((100%-20px)/2)] md:w-[calc((100%-40px)/3)] h-full flex-shrink-0 relative'
                      )}
                      onTouchStart={handleTouchStart(i)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      <Link href={`/product/${p.slug}`}>
                        <a aria-label={name}>
                          <Image
                            src={images[0].url}
                            alt={images[0].alt || 'Product Image'}
                            layout="responsive"
                            width="100%"
                            height="100%"
                            priority={i === 0}
                            quality="65"
                            objectFit="cover"
                          />
                        </a>
                      </Link>
                      {productInfo && (
                        <div className="flex flex-col justify-center items-center absolute bottom-14 left-1/2 -translate-x-1/2">
                          <p className="text-body-2 text-brown">{name}</p>
                          <p className="mt-4 text-body-2 text-brown">
                            {price.currencyCode} <span>{price.value}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })
              : rangeMap(3, (i) => (
                  <Skeleton
                    key={i}
                    className={cn(
                      'w-full sm:w-[calc((100%-20px)/2)] md:w-[calc((100%-40px)/3)] h-full flex-shrink-0'
                    )}
                    height={250}
                  />
                )))}
        </div>
        {mark === 'text' && (
          <p className="absolute bottom-4 left-4 text-subtitle text-darkGray sm:hidden">
            {currentIndex.current + 1}/{product!.images.length}
          </p>
        )}
        {addToOrder && (
          <Buttons className="absolute top-2 left-2 " variant="floating">
            made to order
          </Buttons>
        )}
        {controlBtn && (
          <button
            className={cn(
              'absolute flex justify-center items-center h-16 w-16 bg-brown top-1/2  -right-4 sm:-right-10 -translate-y-1/2',
              {
                ['md:hidden']: numberOfImages <= 3,
                ['sm:hidden']: numberOfImages <= 2,
                ['hidden']: numberOfImages <= 1,
              }
            )}
            onClick={handleClick}
          >
            <ArrowRight />
          </button>
        )}
        {bottomLine && (
          <BottomLine
            numberOfLines={numberOfLines!}
            passednumberOfImages={passednumberOfImages}
            index={currentIndex.current}
          />
        )}
      </div>
    </div>
  )
}

export default memo(Slider)
