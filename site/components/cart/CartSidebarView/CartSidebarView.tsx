import cn from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import s from './CartSidebarView.module.css'
import CartItem from '../CartItem'
import Button from '@components/ui/Buttons/Button'
import { useUI } from '@components/ui/context'
import { Cross, Check } from '@components/icons'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import SidebarLayout from '@components/common/SidebarLayout'

const CartSidebarView: FC = () => {
  const { closeSidebar, setSidebarView } = useUI()
  const { data, isLoading, isEmpty } = useCart()
  //this is to print the cart info including customerId, currecny , lineItems...
  //so the logic is that everytime you click addtocart, it will check if there is an existing lineitem,
  //if no, a new one would be created. If exists, the updated info would be add into this lineitem. if you choose
  //one diffrent product, a new lineitem would be created. now the issue is that, evertime addtocart, metafiled can be
  //added to lineitem, but when cart use hook to get the lineitems info, metafileds data would not be returned. so I need
  //to fix useCart. If we need to display metafield info in cart page, otherwise it would not be necessary.
  //console.log(data)

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )
  const handleClose = () => closeSidebar()
  const goToCheckout = () => setSidebarView('CHECKOUT_VIEW')

  const error = null
  const success = null

  return (
    <SidebarLayout
      className={cn('text-gray', {
        [s.empty]: error || success || isLoading || isEmpty,
      })}
      handleClose={handleClose}
    >
      {isLoading || isEmpty ? (
        <div className="flex-1  flex flex-col justify-between items-center">
          <div className="h-full flex flex-col justify-center">
            <h2 className="text-gray text-nav uppercase  tracking-wide text-center">
              Your cart is empty
            </h2>
          </div>

          <Button
            href="/search"
            width="100%"
            Component="a"
            className="text-brown bg-gray"
          >
            shop now
          </Button>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Thank you for your order.
          </h2>
        </div>
      ) : (
        <>
          <div>
            <div>
              {/* at this phase, no need to show cart */}
              {/* <Link href="/cart">
                <a>
                  <h2 className="text-h2-s" onClick={handleClose}>
                    My Cart
                  </h2>
                </a>
              </Link> */}
              <ul className={s.lineItemsList}>
                {data!.lineItems.map((item: any) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    currencyCode={data!.currency.code}
                  />
                ))}
              </ul>
            </div>

            <div className="w-full  border-t border-[#CAB69E] text-nav mt-4">
              <ul className="pb-2">
                <li className="flex justify-between py-1">
                  <span>Order Value</span>
                  <span>{subTotal}</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>Delivery</span>
                  <span className="tracking-wide">FREE</span>
                </li>
              </ul>
              <div className="flex justify-between border-t border-[#CAB69E] py-3  mb-2">
                <span>Total</span>
                <span>{total}</span>
              </div>
            </div>
          </div>

          <div>
            <Button
              href="/checkout"
              width="100%"
              Component="a"
              className="text-brown bg-gray"
            >
              Check out
            </Button>
          </div>
        </>
      )}
    </SidebarLayout>
  )
}

export default CartSidebarView
