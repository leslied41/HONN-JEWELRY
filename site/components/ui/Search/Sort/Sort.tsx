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
import ArrowDown from '@components/icon/ArrowDown'

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
      window.removeEventListener('click', (e) => handleClosest(e))
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
        <ArrowDown
          className={cn('ml-[6px] transition-all', {
            ['rotate-180']: open === true,
          })}
        />
      </button>
      <div
        className={cn(
          'absolute right-0 z-10 w-[100px]  top-[calc(100%+8px)]   overflow-hidden transition-all duration-150 shadow-sm border-solid border-[0.5px] border-gold bg-white',
          {
            ['max-h-0 border-0']: open === false,
            ['max-h-[500px] py-[10px]']: open === true,
          }
        )}
      >
        <ul className="flex flex-col gap-y-2">
          <li
            className={cn(
              'block text-nav text-brown text-right capitalize px-2 hover:text-gold ',
              {
                ['text-gold bg-gray']: !sort,
              }
            )}
          >
            <Link href={{ pathname, query: filterQuery({ q }) }}>
              <a onClick={(e) => handleClick(e, 'sort')} className={'block'}>
                Relevance
              </a>
            </Link>
          </li>
          {Object.entries(SORT).map(([key, text]) => (
            <li
              key={key}
              className={cn(
                'block  text-nav text-brown capitalize text-right px-2 hover:text-gold',
                {
                  ['text-gold bg-gray']: sort === key,
                }
              )}
            >
              <Link
                href={{
                  pathname,
                  query: filterQuery({ q, sort: key }),
                }}
              >
                <a onClick={(e) => handleClick(e, 'sort')} className={'block'}>
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
