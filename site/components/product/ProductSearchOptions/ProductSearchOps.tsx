import React, { useEffect, FC } from 'react'
import { useRouter } from 'next/router'
import DropdownOption from '../DropdownOption'
import { useProductContext } from '../productProvider'
import { CirclePicOption } from '../CirclePicOption'
import useEffectSkipInitial from '@lib/hooks/useEffectSkipInitial'
import type { Product } from '@commerce/types/product'

interface Props {
  product: Product
  allProducts: Product[]
}
export const ProductSearchOps: FC<Props> = ({ product, allProducts }) => {
  const { shape, band, mosaic, setBand, setShape, setMosaic } =
    useProductContext()
  console.log(product)
  const router = useRouter()

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
  }, [product, band, shape, mosaic])

  useEffectSkipInitial(() => {
    const filterProduct = () => {
      allProducts.forEach((p: any) => {
        const { metafields } = p
        const main_stone_obj = metafields.find(
          (i: any) => i.key === 'main_stone'
        )

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
    filterProduct()
  }, [band, shape, mosaic, allProducts])

  return (
    <div>
      <div data-search-options>
        <DropdownOption variant="A" />
        <CirclePicOption variant="A" className="mt-6" />
        <CirclePicOption variant="B" className="mt-6" />
      </div>
    </div>
  )
}
export default ProductSearchOps
