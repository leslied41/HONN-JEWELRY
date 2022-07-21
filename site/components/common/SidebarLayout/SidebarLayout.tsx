import React, { FC } from 'react'
import { ChevronLeft } from '@components/icons'
import Close from '@components/icon/Close'
import { UserNav } from '@components/common'
import cn from 'clsx'
import s from './SidebarLayout.module.css'

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
        {handleClose && (
          <button
            onClick={handleClose}
            aria-label="Close"
            className="flex items-center focus:outline-none mr-6"
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

        <UserNav className="text-gray text-nav" />
      </header>
      <div className={s.container}>{children}</div>
    </div>
  )
}

export default SidebarLayout
