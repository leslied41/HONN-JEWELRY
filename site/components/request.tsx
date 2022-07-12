import React, { useState } from 'react'
const axios = require('axios').default
import { Button, Text, Container } from '@components/ui'
import AppointForm from '../components/common/apponitment'
import { DatePickers } from '../components/ui/DatePicker'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import { Bag, Cross, Check, MapPin, CreditCard } from '@components/icons'
import { CartItem } from '@components/cart'
import { useUI } from '@components/ui/context'

export type HandleClickArgs = {
  name: string
  phone: number
  email: string
  comment: string
  date: string
}

const Request = ({
  available_time,
}: {
  available_time: string[] | undefined
}) => {
  const error = null
  const success = null
  const { data, isLoading, isEmpty } = useCart()
  const { openSidebar, setSidebarView } = useUI()

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

  const goToCheckout = () => {
    openSidebar()
    setSidebarView('CHECKOUT_VIEW')
  }

  const handleClick = (quote_data: HandleClickArgs): void => {
    const sms_info = {
      name: quote_data.name,
      email: quote_data.email,
      date: quote_data.date,
      comment: quote_data.comment,
      customer_number: `+${quote_data.phone.toString()}`,
    }

    const quote_info = {
      shop: 'honn-jewelry.myshopify.com',
      locale: 'sv',
      api_secret: 'b5f9bc52f3246601cdb9b4b210dcfb01',
      line_items: data?.lineItems,
      additional_data: {
        name: quote_data.name,
        email: quote_data.email,
        message: quote_data.comment,
      },
    }

    console.log(data)

    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    axios
      .post(`http://localhost:3000/api/twilio`, sms_info)
      .then(function (response: any) {
        console.log(response)
      })
      .catch(function (error: any) {
        console.log(error)
      })

    axios
      .post(`https://quote.globosoftware.net/api/quote`, quote_info, config)
      .then(function (response: any) {
        console.log(response)
      })
      .catch(function (error: any) {
        console.log(error)
      })
  }

  const [time, setTime] = useState<string>('')
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  return (
    <Container className="grid lg:grid-cols-12 pt-4 gap-20">
      <div className="lg:col-span-6">
        {isLoading || isEmpty ? (
          <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
            <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
              <Bag className="absolute" />
            </span>
            <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
              Your cart is empty
            </h2>
            <p className="text-accent-6 px-10 text-center pt-2">
              Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
            </p>
          </div>
        ) : error ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Cross width={24} height={24} />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              We couldn’t process the purchase. Please check your card
              information and try again.
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
          <div className="lg:px-0 sm:px-6 flex-1">
            <Text variant="pageHeading">Review your Request List</Text>
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-b border-accent-2">
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data?.currency.code!}
                />
              ))}
            </ul>
          </div>
        )}
        <div className="border-t border-accent-2">
          {/* <ul className="py-3">
            <li className="flex justify-between py-1">
              <span>Subtotal</span>
              <span>{subTotal}</span>
            </li>
          </ul> */}
          <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-10">
            <span>Total</span>
            <span>{total}</span>
          </div>
        </div>
        <AppointForm
          handleClick={handleClick}
          time={time}
          startDate={startDate}
        />
      </div>
      <div className="lg:col-span-6">
        <div className="flex-shrink-0 px-4 sm:px-6">
          <section className="mx-auto">
            <Text variant="pageHeading">Schedule a meeting</Text>
            <DatePickers
              time={time}
              setTime={setTime}
              startDate={startDate}
              setStartDate={setStartDate}
              available_time={available_time}
            />
          </section>
          {/* <div className="flex flex-row justify-end">
            <div className="w-full lg:w-72">
              {isEmpty ? (
                <Button href="/" Component="a" width="100%">
                  Continue Shopping
                </Button>
              ) : (
                <>
                  {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED ? (
                    <Button Component="a" width="100%" onClick={goToCheckout}>
                      Proceed to Checkout ({total})
                    </Button>
                  ) : (
                    <Button href="/checkout" Component="a" width="100%">
                      Proceed to Checkout
                    </Button>
                  )}
                </>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </Container>
  )
}

export default Request
