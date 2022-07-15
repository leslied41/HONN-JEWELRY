import React, {
  FC,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  memo,
} from 'react'
React.useLayoutEffect = React.useEffect
import s from './Slider.module.css'
import type { Product } from '@commerce/types/product'
import cn from 'clsx'
import Image from 'next/image'
import { Buttons } from '@components/ui'
import Link from 'next/link'

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
  stripe?: boolean
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
  stripe,
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
  const viewportWidth = useRef<number>()
  console.log(products)

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
    viewportWidth.current = window.innerWidth
    return viewportWidth.current
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
      currentTranslate.current = currentIndex.current * -(w / 2 + 10)
      prevTranslate.current = currentTranslate.current
    }
    if (vw >= 768) {
      currentTranslate.current = currentIndex.current * -(w / 3 + 20 / 3)
      prevTranslate.current = currentTranslate.current
    }

    setSliderposition()
  }

  useLayoutEffect(() => {
    const w = getWidth(imagesDivRef)
    const vw = getViewportWidth()
    transitionOff()
    setInitialPositionByIndex(w!, vw!)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const w = getWidth(imagesDivRef)
      const vw = getViewportWidth()
      transitionOff()
      setInitialPositionByIndex(w!, vw!)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
    const vw = getViewportWidth()
    if (vw! >= 640) return
    return (e: React.TouchEvent) => {
      transitionOn()
      dragging.current = true
      startingPosition.current = e.touches[0].clientX
      currentIndex.current = i
      animationId.current = requestAnimationFrame(animation)
    }
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    const vw = getViewportWidth()
    if (vw! >= 640) return
    if (!dragging.current) return
    const currentPosition = e.touches[0].clientX
    currentTranslate.current =
      prevTranslate.current + currentPosition - startingPosition.current!
  }

  const handleTouchEnd = () => {
    const vw = getViewportWidth()
    if (vw! >= 640) return
    dragging.current = false
    cancelAnimationFrame(animationId.current!)
    const movedBy = currentTranslate.current - prevTranslate.current
    const maxNum =
      (product && product.images.length - 1) ||
      (products && products.length - 1) ||
      1
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

  const handleClick = () => {
    transitionOn()
    const maxNum =
      (product && product.images.length - 1) ||
      (products && products.length - 1) ||
      1
    if (currentIndex.current === maxNum) currentIndex.current = 0
    else currentIndex.current += 1
    const w = getWidth(imagesDivRef)
    const vw = getViewportWidth()
    setPositionByIndex(w!, vw!)
    setUpdateIndex(!updateIndex)
  }

  return (
    <div className={cn('relative', className)}>
      <div className={cn('overflow-hidden w-full')}>
        <div className="flex w-full sm:gap-x-5  h-fit" ref={imagesDivRef}>
          {product?.images.map((image, i) => (
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
          ))}
          {products?.map((p, i) => {
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
          })}
          {/* {stripe &&
          products?.map((p, i) => {
            const { images, name, price } = p

            return (
              <div
                key={images[0].url}
                className="w-full h-full flex-shrink-0 px-4 relative"
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
          })} */}
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
            className="absolute flex justify-center items-center h-16 w-16 bg-brown top-1/2  -right-4 sm:-right-10 -translate-y-1/2"
            onClick={handleClick}
          >
            <img src="/righticon.svg" alt="right icon" />
          </button>
        )}
        {bottomLine && (
          <div className="grid grid-cols-3 mx-4 mt-10 h-[2px] bg-gold gap-x-5 ">
            <div
              className={cn(
                'transition-all duration-75 ease-linear w-0 bg-brown',
                {
                  ['!w-full']: currentIndex.current === 0,
                }
              )}
            ></div>
            <div
              className={cn(
                'transition-all duration-75 ease-linear w-0 bg-brown',
                {
                  ['!w-full']: currentIndex.current === 1,
                }
              )}
            ></div>
            <div
              className={cn(
                'transition-all duration-75 ease-linear w-0 bg-brown',
                {
                  ['!w-full']: currentIndex.current === 2,
                }
              )}
            ></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(Slider)
