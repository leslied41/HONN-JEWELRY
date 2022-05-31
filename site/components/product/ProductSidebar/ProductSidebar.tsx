import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState, useReducer, useCallback } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import { useRouter } from 'next/router'
import { productReducer, ActionType } from '../ProductSearchReducer'
import useEffectSkipInitial from '../../../lib/hooks/useEffectSkipInitial'

interface ProductSidebarProps {
  product: Product
  className?: string
  allProducts: Product[]
}
const initialState = {
  shape: '',
  color: '',
}

const ProductSidebar: FC<ProductSidebarProps> = ({
  product,
  className,
  allProducts,
}) => {
  const addItem = useAddItem()
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  const [clicked, setClicked] = useState<Boolean>(false)
  const [state, dispatch] = useReducer(productReducer, initialState)
  const router = useRouter()

  const setShape = useCallback(
    (shape) => dispatch({ type: ActionType.SHAPE, payload: shape }),
    [dispatch]
  )
  const setColor = useCallback(
    (color) => dispatch({ type: ActionType.COLOR, payload: color }),
    [dispatch]
  )

  const filterProduct = () => {
    allProducts.forEach((p: any) => {
      const { metafields } = p
      const main_stone_obj = metafields.find((i: any) => i.key === 'main_stone')
      const diamond_color_obj = metafields.find(
        (i: any) => i.key === 'diamond_color'
      )
      if (
        main_stone_obj?.value === state.shape &&
        diamond_color_obj?.value === state.color
      ) {
        if (router.query.slug === p.slug) return
        router.replace(`/product/${p.slug}`)
      }
    })
  }

  useEffect(() => {
    const diamond_color_obj = product.metafields.find(
      (i: any) => i.key === 'diamond_color'
    )
    const main_stone_obj = product.metafields.find(
      (i: any) => i.key === 'main_stone'
    )
    if (!state.color) setColor(diamond_color_obj?.value)
    if (!state.shape) setShape(main_stone_obj?.value)
  }, [])

  useEffectSkipInitial(() => {
    filterProduct()
  }, [clicked])

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
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
      {/* this is to choose color or other options for a product using options */}
      {/* so now the problem is when chossing metadata how to make options chosen automatically, so
      first I need to compare options to metadata, if options cannot be found in metadata, then then option color should
      be dark implying this cannot be chosen. 通过options array，和metadata array的对比，如果medata array的item不在options array中
      则设该item css为dark. 然后对于有的item，则设为亮的。同时在该item中选择metadata时同时也选择options。则可以解决该问题。
      还应注意问题是，search product时候，当在ring页面时应该只能search同类产品，不能search耳环，项链之类。 */}
      <section>
        <div>
          <div>
            <p>color</p>
            <ul className="list-none flex">
              <li className="mr-2">
                <button
                  onClick={() => {
                    setColor('#f44336')
                    setClicked(!clicked)
                  }}
                >
                  red
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setColor('#e91e63')
                    setClicked(!clicked)
                  }}
                >
                  purple
                </button>
              </li>
            </ul>
          </div>
          <div>
            <p>shape</p>
            <ul className="list-none flex">
              <li className="mr-2">
                <button
                  onClick={() => {
                    setShape('square')
                    setClicked(!clicked)
                  }}
                >
                  square
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setShape('round')
                    setClicked(!clicked)
                  }}
                >
                  round
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <Text
        className="pb-4 break-words w-full max-w-xl"
        html={product.descriptionHtml || product.description}
      />
      {/* <div className="flex flex-row justify-between items-center">
        <Rating value={4} />
        <div className="text-accent-6 pr-1 font-medium text-sm">36 reviews</div>
      </div> */}
      <div>
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label="Add to Cart"
            type="button"
            className={s.button}
            onClick={addToCart}
            loading={loading}
            disabled={variant?.availableForSale === false}
          >
            {variant?.availableForSale === false
              ? 'Not Available'
              : 'Add To Cart'}
          </Button>
        )}
      </div>
      <div className="mt-6">
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
