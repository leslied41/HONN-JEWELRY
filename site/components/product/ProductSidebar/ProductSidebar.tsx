import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState, useReducer, useCallback } from 'react'
import { ProductOptions } from '@components/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import Buttons from '@components/ui/Buttons'
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
  const { product, allProducts, metalColor, shape } = useProductContext()

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
          { key: 'metal color', value: metalColor },
          { key: 'shape', value: shape },
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

      <div>
        {process.env.COMMERCE_CART_ENABLED && (
          // <Button
          //   aria-label="Add to Cart"
          //   type="button"
          //   className={s.button}
          //   onClick={addToCart}
          //   loading={loading}
          //   disabled={variant?.availableForSale === false}
          // >
          //   {variant?.availableForSale === false
          //     ? 'Not Available'
          //     : 'Add To Cart'}
          // </Button>
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
      <Text
        className="pb-4 break-words w-full max-w-xl"
        html={product.descriptionHtml || product.description}
      />
      <div className="mt-6 sticky top-40">
        <Collapse title="Care">
          This is a limited edition production run. Printing starts when the
          drop ends.
        </Collapse>
        <Collapse title="Details">
          This is a limited edition production run. Printing starts when the
          drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
          to COVID-19.
        </Collapse>
      </div>
    </div>
  )
}

export default ProductSidebar
