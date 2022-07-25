import React, { FC } from 'react'
import cn from 'clsx'
import { useRouter } from 'next/router'
import type { Product } from '@commerce/types/product'
import Link from 'next/link'

interface Props {
  className?: string
  product?: Product
}

const CurrentPath: FC<Props> = ({ className, product }) => {
  const router = useRouter()
  const path = router.asPath
  const pathArray: string[] = path.split('/').filter((i) => i)
  const agentPathArray = [...pathArray]
  const linkArray: string[] = ['']
  let linkString = ''

  return (
    <div className={cn(className)}>
      <p className="pt-4">
        <Link href="/">
          <span className="uppercase text-nav text-darkGray cursor-pointer">
            Home /
          </span>
        </Link>
        {pathArray.map((i, index) => {
          const shifted = agentPathArray.shift()
          if (!shifted) return
          linkArray.push(shifted)
          linkString = linkArray.join('/')
          return (
            <Link href={linkString} key={index}>
              {i === 'product' ? ( //filter out product, as there is no this page.
                <></>
              ) : (
                <span className="uppercase text-nav text-darkGray cursor-pointer">
                  {' '}
                  {i === 'search' ? 'shop all' : i} /
                </span>
              )}
            </Link>
          )
        })}
        {product && (
          <span className="uppercase text-nav text-darkGray opacity-50">
            {' '}
            {product.name}
          </span>
        )}
      </p>
    </div>
  )
}
export default CurrentPath
