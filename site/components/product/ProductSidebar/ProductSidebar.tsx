import { FC, useEffect, useState, useMemo } from 'react'
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
import { Item } from '../../request/request'
import { objectsCompare } from '@lib/compare-array'

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
  const variant = useMemo(
    () => getProductVariant(product, selectedOptions),
    [product]
  )

  const isSameItemExisting = (newItem: Item, items: Item[]) => {
    const newCompareAttributes = newItem.customAttributes.filter(
      (c) => !['request id', 'product id'].includes(c.key)
    )
    const existed = items.some((i) => {
      const compareAttributes = i.customAttributes.filter(
        (c) => !['request id', 'product id'].includes(c.key)
      )
      if (
        i.productId === newItem.productId &&
        objectsCompare(newCompareAttributes, compareAttributes)
      )
        return true
    })
    if (existed) return true
    return false
  }
  const addToRequset = () => {
    setLoading(true)
    const items: Item[] = localStorage.getItem('request')
      ? JSON.parse(localStorage.getItem('request')!)
      : []
    const customAttributes = [
      { key: 'request id', value: String(new Date().getTime()) },
      { key: 'product id', value: String(product.id) },
      { key: 'product name', value: String(product.name) },
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
    ]
    const item: Item = {
      productId: String(product.id),
      variantId: String(variant ? variant.id : product.variants[0]?.id),
      customAttributes: customAttributes,
      variant: variant,
      image: product.images[0].url,
      path: product.path,
      name: product.name,
      quantity: 1,
    }
    if (!isSameItemExisting(item, items)) items.push(item)

    localStorage.setItem('request', JSON.stringify(items))
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }
  const addToCart = async () => {
    setLoading(true)
    const customAttributes = [
      { key: 'product id', value: String(product.id) },
      { key: 'product name', value: String(product.name) },
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
    ]

    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
        customAttributes: customAttributes,
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
        <p className="text-brown text-h2 font-kessler">{product.name}</p>
        {router.query.slug !== 'CUSTOM' ? (
          <p className="text-brown text-body-2 mt-2">
            {product.price.value} <span>{product.price.currencyCode}</span>
          </p>
        ) : (
          <p className="text-brown text-body-2 mt-2">Make your own style</p>
        )}
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
            onClick={addToRequset}
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
