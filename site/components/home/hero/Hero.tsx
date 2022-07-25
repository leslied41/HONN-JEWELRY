import React, { FC, memo } from 'react'
import s from './Hero.module.css'
import Image from 'next/image'
import cn from 'clsx'
import { Buttons } from '@components/ui'
import { useRouter } from 'next/router'

interface Props {
  className?: string
}

const Heading: FC<Props> = ({ className }) => {
  const router = useRouter()
  return (
    <div className={cn('grid grid-cols-1', className)}>
      <div className="relative  h-[50rem]  w-full">
        <Buttons
          className={s.button}
          onClick={() => router.push('/request-for-quote')}
        >
          Book an appointment
        </Buttons>
        <Image
          className="object-cover z-0"
          layout="fill"
          src="/landing_bg1.jpg"
          quality={100}
          priority
        />
      </div>
    </div>
  )
}

export default memo(Heading)
