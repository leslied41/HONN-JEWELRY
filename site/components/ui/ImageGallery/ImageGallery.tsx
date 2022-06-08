import React, { FC } from 'react'
import Image from 'next/image'
import s from './ImageGallery.module.css'
import cn from 'clsx'
import { Layout } from '@components/common'

interface Props {
  insData: {
    media_url?: string
    id: string
    caption?: string
  }[]
  layout: 'A' | 'B' | 'C' | 'D'
}

const ImageGallery: FC<Props> = ({ insData, layout }) => {
  const data = insData.slice(0, 5)
  return (
    <div className={cn({ [s.layoutA]: layout == 'A' })}>
      {data.map((p) => {
        const { id, media_url, caption } = p
        return (
          <div key={id}>
            <Image
              src={media_url ? media_url : ''}
              alt={caption}
              layout="responsive"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </div>
        )
      })}
    </div>
  )
}
export default ImageGallery
