import type { SearchPropsType } from '@lib/search-props'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { Container, Skeleton } from '@components/ui'
import { CurrentPath } from '@components/common'
import useSearch from '@framework/product/use-search'
import getSlug from '@lib/get-slug'
import rangeMap from '@lib/range-map'
import ImageGallery from '../ImageGallery'
import s from './search.module.css'
import SearchList from '@components/ui/Search/SearchList'
import Sort from './Sort'
import { useSearchMeta } from '@lib/search'

export default function Search({ categories, brands }: SearchPropsType) {
  const [activeFilter, setActiveFilter] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false)

  const router = useRouter()
  const { asPath, locale } = router
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected

  const { pathname, category, brand } = useSearchMeta(asPath)
  const activeCategory = categories.find((cat: any) => cat.slug === category)
  const activeBrand = brands.find(
    (b: any) => getSlug(b.node.path) === `brands/${brand}`
  )?.node

  const { data } = useSearch({
    search: typeof q === 'string' ? q : '',
    categoryId: activeCategory?.id,
    brandId: (activeBrand as any)?.entityId,
    sort: typeof sort === 'string' ? sort : '',
    locale,
  })
  const handleClick = useCallback(
    () => (event: any, filter: string) => {
      if (filter !== activeFilter) {
        setToggleFilter(true)
      } else {
        setToggleFilter(!toggleFilter)
      }
      setActiveFilter(filter)
    },
    []
  )

  return (
    <Container className="px-4 md:px-10 mb-[120px]" clean>
      <CurrentPath className="h-[56px] sm:h-[75px]" />
      {/* Products */}
      {/* {(q || activeCategory || activeBrand) && (
        <div className="mb-12 transition ease-in duration-75">
          {data ? (
            <>
              <span
                className={cn('animated', {
                  fadeIn: data.found,
                  hidden: !data.found,
                })}
              >
                Showing {data.products.length} results{' '}
                {q && (
                  <>
                    for "<strong>{q}</strong>"
                  </>
                )}
              </span>
              <span
                className={cn('animated', {
                  fadeIn: !data.found,
                  hidden: data.found,
                })}
              >
                {q ? (
                  <>
                    There are no products that match "<strong>{q}</strong>"
                  </>
                ) : (
                  <>There are no products that match the selected category.</>
                )}
              </span>
            </>
          ) : q ? (
            <>
              Searching for: "<strong>{q}</strong>"
            </>
          ) : (
            <>Searching...</>
          )}
        </div>
      )} */}
      <div>
        <h1 className="text-center text-h2 uppercase text-brown pt-2 pb-16 font-kessler">
          shop all
        </h1>
      </div>
      <div className={s.imagegallery}>
        <div className="h-[54px] flex justify-between pt-[14px] pb-6">
          <div>
            <SearchList
              handleClick={handleClick}
              categories={categories}
              className="hidden md:flex gap-x-6"
            />
          </div>
          <div>
            <Sort handleClick={handleClick} />
          </div>
        </div>
        {data ? (
          <ImageGallery
            products={data.products}
            layout="C"
            link
            intro
            imageDivClassName="animated fadeIn"
          />
        ) : (
          <div className="grid  gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {rangeMap(12, (i) => (
              <Skeleton key={i}>
                <div className="w-60 h-60" />
              </Skeleton>
            ))}
          </div>
        )}{' '}
      </div>
    </Container>
  )
}

Search.Layout = Layout
