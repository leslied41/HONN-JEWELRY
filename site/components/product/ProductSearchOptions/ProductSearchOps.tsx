import React, { useEffect } from 'react'
import useEffectSkipInitial from '@lib/hooks/useEffectSkipInitial'
import { useRouter } from 'next/router'
import ColorOption from '../ColorOption'
import DropDown from '../Dropdown'
import { useProductContext } from '../productProvider'

//so the better solution is to use useContext, all the state and setState and other data needed in these components
//should be put into useContext, and put it on the product page. That is because the state including these search options
//and fields data need to be upload to shopify in ProductSidebar component using addToCart function.

export const ProductSearchOps = () => {
  const { product, allProducts, color, shape, setShape, setColor } =
    useProductContext()

  const router = useRouter()

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
        main_stone_obj?.value === shape &&
        diamond_color_obj?.value === color
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
    if (!color) setColor?.(diamond_color_obj?.value)
    if (!shape) setShape?.(main_stone_obj?.value)
  }, [])

  useEffectSkipInitial(() => {
    filterProduct()
  }, [color, shape])

  return (
    <div>
      <div data-search-options>
        <div data-search-options="shape">
          <DropDown />
        </div>
        <div data-search-options="color">
          <ColorOption />
        </div>
      </div>
    </div>
  )
}
export default ProductSearchOps
