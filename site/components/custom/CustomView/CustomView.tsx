import React, { FC } from 'react'
import type { Product } from '@commerce/types/product'
import { Container } from '@components/ui'
import { CurrentPath, Slider } from '@components/common'
import ProductWorks from '@components/product/productWorks'
import { CustomPicsBar, CustomSidebar } from '@components/custom'
import cn from 'clsx'
import s from '../../product/ProductView/ProductView.module.css'

interface Props {
  products: Product[]
}

const CustomView: FC<Props> = ({ products }) => {
  const relatedProducts = products.slice(0, 7)

  return (
    <div>
      <Container className="max-w-none w-full" clean>
        <CurrentPath className="h-[56px] sm:h-[75px] pl-4 sm:pl-10" />
        <div className={cn(s.root)}>
          <CustomPicsBar className={s.main} />
          <CustomSidebar className={s.sidebar} products={products} />
        </div>
        <section className="mb-0 pt-[76px] pb-0 sm:pb-[64px] px-4 sm:px-10 sm:py-12  md:mb-10">
          <div className="grid grid-cols-1 gap-x-5 mb-6 sm:mb-10">
            <div>
              <p className="col-span-1 text-h2-s text-center text-brown uppercase">
                YOU MAY ALSO LIKE
              </p>
            </div>
          </div>

          <Slider
            variant="products"
            products={relatedProducts}
            className="w-full"
            controlBtn
            bottomLine
            productInfo
          />

          <ProductWorks />
        </section>
      </Container>
    </div>
  )
}

export default CustomView
