import React, { FC, memo, useState } from 'react'
import Link from 'next/link'
import cn from 'clsx'
import { filterQuery, getCategoryPath, useSearchMeta } from '@lib/search'
import { useRouter } from 'next/router'
import ArrowDown from '@components/icon/ArrowDown'
import { useUI } from '@components/ui/context'

interface Props {
  handleClick: (event: any, filter: string) => void
  categories: any[]
  className?: string
}

const SearchList: FC<Props> = ({ categories, handleClick, className }) => {
  const { openSidebar, setSidebarView } = useUI()
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
    <>
      <ul className={cn(className)}>
        <li
          className={cn('block text-nav text-brown uppercase', {
            ['text-gold']: !activeCategory?.name,
          })}
        >
          <Link href={{ pathname: getCategoryPath('', brand), query }}>
            <a onClick={(e) => handleClick(e, 'categories')}>All</a>
          </Link>
        </li>
        {categories
          .filter((cat) => cat.name !== 'All')
          .slice(0, 4)
          .map((cat: any) => (
            <li
              key={cat.path}
              className={cn('block text-nav text-brown uppercase', {
                ['text-gold']: activeCategory?.id === cat.id,
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
      <div className="relative md:hidden z-10">
        <button
          className={cn(
            'flex items-center text-nav text-brown uppercase bg-transparent'
          )}
          onClick={() => {
            openSidebar()
            setSidebarView('SEARCH_MENU_VIEW')
          }}
        >
          <span>All</span>
          <ArrowDown className={cn('ml-[6px] ')} />
        </button>
      </div>
    </>
  )
}
export default memo(SearchList)
