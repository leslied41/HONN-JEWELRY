import React, { FC, memo } from 'react'
import s from './Heading.module.css'
import Image from 'next/image'
import cn from 'clsx'
import { Buttons } from '@components/ui'

interface Props {
  className?: string
}

const Heading: FC<Props> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1', className)}>
      <div className="relative  h-[50rem]  w-full">
        {/* <img
          src="/landing_pic3.png"
          alt="flower pic"
          className="absolute top-[35rem] z-10"
        /> */}
        <Buttons className={s.button}>Book an appointment</Buttons>
        <Image
          className="object-cover z-0"
          layout="fill"
          src="/landing_bg1.jpg"
        />
      </div>
    </div>
  )
}

export default memo(Heading)
