import { FC, useEffect, useState, useCallback, useMemo } from 'react'
import { validate } from 'email-validator'
import { useUI } from '@components/ui/context'
import Title from '../icon/Title'
import { Buttons, Input } from '@components/ui'

interface Props {}

const ForgotPassword: FC<Props> = () => {
  // Form State
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)

  const { setModalView, closeModal } = useUI()

  const isDisable = useMemo(() => {
    return dirty ? !validate(email) : false
  }, [email, dirty])

  const handleResetPassword = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !isDisable) {
      setDirty(true)
    }
  }

  return (
    <form
      onSubmit={handleResetPassword}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">
        <Title fill="white" />
      </div>
      <div className="flex flex-col space-y-4">
        {message && (
          <div className="text-red border border-red p-3">{message}</div>
        )}

        <Input placeholder="Email" onChange={setEmail} type="email" />
        <div className="pt-2 w-full flex flex-col">
          <Buttons
            variant="slim"
            type="submit"
            loading={loading}
            disabled={isDisable}
            className="bg-white text-brown "
          >
            Recover Password
          </Buttons>
        </div>

        <span className="pt-3 text-center text-sm">
          <span className="text-accent-7">Do you have an account?</span>
          {` `}
          <a
            className="text-accent-9 font-bold hover:underline cursor-pointer"
            onClick={() => setModalView('LOGIN_VIEW')}
          >
            Log In
          </a>
        </span>
      </div>
    </form>
  )
}

export default ForgotPassword
