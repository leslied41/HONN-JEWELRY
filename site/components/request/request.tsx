import React, { useState, useMemo, useRef, useEffect } from 'react'
const axios = require('axios').default
import { Text, Container } from '@components/ui'
import Button from '@components/ui/Buttons'
import AppointForm from '../common/apponitment'
import { DatePickers } from '../ui/DatePicker'
import { CurrentPath } from '../common'
import isNumeric from '@lib/is-number'
import RequestItem from './RequestItem'

export type HandleClickArgs = {
  name: string
  phone: string
  email: string
  comment: string
  date: string
}
export type Item = {
  customAttributes: {
    key: string
    value: string
  }[]
  image: string
  productId: string
  variant: any
  variantId: string
  path?: string
  name: string
  quantity: number
}

const Request = ({
  available_time,
}: {
  available_time: string[] | undefined
}) => {
  const [time, setTime] = useState<string>('')
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [twilloError, setTwilloError] = useState<string>('pending')
  const [quoteError, setQuoteError] = useState('pending')
  const [error, setError] = useState('')
  const [items, setItems] = useState<Item[] | null>([])
  //as the post request is called inside onclick event, so the controller need to be memroized
  //in ref.
  const twillioControllerRef = useRef<AbortController>(new AbortController())
  const quoteControllerRef = useRef<AbortController>(new AbortController())

  useEffect(() => {
    if (!localStorage.getItem('request')) return
    setItems(JSON.parse(localStorage.getItem('request')!))
  }, [])

  useEffect(() => {
    if (!items) return
    localStorage.setItem('request', JSON.stringify(items))
  }, [items])

  const post = (url: string, data: any, signal: AbortSignal) => {
    return axios
      .post(url, data, { signal: signal })
      .then(function (response: any) {
        console.log(response)
        if (url === 'http://localhost:3000/api/twilio') {
          if (response.status !== 200) return setTwilloError('error')
          if (response.data.status === 400)
            return setTwilloError('wrong number')
          if (response.data.includes('you have send this sms'))
            return setTwilloError('')
        }
        if (url === 'https://quote.globosoftware.net/api/quote') {
          if (response.data.success === true) {
            setQuoteError('')
            localStorage.removeItem('request')
            return
          } else {
            return setQuoteError('error')
          }
        }
      })
      .catch(function (error: any) {
        if (url === 'http://localhost:3000/api/twilio') setTwilloError('error')
        if (url === 'https://quote.globosoftware.net/api/quote')
          setQuoteError('error')
        console.log(error)
      })
  }

  const removeItem = useMemo(
    () => (id: string) => {
      const filteredItems = items?.filter(
        (item) =>
          item.customAttributes.find((item) => item.key === 'request id')
            ?.value !== id
      )
      setItems(filteredItems!)
    },
    [items]
  )

  const getTotal = (items: Item[]) =>
    items.reduce((p, c) => (p = p + c.quantity * c.variant.price), 0)

  const getId = (str: string) => {
    const arr = window.atob(str).split('/')
    const Id = arr[arr.length - 1]
    return Number(Id)
  }

  const customAttributesToMessage = (lineItems: any) => {
    if (!lineItems) return
    return lineItems
      .map((l: any) =>
        l.customAttributes
          .filter((c: any) => c.value)
          ?.map((c: any) => {
            if (c.key === 'product id' && !isNumeric(c.value))
              c.value = getId(c.value!).toString()
            return `${c.key}: ${c.value}`
          })
          .join(', ')
      )
      .join(';     ')
  }

  const customMessages = useMemo(
    () => customAttributesToMessage(items),
    [items]
  )

  const line_items = useMemo(
    () =>
      items?.map((l: any) => {
        return {
          id: isNumeric(
            l.customAttributes?.find((i: any) => i.key === 'product id')?.value!
          )
            ? l.customAttributes?.find((i: any) => i.key === 'product id')
                ?.value!
            : getId(
                l.customAttributes?.find((i: any) => i.key === 'product id')
                  ?.value!
              ),
          variant_id: getId(l.variantId!),
          quantity: l.quantity || 1,
          price: l.variant?.price,
        }
      }),
    [items]
  )

  const handleClick = (quote_data: HandleClickArgs): void => {
    if (!line_items) return setError('no request items')
    const message = customMessages.concat(' Comment: ', quote_data.comment)
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
      line_items: line_items,
      additional_data: {
        name: quote_data.name,
        email: quote_data.email,
        message: message,
      },
    }

    post(
      `http://localhost:3000/api/twilio`,
      sms_info,
      twillioControllerRef.current.signal
    )
    post(
      `https://quote.globosoftware.net/api/quote`,
      quote_info,
      quoteControllerRef.current.signal
    )
  }

  useEffect(() => {
    const twillioController = twillioControllerRef.current
    const quoteController = quoteControllerRef.current

    return () => {
      twillioController.abort()
      quoteController.abort()
    }
  }, [])

  return (
    <Container className="grid md:grid-cols-12 px-0" clean>
      <div className="hidden md:block col-span-8 border-r-[0.5px] border-gold">
        <CurrentPath className="h-[56px] sm:h-[75px] pl-10" />
      </div>
      <div className="hidden md:block col-span-4"></div>
      <div className="col-span-12 mt-12 md:mt-0 order-2 md:col-span-8 md:order-1  sm:border-r-[0.5px] border-gold px-4 md:px-10 pb-12 md:pb-[150px]">
        <div className="mb-12">
          <h1 className="text-brown text-body-1">
            Select a meeting date & Time
          </h1>
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
          twilloError={twilloError}
          quoteError={quoteError}
          error={error}
          handleClick={handleClick}
          time={time}
          startDate={startDate}
          setTime={setTime}
          setStartDate={setStartDate}
        />
      </div>
      <div className="col-span-12 order-1 md:col-span-4 md:order-2 mt-4 md:mt-0 px-4 md:px-10 flex flex-col">
        {!items || items.length === 0 ? (
          <div className="flex  flex-col justify-between items-center mb-6">
            <div className="h-full flex flex-col justify-center items-center mb-6">
              <h2 className="text-brown text-nav uppercase  tracking-wide text-center">
                Your list is empty
              </h2>
            </div>
            <Button
              href="/search"
              width="100%"
              Component="a"
              className="h-12 bg-brown text-white text-nav"
            >
              shop now
            </Button>
          </div>
        ) : (
          <div className="text-brown text-nav">
            <h2 className="text-brown text-body-1">Request List</h2>
            <ul className="mt-3 space-y-0 divide-y divide-gold">
              {items.map((item, index: number) => (
                <RequestItem
                  removeItem={removeItem}
                  key={index}
                  item={item}
                  setItems={setItems}
                />
              ))}
            </ul>
          </div>
        )}
        <div className="flex  justify-between border-t border-gold pt-4 text-brown text-nav">
          <span>Total</span>
          <span>SEK {getTotal(items ? items : [])}</span>
        </div>
      </div>
    </Container>
  )
}

export default Request
