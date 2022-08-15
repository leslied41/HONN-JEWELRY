import React, { FC, useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import s from './RequestItem.module.css'
import { Item } from './request'
import Quantity from './Quantity'

interface Props {
  item: Item
  removeItem: (id: string) => void
  setItems: React.Dispatch<React.SetStateAction<Item[] | null>>
}

const RequestItem: FC<Props> = ({ item, removeItem, setItems, ...rest }) => {
  const [updateQuantity, setUpdateQuantity] = useState(false)
  const quantityRef = useRef<number>(item.quantity)

  const requestId = useMemo(
    () =>
      item.customAttributes.find((item) => item.key === 'request id')?.value,
    [item]
  )

  const calculatePrice = (quantity: number, price: number) => {
    return quantity * price
  }
  const updateLocalStorage = (id: string, quantity: number) => {
    const items = JSON.parse(localStorage.getItem('request')!)
    const updatedItems = items.map((item: Item) => {
      if (
        item.customAttributes.find((item) => item.key === 'request id')
          ?.value === id
      ) {
        item.quantity = quantity
      }
      return item
    })
    setItems(updatedItems)
  }
  const handleRemove = useMemo(
    () => (id: string) => {
      removeItem(id)
    },
    [removeItem]
  )
  const handleIncrease = useMemo(
    () => (id: string) => {
      quantityRef.current = quantityRef.current + 1
      updateLocalStorage(id, quantityRef.current)
      setUpdateQuantity(!updateQuantity)
    },
    [updateQuantity]
  )
  const handleDecrease = useMemo(
    () => (id: string) => {
      quantityRef.current = quantityRef.current - 1
      updateLocalStorage(id, quantityRef.current)
      setUpdateQuantity(!updateQuantity)
    },
    [updateQuantity]
  )
  return (
    <li className="flex flex-col py-4" {...rest}>
      <div className="flex gap-x-4">
        <div className="w-[92px] h-[128px] bg-brown relative overflow-hidden cursor-pointer z-0 flex-shrink-0">
          <Link href={`/product${item.path}`}>
            <a>
              <Image
                className={s.productImage}
                width={92}
                height={128}
                objectFit="cover"
                src={item.image}
                alt={item.variant?.name}
                unoptimized
              />
            </a>
          </Link>
        </div>
        <div className="flex-1 flex flex-col text-nav justify-between">
          <div className="self-start flex flex-col gap-y-2">
            <Link href={`/product${item.path}`}>
              <a>
                <span className={s.productName}>{item.name}</span>
              </a>
            </Link>
            <Quantity
              value={quantityRef.current}
              handleRemove={() => handleRemove(requestId!)}
              handleIncrease={() => handleIncrease(requestId!)}
              handleDecrease={() => handleDecrease(requestId!)}
              svgColor={'#8D5535'}
            />

            <ul>
              {item.customAttributes
                ?.filter((f) => {
                  if (!['request id', 'product id'].includes(f.key)) return f
                })
                .map((field, i) => {
                  if (field.value)
                    return (
                      <li key={i}>
                        {field.key}:{field.value}
                      </li>
                    )
                })}
            </ul>
          </div>

          <div className="flex flex-col justify-between space-y-2 text-nav self-end ">
            <span>
              SEK {calculatePrice(quantityRef.current, item.variant.price)}
            </span>
          </div>
        </div>
      </div>
    </li>
  )
}
export default RequestItem
