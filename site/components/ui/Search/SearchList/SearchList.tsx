import React, { FC, memo } from 'react'
import Link from 'next/link'
import cn from 'clsx'
import { filterQuery, getCategoryPath, useSearchMeta } from '@lib/search'
import { useRouter } from 'next/router'

interface Props {
  handleClick: (event: any, filter: string) => void
  categories: any[]
  className?: string
}

const SearchList: FC<Props> = ({ categories, handleClick, className }) => {
  const router = useRouter()
  const { asPath, locale } = router
  const { pathname, category, brand } = useSearchMeta(asPath)
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })
  const activeCategory = categories.find((cat: any) => cat.slug === category)

  return (
    <ul className={cn(className)}>
      <li
        className={cn('block text-nav text-brown uppercase   ', {
          underline: !activeCategory?.name,
        })}
      >
        <Link href={{ pathname: getCategoryPath('', brand), query }}>
          <a onClick={(e) => handleClick(e, 'categories')}>All Categories</a>
        </Link>
      </li>
      {categories.slice(0, 4).map((cat: any) => (
        <li
          key={cat.path}
          className={cn('block text-nav text-gold uppercase', {
            underline: activeCategory?.id === cat.id,
          })}
        >
          <Link
            href={{
              pathname: getCategoryPath(cat.path, brand),
              query,
            }}
          >
            <a onClick={(e) => handleClick(e, 'categories')}>{cat.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default memo(SearchList)
