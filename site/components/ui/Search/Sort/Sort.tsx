import React, { FC, memo, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cn from 'clsx'
import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'

const SORT = {
  'trending-desc': 'Trending',
  'latest-desc': 'Latest arrivals',
  'price-asc': 'Price: Low to high',
  'price-desc': 'Price: High to low',
}
interface Props {
  handleClick: (event: any, filter: string) => void
  className?: string
}

const Sort: FC<Props> = ({ handleClick, className }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { q, sort } = router.query
  const { asPath, locale } = router
  const { pathname, category, brand } = useSearchMeta(asPath)

  const toggleSorts = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(!open)
  }

  useEffect(() => {
    const handleClosest = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest('#sort-btn-dropdown'))
        setOpen(false)
    }
    window.addEventListener('click', (e) => handleClosest(e))
    return () => {
      window.addEventListener('click', (e) => handleClosest(e))
    }
  }, [])

  return (
    <div className={cn('relative', className)}>
      <button
        className="flex items-center"
        onClick={toggleSorts}
        id="sort-btn-dropdown"
      >
        <span className="text-brown text-nav uppercase">sort by</span>
        <img
          src="/downwards.svg"
          alt="downwards icon"
          className={cn('ml-[6px] transition-all', {
            ['rotate-180']: open === true,
          })}
        />
      </button>
      <div
        className={cn(
          'absolute left-0 z-10 shadow-xl overflow-hidden transition-all duration-150',
          {
            ['max-h-0']: open === false,
            ['max-h-[500px] ']: open === true,
          }
        )}
      >
        <ul>
          <li
            className={cn('block text-sm leading-5 text-accent-4', {
              underline: !sort,
            })}
          >
            <Link href={{ pathname, query: filterQuery({ q }) }}>
              <a
                onClick={(e) => handleClick(e, 'sort')}
                className={'inline-block px-4 py-2 '}
              >
                Relevance
              </a>
            </Link>
          </li>
          {Object.entries(SORT).map(([key, text]) => (
            <li
              key={key}
              className={cn('block text-sm leading-5 text-accent-4  ', {
                underline: sort === key,
              })}
            >
              <Link
                href={{
                  pathname,
                  query: filterQuery({ q, sort: key }),
                }}
              >
                <a
                  onClick={(e) => handleClick(e, 'sort')}
                  className={'block  px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'}
                >
                  {text}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default memo(Sort)
