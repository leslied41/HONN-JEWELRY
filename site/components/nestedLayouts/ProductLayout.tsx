import React, { useEffect, useState } from 'react'
import type { Page } from '@commerce/types/page'
import { useGlobalContext } from '../ui/ProductLayoutContext'
import { useRouter } from 'next/router'

interface Props {
  pageProps: any
}
const ProductLayout: React.FC<Props> = ({
  children,
  pageProps: { ...pageProps },
}) => {
  const router = useRouter()
  const { color, shape, products, setColor, setShape } = useGlobalContext()
  const [clicked, setClicked] = useState<Boolean>(false)

  const filterProduct = () => {
    products.forEach((p: any) => {
      const { metafields } = p
      const main_stone_obj = metafields.find((i: any) => i.key === 'main_stone')
      const diamond_color_obj = metafields.find(
        (i: any) => i.key === 'diamond_color'
      )
      if (
        main_stone_obj?.value === shape &&
        diamond_color_obj?.value === color
      ) {
        if (router.query.slug === p.slug) return
        router.replace(`/product/${p.slug}`)
      }
    })
  }

  useEffect(() => {
    const diamond_color_obj = pageProps.product.metafields.find(
      (i: any) => i.key === 'diamond_color'
    )
    const main_stone_obj = pageProps.product.metafields.find(
      (i: any) => i.key === 'main_stone'
    )
    if (!color) setColor(diamond_color_obj.value)
    if (!shape) setShape(main_stone_obj.value)
  }, [])

  useEffect(() => {
    filterProduct()
  }, [clicked])
  return (
    <>
      <section className="fixed right-0 z-10">
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
      {children}
    </>
  )
}

export default ProductLayout
