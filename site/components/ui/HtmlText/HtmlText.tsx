import React, { FC, ReactNode } from 'react'
import s from './HtmlText.module.css'
import cn from 'clsx'

interface Props {
  html: string
  className?: string
  children?: ReactNode | any
}

const HtmlText: FC<Props> = ({ html = '', className = '', children }) => {
  const htmlContent = (html: string) => {
    return { __html: html }
  }
  return (
    <div
      className={cn(s.root, className)}
      dangerouslySetInnerHTML={htmlContent(html)}
    >
      {children}
    </div>
  )
}
export default HtmlText
