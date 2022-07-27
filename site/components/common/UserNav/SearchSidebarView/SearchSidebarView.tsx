import { useEffect } from 'react'
import Link from 'next/link'
import s from './SearchSidebarView.module.css'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
import type { Link as LinkProps } from './index'

export default function SearchSidebarView({
  links = [],
  setChildComponent,
}: {
  links?: LinkProps[]
  setChildComponent: (v: string) => void
}) {
  const { closeSidebar } = useUI()
  useEffect(() => {
    setChildComponent('SearchSidebar')
    return () => {
      setChildComponent('')
    }
  }, [])

  return (
    <SidebarLayout handleClose={() => closeSidebar()} child="SearchSidebar">
      <div className={s.root}>
        <nav>
          <ul>
            <li className={s.item} onClick={() => closeSidebar()}>
              <Link href="/search">
                <a>All</a>
              </Link>
            </li>
            {/* {links.map((l: any) => (
              <li
                key={l.href}
                className={s.item}
                onClick={() => closeSidebar()}
              >
                <Link href={l.href}>
                  <a>{l.label}</a>
                </Link>
              </li>
            ))} */}
          </ul>
        </nav>
      </div>
    </SidebarLayout>
  )
}
