import React, { FC, useReducer, useCallback, useEffect } from 'react'
import useEffectSkipInitial from '@lib/hooks/useEffectSkipInitial'
import Select from 'react-select'
import { productReducer, ActionType } from '../ProductSearchReducer'
import type { Product } from '@commerce/types/product'
import { useRouter } from 'next/router'

interface Props {
  product: Product
  allProducts: Product[]
}

const shapeOptions = [
  { value: 'round', label: 'round' },
  { value: 'square', label: 'square' },
]
const initialState = {
  shape: {
    value: '',
    label: '',
  },
  color: '',
}
export const ProductSearchOps: FC<Props> = ({ product, allProducts }) => {
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
        main_stone_obj &&
        diamond_color_obj &&
        main_stone_obj?.value === state.shape.value &&
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
    if (!diamond_color_obj) return
    if (!main_stone_obj) return
    if (!state.color) setColor(diamond_color_obj?.value)
    if (!state.shape.value)
      setShape({
        value: main_stone_obj?.value,
        label: main_stone_obj?.value,
      })
  }, [])

  useEffectSkipInitial(() => {
    filterProduct()
  }, [state])

  return (
    <div>
      <div data-search-options>
        <div data-search-options="shape">
          <p>SHAPE</p>
          <Select
            defaultValue={state.shape.value}
            placeholder={state.shape.value}
            onChange={setShape}
            options={shapeOptions}
            id="long-value-select"
            instanceId="long-value-select"
          />
          <p>color</p>
          <ul className="list-none flex">
            <li className="mr-2">
              <button
                onClick={() => {
                  setColor('#f44336')
                }}
              >
                red
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setColor('#e91e63')
                }}
              >
                purple
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default ProductSearchOps
