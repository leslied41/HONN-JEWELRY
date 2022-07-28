import { FC } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import Title from '@components/icon/Title'
import { useViewportWidth } from '@lib/hooks/useViewportWidth'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => {
  const viewWidth = useViewportWidth()
  return (
    <NavbarRoot>
      <Container clean className="mx-auto max-w-8xl px-4 md:px-10  h-full">
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
            <Link href="/" passHref>
              <Title
                href="/"
                className="cursor-pointer"
                height={viewWidth! > 768 || viewWidth === 768 ? 38 : 22}
                width={viewWidth! > 768 || viewWidth === 768 ? 188 : 111}
              />
            </Link>
          </div>
          <div className="flex items-center justify-end flex-1 space-x-8">
            <UserNav className="text-brown text-nav" />
          </div>
        </div>
      </Container>
    </NavbarRoot>
  )
}

export default Navbar
