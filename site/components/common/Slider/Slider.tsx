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

  //   const [dimensions, setDimensions] = useState<
  //     | {
  //         width: number
  //         height: number
  //       }
  //     | undefined
  //   >()

  //   const getElementDimensions = (
  //     ref: React.MutableRefObject<HTMLDivElement | null>
  //   ) => {
  //     if (!ref || !ref.current) return
  //     const width = ref.current.clientWidth
  //     const height = ref.current.clientHeight
  //     return { width, height }
  //   }
  const setPositionByIndex = useCallback(() => {
    currentTranslate.current = currentIndex.current * -window.innerWidth
    prevTranslate.current = currentTranslate.current
    setSliderposition()
  }, [])
  //   useLayoutEffect(() => {
  //     setDimensions(getElementDimensions(imagesDivRef))
  //     setPositionByIndex(getElementDimensions(imagesDivRef)!.width)
  //   }, [])

  //   useEffect(() => {
  //     // set width if window resizes
  //     const handleResize = () => {
  //       transitionOff()
  //       const { width, height } = getElementDimensions(imagesDivRef)!
  //       setDimensions({ width, height })
  //       setPositionByIndex(width)
  //     }
  //     window.addEventListener('resize', handleResize)
  //     return () => {
  //       window.removeEventListener('resize', handleResize)
  //     }
  //   }, [])

  const setSliderposition = () => {
    if (!imagesDivRef.current || !imagesDivRef) return
    imagesDivRef.current.style.transform = `translateX(${currentTranslate.current}px)`
  }

  const transitionOn = () => {
    if (!imagesDivRef.current || !imagesDivRef) return
    imagesDivRef.current.style.transition = `transform ${transition}s ease-out`
  }

  const transitionOff = () => {
    if (!imagesDivRef.current || !imagesDivRef) return
    imagesDivRef.current.style.transition = 'none'
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
    setPositionByIndex()
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
