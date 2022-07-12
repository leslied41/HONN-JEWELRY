import cn from 'clsx'
import Link from 'next/link'
import s from './UserNav.module.css'
import useCart from '@framework/cart/use-cart'
import { useUI } from '@components/ui/context'
import CustomerMenuContent from './CustomerMenuContent'
import useCustomer from '@framework/customer/use-customer'
import React from 'react'
import {
  Dropdown,
  DropdownTrigger as DropdownTriggerInst,
  Buttons,
} from '@components/ui'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import type { LineItem } from '@commerce/types/cart'

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: React.FC<{
  className?: string
}> = ({ className }) => {
  const { data } = useCart()
  const { data: isCustomerLoggedIn } = useCustomer()
  const {
    toggleSidebar,
    closeSidebarIfPresent,
    openModal,
    setSidebarView,
    openSidebar,
  } = useUI()

  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0
  const DropdownTrigger = isCustomerLoggedIn
    ? DropdownTriggerInst
    : React.Fragment

  return (
    <nav className={cn(s.root, className)}>
      <ul className={s.list}>
        {process.env.COMMERCE_CUSTOMERAUTH_ENABLED && (
          <li className={cn(s.item, s.account)}>
            <Dropdown>
              <DropdownTrigger>
                <Buttons
                  aria-label="Menu"
                  variant="naked"
                  className={s.item}
                  onClick={() => (isCustomerLoggedIn ? null : openModal())}
                >
                  Account
                </Buttons>
              </DropdownTrigger>
              <CustomerMenuContent />
            </Dropdown>
          </li>
        )}

        {process.env.COMMERCE_CART_ENABLED && (
          <li className={s.item}>
            <Buttons
              className={s.item}
              variant="naked"
              onClick={() => {
                setSidebarView('CART_VIEW')
                toggleSidebar()
              }}
              aria-label={`Cart items: ${itemsCount}`}
            >
              {/* <Bag /> */}
              Cart
              {itemsCount > 0 && (
                <span className={s.bagCount}>{itemsCount}</span>
              )}
            </Buttons>
          </li>
        )}
        <li className={s.mobileMenu}>
          <Buttons
            className={s.item}
            aria-label="Menu"
            variant="naked"
            onClick={() => {
              openSidebar()
              setSidebarView('MOBILE_MENU_VIEW')
            }}
          >
            <DragHandleIcon />
          </Buttons>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
