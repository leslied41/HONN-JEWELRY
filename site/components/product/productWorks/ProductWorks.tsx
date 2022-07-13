import React, { useState, useRef, useEffect } from 'react'
import s from './ProductWorks.module.css'
import { data } from './data'
import cn from 'clsx'
import useTouchSwipe from '../../../lib/hooks/useTouchSwipe'

interface Props {}

const ProductWorks = (props: Props) => {
  const [renderOnce, setRenderOnce] = useState(false)
  const worksRef = useRef<HTMLDivElement>(null)
  const targetId = useTouchSwipe(worksRef.current, 2)

  useEffect(() => {
    setRenderOnce(true)
  }, [])

  return (
    <div className={s.parent} ref={worksRef}>
      <div className="col-span-1 md:col-span-3">
        <h2 className="text-center text-h2-s uppercase text-gray">
          How it works
        </h2>
      </div>
      {data.map((item) => {
        return (
          <div
            className={cn('col-span-1 mt-[49px] border-gray hidden md:block', {
              ['md:border-r-[0.25px] md:pr-10']: item.id === 0,
              ['md:border-r-[0.25px] md:px-10  md:border-l-[0.25px]']:
                item.id === 1,
              ['md:border-l-[0.25px] md:pl-10']: item.id === 2,
              ['!block']: item.id === targetId,
            })}
            key={item.id}
          >
            <div className="text-center mb-4">
              <img
                src={item.icon}
                alt="group19"
                className="inline-block text-gray"
              />
            </div>
            <p className="text-center mb-4  text-btn">{item.title}</p>
            <p className="text-body-2 ">{item.body}</p>
            <div className="mt-4">
              <a
                href={item.readMore}
                className="border-b-2 text-tiny decoration-gray"
              >
                READ MORE
              </a>
            </div>
          </div>
        )
      })}
      <div className="absolute md:static bottom-[30px] left-1/2 -translate-x-1/2 md:translate-x-0 col-span-1  md:hidden flex justify-center items-center mt-6 ">
        <div className="flex justify-center items-center gap-x-2">
          {data.map((item) => (
            <div
              key={item.id}
              className={cn(
                'h-2 w-2 rounded border-gray border-[1px] border-solid bg-transparent',
                {
                  ['bg-gold border-gold']: item.id === targetId,
                }
              )}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ProductWorks
