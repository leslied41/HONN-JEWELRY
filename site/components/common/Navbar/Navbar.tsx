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
    <Container clean className="mx-auto max-w-8xl px-6">
      <div className={s.nav}>
        <div className="flex items-center flex-1">
          {/* <Link href="/">
            <a className={s.logo} aria-label="Logo">
              <Logo />
            </a>
          </Link> */}
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
            {/* {links?.map((l) => (
              <Link href={l.href} key={l.href}>
                <a className={s.link}>{l.label}</a>
              </Link>
            ))} */}
          </nav>
        </div>
        <div>HONN</div>
        {/* flex:1; means flex: 1 1 0; flex-grow:1;flex-shrink:1; flex-basis:0; flex-basis means that the initial width
            of this item. If it is 0, there will be no initial width. And its width will depend on its content.  */}
        {/* {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar />
          </div>
        )} */}
        <div className="flex items-center justify-end flex-1 space-x-8">
          <UserNav />
        </div>
      </div>
      {process.env.COMMERCE_SEARCH_ENABLED && (
        <div className="flex pb-4 lg:px-6 lg:hidden">
          <Searchbar id="mobile-search" />
        </div>
      )}
    </Container>
  </NavbarRoot>
)

export default Navbar
