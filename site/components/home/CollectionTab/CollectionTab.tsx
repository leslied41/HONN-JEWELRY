import React, { FC, useMemo, useState } from 'react'
import s from './CollectionTab.module.css'
import { Slider } from '@components/common'
import type { Product } from '@commerce/types/product'
import { Category } from '@commerce/types/site'
import useSearch from '@framework/product/use-search'
import { useRouter } from 'next/router'
import cn from 'clsx'

interface Props {
  categories: Category[]
  className?: string
}

const CollectionTab: FC<Props> = ({ className, categories }) => {
  const [activeCategory, setActiveCategory] = useState<Category>({
    id: 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzE2OTU2NDY2Nzk1MA==',
    name: 'New Arrival',
    path: '/new-arrival',
    slug: 'new-arrival',
  })
  const router = useRouter()
  const { locale } = router

  const getCategory = (categories: Category[], names: string[]) => {
    const targetCategories = categories.filter((c) => {
      if (names.includes(c.name)) return c
    })
    return targetCategories
  }
  const tabCategories = useMemo(
    () =>
      getCategory(categories, [
        'Engagement ring',
        'New Arrival',
        'Wedding bands',
      ]),
    [categories]
  )
  const handleClick = (t: Category) => {
    setActiveCategory(t)
  }
  const { data } = useSearch({
    categoryId: activeCategory?.id,
    locale,
  })
  return (
    <>
      <div className="grid grid-cols-6  mx-4 md:mx-10 text-brown gap-x-0 md:gap-x-5 gap-y-10 sm:gap-y-20  relative -top-40 md:top-0 ">
        {/*  row 1*/}
        <div className="col-span-6 justify-self-center pt-4 sm:pt-32">
          <ul className="flex gap-x-5 sm:gap-x-10 text-btn">
            {tabCategories?.map((t) => {
              return (
                <li key={t.id}>
                  <button
                    className={cn('tab-button-home uppercase', {
                      [s.activeBtn]: activeCategory.name === t.name,
                    })}
                    onClick={(e) => handleClick(t)}
                  >
                    {t.name}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="col-span-4 ">
          <p className="text-h2 font-kessler md:text-h1">
            MADE WITH THE FINEST MATERIALS.
          </p>
        </div>
        <div className="col-span-2 justify-self-end">
          <img src="/cherry.svg" alt="cherry svg" />
        </div>
      </div>
      <div className="relative -top-40 md:top-0 px-4 sm:px-10">
        <Slider
          variant="products"
          products={data?.products}
          className="w-full"
          controlBtn
          bottomLine
          productInfo
        />
      </div>
    </>
  )
}
export default CollectionTab
