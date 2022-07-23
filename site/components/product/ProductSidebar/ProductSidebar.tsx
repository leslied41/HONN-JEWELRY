import { FC, useEffect, useState } from 'react'
import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { ProductOptions } from '@components/product'
import { useUI, HtmlText, Buttons } from '@components/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import ProductSearchOps from '../ProductSearchOptions'
import ProductMetafields from '../ProductMetafields'
import { useProductContext } from '../productProvider'
import type { Product } from '@commerce/types/product'
import Estimated from '@components/icon/Estimated'
import Warranty from '@components/icon/Warranty'
import Booking from '@components/icon/Booking'
interface ProductSidebarProps {
  className?: string
  product: Product
  allProducts: Product[]
}

const ProductSidebar: FC<ProductSidebarProps> = ({
  className,
  product,
  allProducts,
}) => {
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
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  const router = useRouter()

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  //this addToCart function is to add options selectd by customers to cart.
  //besides productId and variantId, some more customized info like metafields also need to be added.
  const addToCart = async () => {
    setLoading(true)
    try {
      //so in product page, when you put a product into cart, you cannot choose the amount.
      //but you can update this amount in cart.
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
        //so now metafields passed here will be passed to checkout.
        customAttributes: [
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
      <div data-name-price className="mb-6">
        <p className="text-brown text-h2">{product.name}</p>
        <p className="text-brown text-body-2">
          {product.price.value} <span>{product.price.currencyCode}</span>
        </p>
      </div>
      <ProductSearchOps product={product} allProducts={allProducts} />
      <ProductMetafields />
      {/* <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      /> */}

      <div className="mt-7">
        {process.env.COMMERCE_CART_ENABLED && (
          <Buttons
            className={s.button}
            variant="toRequest"
            onClick={addToCart}
            loading={loading}
            disabled={variant?.availableForSale === false}
            aria-label="Add to Request"
            type="button"
          >
            {variant?.availableForSale === false
              ? 'Not Available'
              : 'ADD TO REQUEST'}
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

      <HtmlText
        html={product.descriptionHtml || product.description}
        className="w-full sm:w-[265px] break-words mt-2 sticky top-32 "
      />
    </div>
  )
}

export default ProductSidebar
