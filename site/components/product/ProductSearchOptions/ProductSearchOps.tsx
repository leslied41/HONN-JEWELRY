import React, { FC, useReducer, useCallback, useEffect } from 'react'
import useEffectSkipInitial from '@lib/hooks/useEffectSkipInitial'
import Select from 'react-select'
import { productReducer, ActionType } from '../ProductSearchReducer'
import type { Product } from '@commerce/types/product'
import { useRouter } from 'next/router'
import ColorOption from '../ColorOption'
import DropDown from '../Dropdown'
//so the better solution is to use useContext, all the state and setState and other data needed in these components
//should be put into useContext, and put it on the product page. That is because the state including these search options
//and fields data need to be upload to shopify in ProductSidebar component using addToCart function.
interface Props {
  product: Product
  allProducts: Product[]
}

const initialState = {
  shape: '',
  color: '',
}
export const ProductSearchOps: FC<Props> = ({ product, allProducts }) => {
  const [state, dispatch] = useReducer(productReducer, initialState)
  const router = useRouter()
  const setShape = useCallback(
    (shape: string) => dispatch({ type: ActionType.SHAPE, payload: shape }),
    [dispatch]
  )
  const setColor = useCallback(
    (color: string) => dispatch({ type: ActionType.COLOR, payload: color }),
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
        main_stone_obj &&
        diamond_color_obj &&
        main_stone_obj?.value === state.shape &&
        diamond_color_obj?.value === state.color
      ) {
        if (router.query.slug === p.slug) return
        router.replace(`/product/${p.slug}`)
      }
    })
  }

  useEffect(() => {
    const diamond_color_obj = product.metafields?.find(
      (i: any) => i.key === 'diamond_color'
    )
    const main_stone_obj = product.metafields?.find(
      (i: any) => i.key === 'main_stone'
    )
    if (!diamond_color_obj) return
    if (!main_stone_obj) return
    if (!state.color) setColor(diamond_color_obj?.value)
    if (!state.shape) setShape(main_stone_obj?.value)
  }, [])

  useEffectSkipInitial(() => {
    filterProduct()
  }, [state])

  return (
    <div>
      <div data-search-options>
        <div data-search-options="shape">
          <DropDown setShape={setShape} />
        </div>
        <div data-search-options="color">
          <ColorOption setColor={setColor} state={state} />
        </div>
      </div>
    </div>
  )
}
export default ProductSearchOps
