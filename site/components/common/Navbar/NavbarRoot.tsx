import { FC, useState, useEffect } from 'react'
import throttle from 'lodash.throttle'
import cn from 'clsx'
import s from './Navbar.module.css'
import { useRouter } from 'next/router'

const NavbarRoot: FC = ({ children }) => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const router = useRouter()
  const className = cn(s.root, {
    [s.bgColorA]: router.pathname === '/',

    'shadow-magical': hasScrolled,
  })
  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement //document.documentElement points to the html
      const scrolled = scrollTop > offset

      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled)
      }
    }, 200)

    document.addEventListener('scroll', handleScroll)
    //windown is global object, the root of everything. document contains dom. screen is the physical display.
    //you can call window.document window.screen or just document, screen.
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])

  return <div className={className}>{children}</div>
}

export default NavbarRoot
