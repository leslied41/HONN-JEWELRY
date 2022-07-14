import React, {
  FC,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  memo,
} from 'react'
import s from './Slider.module.css'
import type { Product } from '@commerce/types/product'
import cn from 'clsx'
import Image from 'next/image'
import { Buttons } from '@components/ui'

interface Props {
  product?: Product
  className?: string
  transition?: number
  variant?: string
}

const Slider: FC<Props> = ({
  product,
  className,
  transition = 0.3,
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
  const [width, setWidth] = useState<number>()

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
    const width = ref.current.clientWidth
    return width
  }

  const setPositionByIndex = (w: number) => {
    if (!w) return
    currentTranslate.current = currentIndex.current * -w
    prevTranslate.current = currentTranslate.current
    setSliderposition()
  }

  useLayoutEffect(() => {
    const w = getWidth(imagesDivRef)
    setWidth(w)
    transitionOff()
    setPositionByIndex(w!)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const w = getWidth(imagesDivRef)
      setWidth(w)
      transitionOff()
      setPositionByIndex(w!)
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
    return (e: React.TouchEvent) => {
      transitionOn()
      dragging.current = true
      startingPosition.current = e.touches[0].clientX
      currentIndex.current = i
      animationId.current = requestAnimationFrame(animation)
    }
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return
    const currentPosition = e.touches[0].clientX
    currentTranslate.current =
      prevTranslate.current + currentPosition - startingPosition.current!
  }

  const handleTouchEnd = () => {
    dragging.current = false
    cancelAnimationFrame(animationId.current!)
    const movedBy = currentTranslate.current - prevTranslate.current
    if (movedBy < -100 && currentIndex.current !== product!.images.length - 1) {
      currentIndex.current += 1
    }
    if (movedBy > 100 && currentIndex.current > 0) {
      currentIndex.current -= 1
    }
    setPositionByIndex(width!)
    setUpdateIndex(!updateIndex)
  }

  return (
    <div className={cn(className)}>
      <div className="flex  h-fit w-full" ref={imagesDivRef}>
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
      </div>
      <p className="absolute bottom-4 left-4 text-subtitle text-darkGray sm:hidden">
        {currentIndex.current + 1}/{product!.images.length}
      </p>
      <Buttons className="absolute top-2 left-2" variant="floating">
        made to order
      </Buttons>
    </div>
  )
}

export default memo(Slider)
