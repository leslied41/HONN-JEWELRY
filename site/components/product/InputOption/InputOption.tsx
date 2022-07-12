import React, { FC, memo } from 'react'
import s from './InputOption.module.css'
import cn from 'clsx'
import { useProductContext } from '../productProvider'
var debounce = require('lodash.debounce')

interface Props {
  className?: string
  setEngraved?: (engraved: string) => void
}

const InputOption: FC<Props> = ({ className }) => {
  const { setEngraved } = useProductContext()
  return <InnerInputOption className={className} setEngraved={setEngraved} />
}

const InnerInputOption: FC<Props> = memo(({ className, setEngraved }) => {
  const debounceFn = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setEngraved?.(e.target.value)
  }, 500)
  return (
    <div className={className}>
      <label htmlFor="input" className="block text-nav uppercase mb-2">
        ENGRAVING TEXT
      </label>
      <input
        type="text"
        name="input"
        className={cn(s.input)}
        placeholder="MAXIMUM 10 CHARACTER"
        onChange={debounceFn}
      />
    </div>
  )
})
InputOption.displayName = 'InputOption'
export default InputOption
