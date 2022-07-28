import { useEffect } from 'react'
import Link from 'next/link'
import cn from 'clsx'
import s from './SearchSidebarView.module.css'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
import type { Link as LinkProps } from './index'
import ArrowDown from '@components/icon/ArrowDown'
import { Category } from '@commerce/types/site'
import { filterQuery, getCategoryPath, useSearchMeta } from '@lib/search'
import { useRouter } from 'next/router'

export default function SearchSidebarView({
  links = [],
  setChildComponent,
  categories,
}: {
  links?: LinkProps[]
  setChildComponent: (v: string) => void
  categories: Category[]
}) {
  console.log(categories)
  const { closeSidebar } = useUI()
  const router = useRouter()
  const { asPath, locale } = router
  const { pathname, category, brand } = useSearchMeta(asPath)
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })
  const activeCategory = categories.find((cat: any) => cat.slug === category)
  useEffect(() => {
    setChildComponent('SearchSidebar')
    return () => {
      setChildComponent('')
    }
  }, [])

  return (
    <SidebarLayout handleClose={() => closeSidebar()} child="SearchSidebar">
      <div className="flex px-4">
        <nav className="flex-1">
          <ul className="flex flex-col gap-y-4">
            {categories
              .slice(0, 10)
              .sort((a: Category, b: Category) => {
                if (a.name.toUpperCase() < b.name.toUpperCase()) return -1
                if (a.name.toUpperCase() > b.name.toUpperCase()) return 1
                return 0
              })
              .map((cat: any) => (
                <li
                  onClick={() => closeSidebar()}
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
                    <a>{cat.name}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        <div className="flex-grow-0">
          <button onClick={() => closeSidebar()}>
            <ArrowDown
              width={16}
              height={16}
              stroke="#8D5535"
              className="rotate-180"
            />
          </button>
        </div>
      </div>
    </SidebarLayout>
  )
}
