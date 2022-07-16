import { FC } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => (
  <NavbarRoot>
    <Container clean className="mx-auto max-w-8xl px-4 sm:px-10  h-full">
      <div className={s.nav}>
        <div className="hidden md:flex items-center flex-1  ">
          <nav className={s.navMenu}>
            <Link href="/search">
              <a className={s.link}>SHOP All</a>
            </Link>
            <Link href="/search">
              <a className={s.link}>OUR STORY</a>
            </Link>
            <Link href="/search">
              <a className={s.link}>CUSTOM</a>
            </Link>
          </nav>
        </div>
        <div>
          <Link href="/">
            <img src="/navTitle.svg" alt="title" className="cursor-pointer" />
          </Link>
        </div>
        <div className="flex items-center justify-end flex-1 space-x-8">
          <UserNav />
        </div>
      </div>
    </Container>
  </NavbarRoot>
)

export default Navbar
