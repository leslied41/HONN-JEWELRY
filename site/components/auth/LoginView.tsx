import { FC, useState, useMemo } from 'react'
import { Buttons, Input } from '@components/ui'
import Title from '../icon/Title'
import useLogin from '@framework/auth/use-login'
import { useUI } from '@components/ui/context'
import { validate } from 'email-validator'

const LoginView: React.FC = () => {
  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const { setModalView, closeModal } = useUI()

  const login = useLogin()

  const isDisable = useMemo(() => {
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)
    return dirty
      ? !validate(email) || password.length < 7 || !validPassword
      : false
  }, [email, password, dirty])

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !isDisable) {
      setDirty(true)
    }

    try {
      setLoading(true)
      setMessage('')
      await login({
        email,
        password,
      })
      setLoading(false)
      closeModal()
    } catch (e: any) {
      setMessage(e.errors[0].message)
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">
        <Title fill="white" />
      </div>
      <div className="flex flex-col space-y-3">
        {message && (
          <div className="text-white border border-white p-3">
            {message}. Did you {` `}
            <a
              className="text-accent-9 inline font-bold hover:underline cursor-pointer"
              onClick={() => setModalView('FORGOT_VIEW')}
            >
              forgot your password?
            </a>
          </div>
        )}
        <Input type="email" placeholder="Email" onChange={setEmail} />
        <Input type="password" placeholder="Password" onChange={setPassword} />

        <Buttons
          variant="slim"
          type="submit"
          loading={loading}
          disabled={isDisable}
          className="bg-white text-brown "
        >
          Log In
        </Buttons>
        <div className="pt-1 text-center text-sm">
          <span className="text-accent-7">Don't have an account?</span>
          {` `}
          <a
            className="text-accent-9 font-bold hover:underline cursor-pointer"
            onClick={() => setModalView('SIGNUP_VIEW')}
          >
            Sign Up
          </a>
        </div>
      </div>
    </form>
  )
}

export default LoginView
