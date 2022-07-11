import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import s from './Footer.module.css'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
]

const Footer: FC<Props> = ({}) => {
  return (
    <footer className={s.root}>
      <div className="grid grid-cols-12 px-4 pt-10 pb-4 gap-x-4 text-nav uppercase lg:gap-x-20 md:p-10 gap-y-8 lg:gap-y-12 w-full overflow-hidden">
        <div className="col-span-6 w-full md:col-span-2">
          <ul>
            <li>
              <Link href="/">Contact us</Link>
            </li>
            <li>Birger Jarlsgatan 23 111 45 Stockholm+45 555324 1</li>
            <li>
              <Link href="/">Book an appointment</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-6 w-full md:col-span-2">
          <div>
            <ul>
              <li>
                <Link href="/">Size Guide</Link>
              </li>
              <li>Ring Size Tool</li>
              <li>
                <Link href="/">Lifetime Warranty</Link>
              </li>
              <li>Shipping & Delivery</li>
              <li>B2B</li>
            </ul>
          </div>
        </div>
        <div className="col-span-12 w-full md:col-span-2">
          <div>
            <ul>
              <li>
                <a href="">Facebook</a>
              </li>
              <li>
                <a href="">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-12 w-full md:col-span-6">
          <div className="flex w-full md:justify-end">
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="outline-none bg-inherit placeholder-footer1 border-b border-brown pb-2 max-w-[470px] w-full"
            />
            <button className="border-b border-brown uppercase text-footer1 pb-2 max-w-[60px]">
              Subscribe
            </button>
          </div>
        </div>
        <div className="col-span-6 w-full">
          <div>
            <p>
              Currency: <span>GBP £</span>
            </p>
          </div>
        </div>
        <div className="hidden justify-self-end w-full md:col-span-6 md:block ">
          <div>
            <ul className="flex justify-end gap-x-10 text-tiny text-footer2 capitalize">
              <li>Returns and Exchanges </li>
              <li>Returns and Exchanges</li>
              <li>© HONN</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
