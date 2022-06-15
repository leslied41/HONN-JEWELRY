import React, { useEffect } from 'react'
import useEffectSkipInitial from '@lib/hooks/useEffectSkipInitial'
import { useRouter } from 'next/router'
import ColorOption from '../ColorOption'
import DropDown from '../Dropdown'
import { useProductContext } from '../productProvider'
import BandOption from '../BandOption'
import MosaicOption from '../MosaicOption'

//so the better solution is to use useContext, all the state and setState and other data needed in these components
//should be put into useContext, and put it on the product page. That is because the state including these search options
//and fields data need to be upload to shopify in ProductSidebar component using addToCart function.

export const ProductSearchOps = () => {
  const {
    product,
    allProducts,
    color,
    shape,
    band,
    mosaic,
    setBand,
    setShape,
    setColor,
    setMosaic,
  } = useProductContext()
  console.log(product)
  const router = useRouter()

  const filterProduct = () => {
    allProducts.forEach((p: any) => {
      const { metafields } = p
      const main_stone_obj = metafields.find((i: any) => i.key === 'main_stone')

      const ring_band_obj = metafields.find((i: any) => i.key === 'ring_band')
      const mosaic_obj = metafields.find((i: any) => i.key === 'mosaic')

      if (
        main_stone_obj &&
        ring_band_obj &&
        mosaic_obj &&
        main_stone_obj?.value === shape &&
        ring_band_obj?.value === band &&
        mosaic_obj?.value === mosaic
      ) {
        if (router.query.slug === p.slug) return
        router.replace(`/product/${p.slug}`)
      }
    })
  }

  useEffect(() => {
    //this is to set default value for every metafield options that can determine searching.

    const main_stone_obj = product.metafields?.find(
      (i: any) => i.key === 'main_stone'
    )
    const ring_band_obj = product.metafields?.find(
      (i: any) => i.key === 'ring_band'
    )
    const mosaic_obj = product.metafields?.find((i: any) => i.key === 'mosaic')

    if (!shape) setShape?.(main_stone_obj?.value ? main_stone_obj?.value : '')
    if (!band) setBand?.(ring_band_obj?.value ? ring_band_obj?.value : '')
    if (!mosaic) setMosaic?.(mosaic_obj?.value ? mosaic_obj?.value : '')
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
        <div data-search-options="band">
          <BandOption />
        </div>
        <div data-search-options="mosaic">
          <MosaicOption />
        </div>
      </div>
    </div>
  )
}
export default ProductSearchOps
