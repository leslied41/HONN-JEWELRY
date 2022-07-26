import React, { FC } from 'react'
import { ChevronLeft } from '@components/icons'
import Close from '@components/icon/Close'
import { UserNav } from '@components/common'
import cn from 'clsx'
import s from './SidebarLayout.module.css'
import Link from 'next/link'
import Title from '@components/icon/Title'

type ComponentProps = { className?: string } & (
  | { handleClose: () => any; handleBack?: never }
  | { handleBack: () => any; handleClose?: never }
)

const SidebarLayout: FC<ComponentProps> = ({
  children,
  className,
  handleBack, //no hadnleBack passed in this component
  handleClose,
}) => {
  return (
    <div className={cn(s.root, className)}>
      <header className={s.header}>
        <div className="md:hidden">
          <Link href="/" passHref>
            <Title href="/" className="cursor-pointer" fill="#fff" />
          </Link>
        </div>
        <div className="flex w-full md:justify-between justify-end gap-x-7 md:gap-x-0">
          {handleClose && (
            <button
              onClick={handleClose}
              aria-label="Close"
              className="flex items-center focus:outline-none mr-6 md:order-1 order-2"
            >
              <Close stroke="#F7F2EE" height={9.5} width={9.5} />
              {/* <span className="ml-2 text-accent-7 text-sm ">Close</span> */}
            </button>
          )}

          {handleBack && (
            <button
              onClick={handleBack}
              aria-label="Go back"
              className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none"
            >
              <ChevronLeft className="h-6 w-6 hover:text-accent-3" />
              <span className="ml-2 text-accent-7 text-xs">Back</span>
            </button>
          )}

          <UserNav
            className="text-gray text-nav order-1 md:order-2"
            embeded="sidebar"
          />
        </div>
      </header>
      <div className={s.container}>{children}</div>
    </div>
  )
}

export default SidebarLayout
