import cn from 'clsx'
import { FC, ReactNode, Component } from 'react'
import s from './GridContainer.module.css'

interface GridProps {
  className?: string
  children?: ReactNode[] | Component[] | any[] | ReactNode
  layout?: 'A' | 'B' | 'C' | 'D' | 'normal'
  variant?: 'default' | 'filled'
}

const GridContainer: FC<GridProps> = ({
  className,
  layout = 'A',
  children,
  variant = 'default',
}) => {
  const rootClassName = cn(
    s.root, //root is always included in the classroom.
    {
      [s.layoutA]: layout === 'A', //when layout==='A', layoutA will be added into classname.
      [s.layoutB]: layout === 'B',
      [s.layoutC]: layout === 'C',
      [s.layoutD]: layout === 'D',
      [s.layoutNormal]: layout === 'normal',
      [s.default]: variant === 'default',
      [s.filled]: variant === 'filled',
    },
    className
  )
  // above is using the clsx package that can conditionally change classname strings.

  return <div className={rootClassName}>{children}</div>
}

export default GridContainer
