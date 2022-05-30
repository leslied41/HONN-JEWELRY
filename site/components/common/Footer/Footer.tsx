import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
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
  //pages from props is the pages created by user on shopify  and passed here to show them on footer.
  //but for this project, we would not embed these pages in this website and we will create new pages instead.
  //therefore, these pages would be unuseful.

  //by using clsx, now you can combine classname from
  //.module.css with global css classname.
  return (
    <footer className={s.root}>
      <div className="grid grid-cols-12 p-10 gap-x-20 gap-y-12">
        <div className="col-span-2">
          <div>
            <ul>
              <li>
                <Link href="/">Contact us</Link>
              </li>
              <li>Birger Jarlsgatan 23 111 45 Stockholm +45 555324 1</li>
              <li>
                <Link href="/">Book an appointment</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-2">
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
        <div className="col-span-2">
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
        <div className="col-span-6">
          <div className="flex">
            <input
              type="email"
              placeholder="Email Address"
              className="outline-none bg-inherit placeholder-gold border-b border-brown pb-2 w-full"
            />
            <button className="border-b border-brown pb-2"> Subscribe</button>
          </div>
        </div>
        <div className="col-span-6">
          <div>
            <p>
              Currency: <span>GBP £</span>
            </p>
          </div>
        </div>
        <div className="col-span-6 justify-self-end">
          <div>
            <ul className="flex gap-x-10">
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
