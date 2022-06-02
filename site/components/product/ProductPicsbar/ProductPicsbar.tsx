import React, { FC } from 'react'
import type { Product } from '@commerce/types/product'
import cn from 'clsx'
import Image from 'next/image'

interface ProductPicsbarProps {
  product: Product
  className?: string
}

const ProductPicsbar: FC<ProductPicsbarProps> = ({ product, className }) => {
  return (
    <div className={cn(className, 'grid grid-cols-7 ')}>
      <div className="col-span-2 px-10 ">
        <div className="sticky top-[88px]">
          {product.images.map((image, i) => (
            <div key={image.url} className="mb-2 ">
              <a href={`#${i}`}>
                <Image
                  src={image.url!}
                  alt={image.alt || 'Product Image'}
                  layout="intrinsic"
                  width="80px"
                  height="110px"
                  priority={true}
                  quality="75"
                  objectFit="cover"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-5">
        {product.images.map((image, i) => (
          <div key={image.url} className="pb-5" id={i.toString()}>
            <Image
              src={image.url!}
              alt={image.alt || 'Product Image'}
              layout="responsive"
              width="100%"
              height="100%"
              priority={i === 0}
              quality="85"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default ProductPicsbar
