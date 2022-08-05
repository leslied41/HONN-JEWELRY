import React, { FC } from 'react'
import Close from '@components/icon/Close'
import { UserNav } from '@components/common'
import cn from 'clsx'
import s from './SidebarLayout.module.css'
import Link from 'next/link'
import Title from '@components/icon/Title'
import { useViewportWidth } from '@lib/hooks/useViewportWidth'

interface Props {
  children: React.ReactNode
  child?: string
  className?: string
  handleClose?: () => any
  handleBack?: () => any
}

const SidebarLayout: FC<Props> = ({
  children,
  className,
  handleBack, //no hadnleBack passed in this component
  handleClose,
  child,
}) => {
  const viewWidth = useViewportWidth()

  return (
    <div className={cn(s.root, className)}>
      <header
        className={cn(
          s.header,
          'py-4 max-h-[56px] md:px-0 border-b-[0.5px] border-gold md:border-none',
          {
            ['bg-brown mx-0 px-4']: child !== 'SearchSidebar',
            ['bg-gray mx-4 px-0']: child === 'SearchSidebar',
          }
        )}
      >
        {child !== 'SearchSidebar' ? (
          <div className="md:hidden">
            <Link href="/" passHref>
              <Title
                href="/"
                className="cursor-pointer"
                fill="#fff"
                height={viewWidth! > 768 || viewWidth === 768 ? 38 : 22}
                width={viewWidth! > 768 || viewWidth === 768 ? 188 : 111}
              />
            </Link>
          </div>
        ) : (
          <div>
            <button
              onClick={handleClose}
              className="text-brown uppercase text-nav"
            >
              All
            </button>
          </div>
        )}
        <div className="flex w-full md:justify-between justify-end gap-x-7 md:gap-x-0">
          {handleClose && (
            <button
              onClick={handleClose}
              aria-label="Close"
              className="flex items-center focus:outline-none  md:order-1 order-2"
            >
              <Close
                stroke={child === 'SearchSidebar' ? '#8D5535' : '#F7F2EE'}
                height={16}
                width={16}
              />
            </button>
          )}

          <UserNav
            className="text-gray text-nav order-1 md:order-2"
            embeded="sidebar"
            noCart={child === 'SearchSidebar' ? true : false}
          />
        </div>
      </header>
      <div className={s.container}>{children}</div>
    </div>
  )
}

export default SidebarLayout
