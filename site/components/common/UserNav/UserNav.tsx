import cn from 'clsx'
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
import type { LineItem } from '@commerce/types/cart'
import TwoLine from '@components/icon/TwoLine'

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: React.FC<{
  className?: string
  embeded?: string
  noCart?: boolean
}> = ({ className, embeded, noCart }) => {
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
                  Component="a"
                  aria-label="Menu"
                  variant="naked"
                  className={cn(s.item, s.bottomLine)}
                  onClick={() => (isCustomerLoggedIn ? null : openModal())}
                >
                  Account
                </Buttons>
              </DropdownTrigger>
              <CustomerMenuContent />
            </Dropdown>
          </li>
        )}

        {process.env.COMMERCE_CART_ENABLED && !noCart && (
          <li className={s.item}>
            <Buttons
              className={cn(s.item, s.bottomLine)}
              style={{ left: '-20px' }}
              variant="naked"
              onClick={() => {
                setSidebarView('CART_VIEW')
                toggleSidebar()
              }}
              aria-label={`Cart items: ${itemsCount}`}
            >
              Cart
              {itemsCount > 0 && (
                <span className={s.bagCount}>{itemsCount}</span>
              )}
            </Buttons>
          </li>
        )}
        {embeded !== 'sidebar' && (
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
              <TwoLine />
            </Buttons>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default UserNav
