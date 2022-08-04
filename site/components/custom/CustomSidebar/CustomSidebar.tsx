import Booking from '@components/icon/Booking'
import Estimated from '@components/icon/Estimated'
import Warranty from '@components/icon/Warranty'
import ProductMetafields from '@components/product/ProductMetafields'
import Buttons from '@components/ui/Buttons'
import { useUI } from '@components/ui'
import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'
import ProductSeatchOps from '../../product/ProductSearchOptions'
import type { Product } from '@commerce/types/product'
import { useAddItem } from '@framework/cart'
import { useProductContext } from '../../product/productProvider'

interface Props {
  className: string
  products: Product[]
}

const CustomSidebar: FC<Props> = ({ className, products }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { openSidebar } = useUI()
  const {
    metalColor,
    shape,
    band,
    mosaic,
    stoneColorLevel,
    stoneClarity,
    stoneCut,
    textStyle,
    littleDiamondColor,
    size,
    weight,
    engraved,
  } = useProductContext()

  const addItem = useAddItem()
  const addToCart = async () => {
    setLoading(true)

    try {
      //so in product page, when you put a product into cart, you cannot choose the amount.
      //but you can update this amount in cart.
      await addItem({
        productId: String('0000000001'),
        variantId: String('0000000001'),
        //so now metafields passed here will be passed to checkout.
        customAttributes: [
          { key: 'product id', value: String('0000000001') },
          { key: 'product name', value: 'custom' },
          { key: 'Main Stone Shape', value: shape },
          { key: 'Ring Band', value: band },
          { key: 'Mosaic', value: mosaic },
          { key: 'Metal Color', value: metalColor },
          { key: 'Text Print', value: engraved },
          { key: 'Little Diamond Color', value: littleDiamondColor },
          { key: 'Ring Size', value: size },
          { key: 'Main Stone Color Level', value: stoneColorLevel },
          { key: 'Main Stone Clarity', value: stoneClarity },
          { key: 'Main Stone Cut', value: stoneCut },
          { key: 'Carat', value: weight },
          { key: 'Text Style', value: textStyle },
        ],
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  return (
    <div className={className}>
      <ProductSeatchOps allProducts={products} />
      <ProductMetafields />
      <div className="mt-7">
        {process.env.COMMERCE_CART_ENABLED && (
          <Buttons
            className="w-full sm:w-[265px] bg-brown text-gray"
            variant="toRequest"
            onClick={addToCart}
            loading={loading}
            aria-label="Add to Request"
            type="button"
          >
            ADD TO REQUEST
          </Buttons>
        )}
      </div>
      <div className="w-full sm:w-[265px]">
        <div data-delivery-estimated className="mt-5">
          <div className="flex gap-x-2 items-center">
            <Estimated />
            <p>Estimated: 3–5 business days</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <Estimated className="opacity-0" />
            <a href="">Free shipping policy</a>
          </div>
        </div>
        <div data-warranty className="flex gap-x-2 items-center">
          <Warranty />
          <p>5 years warranty</p>
        </div>
        <div data-booking className="flex gap-x-2 items-center">
          <Booking />
          <a
            onClick={() => router.push('/request-for-quote')}
            className="cursor-pointer"
          >
            <p>Book an appointemnt</p>
          </a>
        </div>
      </div>
    </div>
  )
}
export default CustomSidebar
