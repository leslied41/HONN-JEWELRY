import React, { useState } from 'react'
const axios = require('axios').default
import { Button, Text, Container } from '@components/ui'
import AppointForm from '../components/common/apponitment'
import { DatePickers } from '../components/ui/DatePicker'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import { CartItem } from '@components/cart'
import { CurrentPath } from './common'

export type HandleClickArgs = {
  name: string
  phone: string
  email: string
  comment: string
  date: string
}

const Request = ({
  available_time,
}: {
  available_time: string[] | undefined
}) => {
  const [time, setTime] = useState<string>('')
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  const { data, isLoading, isEmpty } = useCart()

  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )

  const post = (url: string, data: any) => {
    return axios
      .post(url, data)
      .then(function (response: any) {
        console.log(response)
      })
      .catch(function (error: any) {
        console.log(error)
      })
  }

  const handleClick = (quote_data: HandleClickArgs): void => {
    const sms_info = {
      name: quote_data.name,
      email: quote_data.email,
      phone: quote_data.phone,
      date: quote_data.date,
      comment: quote_data.comment,
      customer_number: `+${quote_data.phone.toString()}`,
    }

    const quote_info = {
      shop: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
      locale: 'sv',
      api_secret: process.env.NEXT_PUBLIC_QUOTA_API_SECRET,
      line_items: data?.lineItems,
      additional_data: {
        name: quote_data.name,
        email: quote_data.email,
        message: quote_data.comment,
      },
    }
    post(`http://localhost:3000/api/twilio`, sms_info)
    post(`https://quote.globosoftware.net/api/quote`, quote_info)
  }

  return (
    <Container className="grid md:grid-cols-12 px-0 ">
      <div className="col-span-9 border-r-[0.5px] border-gold">
        <CurrentPath className="h-[56px] sm:h-[75px] pl-10" />
      </div>
      <div className="col-span-3"></div>
      <div className="col-span-12 md:col-span-9 border-r-[0.5px] border-gold px-10 pb-[180px]">
        <div className="mb-12">
          <h2 className="text-brown text-body-1">
            Select a meeting date & Time
          </h2>
          <DatePickers
            className="mt-6"
            setTime={setTime}
            time={time}
            startDate={startDate}
            setStartDate={setStartDate}
            available_time={available_time}
          />
        </div>
        <AppointForm
          handleClick={handleClick}
          time={time}
          startDate={startDate}
          setTime={setTime}
          setStartDate={setStartDate}
        />
      </div>
      <div className="col-span-12 md:col-span-3 px-10 flex flex-col">
        {isLoading || isEmpty ? (
          <div className="  flex  flex-col justify-between items-center mb-6">
            <div className="h-full flex flex-col justify-center items-center">
              <h2 className="text-brown text-nav uppercase  tracking-wide text-center">
                Your list is empty
              </h2>
            </div>
          </div>
        ) : (
          <div className="md:px-0 sm:px-6  text-brown text-nav">
            <h2 className="text-brown text-body-1">Request List</h2>
            <ul className="mt-3 space-y-6  sm:space-y-0 sm:divide-y sm:divide-gold">
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
        <div className="flex  justify-between border-t border-gold pt-4 text-brown text-nav">
          <span>Total</span>
          <span>{total}</span>
        </div>
      </div>
    </Container>
  )
}

export default Request
