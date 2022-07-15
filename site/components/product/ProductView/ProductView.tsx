import React, { FC } from 'react'
import cn from 'clsx'
import s from './ProductView.module.css'
import usePrice from '@framework/product/use-price'
import { Container, Text } from '@components/ui'
import { SEO } from '@components/common'
import ProductSidebar from '../ProductSidebar'
import ProductPicsbar from '../ProductPicsbar'
import ImageGallery from '@components/ui/ImageGallery'
import type { Product } from '@commerce/types/product'
import ProductWorks from '../productWorks'
import { CurrentPath } from '@components/common'
import { Slider } from '@components/common'

interface Props {
  product: Product
  allProducts: Product[]
}

const ProductView: FC<Props> = ({ product, allProducts }) => {
  const relatedProducts = allProducts.slice(0, 6)
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  return (
    <>
      <Container className="max-w-none w-full" clean>
        <div className="h-[56px] sm:h-[75px] pl-4 sm:pl-10 flex items-center">
          <CurrentPath product={product} />
        </div>

        <div className={cn(s.root)}>
          <ProductPicsbar className={s.main} product={product} />
          <ProductSidebar
            key={product.id}
            className={s.sidebar}
            product={product}
            allProducts={allProducts}
          />
        </div>

        <section className="mb-0 pt-[76px] pb-0 sm:pb-[64px] px-4 sm:px-10 sm:py-12  md:mb-10">
          <div className="grid grid-cols-1 gap-x-5 mb-6 sm:mb-10">
            <div>
              <p className="col-span-1 text-h2-s text-center text-brown uppercase">
                YOU MAY ALSO LIKE
              </p>
            </div>
          </div>
          {/* <ImageGallery
            products={relatedProducts}
            layout="B"
            link={true}
            divClassName="mx-4 sm:mx-10"
            imageDivClassName={'hidden sm:block '}
          /> */}
          <Slider
            products={relatedProducts}
            className="w-full"
            controlBtn
            bottomLine
            productInfo
          />

          <ProductWorks />
        </section>
      </Container>
      <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: '800',
              height: '600',
              alt: product.name,
            },
          ],
        }}
      />
    </>
  )
}

export default ProductView
