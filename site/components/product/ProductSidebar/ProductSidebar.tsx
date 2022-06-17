import { FC, useEffect, useState } from 'react'
import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { ProductOptions } from '@components/product'
import { useUI, HtmlText, Buttons } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import ProductSearchOps from '../ProductSearchOptions'
import ProductMetafields from '../ProductMetafields'
import { useProductContext } from '../productProvider'

interface ProductSidebarProps {
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ className }) => {
  const {
    product,
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
      <div data-name-price>
        <p>{product.name}</p>
        <p>
          {product.price.value} <span>{product.price.currencyCode}</span>
        </p>
      </div>
      <ProductSearchOps />
      <ProductMetafields />
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />

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
      <div>
        <div data-delivery-estimated className="mt-5">
          <div className="flex gap-x-2">
            <img src="/estimated.svg" alt="delivery-estimated-icon" />
            <p>Estimated: 3–5 business days</p>
          </div>
          <div className="flex gap-x-2">
            <img
              src="/estimated.svg"
              alt="delivery-estimated-icon"
              className="opacity-0"
            />
            <a href="">Free shipping policy</a>
          </div>
        </div>
        <div data-warranty className="flex gap-x-2">
          <img src="/warranty.svg" alt="warranty-icon" />
          <p>5 years warranty</p>
        </div>
        <div data-booking className="flex gap-x-2">
          <img src="/booking.svg" alt="booking-icon" />
          <p>Book an appointemnt</p>
        </div>
      </div>

      <HtmlText
        html={product.descriptionHtml || product.description}
        className="w-full break-words mt-2 sticky top-32 "
      />
    </div>
  )
}

export default ProductSidebar
