import React, { CSSProperties } from 'react'
import cn from 'clsx'
import px from '@lib/to-pixels'
import s from './Skeleton.module.css'

interface SkeletonProps {
  show?: boolean
  block?: boolean
  className?: string
  style?: CSSProperties
  width?: string | number
  height?: string | number
  boxHeight?: string | number
}

const Skeleton: React.FC<SkeletonProps> = ({
  style,
  width,
  height,
  children,
  className,
  show = true,
  boxHeight = height,
}) => {
  // Automatically calculate the size if there are children
  // and no fixed sizes are specified
  //when no size like height and widht are specified and thre are children, the skleton should automatically
  //cover this whole skeleton element and its children.
  //but if size is specefied and there is no children, the heigh and widht would be fixed.
  //regarding how to make it automatically cover children, pseudo selector after or before is
  //used as well as css properties like top:0 left:0 right:0 bottom:0 absolute.
  const shouldAutoSize = !!children && !(width || height)

  // Defaults
  width = width || 24
  height = height || 24
  boxHeight = boxHeight || height

  return (
    <span
      className={cn(s.skeleton, className, {
        [s.show]: show,
        [s.wrapper]: shouldAutoSize,
        [s.loaded]: !shouldAutoSize && !!children,
      })}
      style={
        shouldAutoSize
          ? {}
          : {
              minWidth: px(width),
              minHeight: px(height),
              marginBottom: `calc(${px(boxHeight)} - ${px(height)})`,
              ...style,
            }
      }
    >
      {children}
    </span>
  )
}

export default Skeleton
