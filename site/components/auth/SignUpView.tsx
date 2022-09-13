import { FC, useState, useMemo } from 'react'
import { validate } from 'email-validator'
import { Info } from '@components/icons'
import { useUI } from '@components/ui/context'
import Title from '../icon/Title'

import { Buttons, Input } from '@components/ui'
import useSignup from '@framework/auth/use-signup'

interface Props {}

const SignUpView: FC<Props> = () => {
  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)

  const signup = useSignup()
  const { setModalView, closeModal } = useUI()

  const isDisable = useMemo(() => {
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)
    return dirty
      ? !validate(email) || password.length < 7 || !validPassword
      : false
  }, [email, password, dirty])

  const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    //at beginning, dirty and disabled are false.
    if (!dirty && !isDisable) {
      setDirty(true)
    }

    try {
      setLoading(true)
      setMessage('')
      await signup({
        email,
        firstName,
        lastName,
        password,
      })
      setLoading(false)
      closeModal()
    } catch ({ errors }) {
      setMessage(errors[0].message)
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSignup}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">
        <Title fill="white" />
      </div>
      <div className="flex flex-col space-y-4">
        {message && (
          <div className="text-white border border-white p-3">{message}</div>
        )}
        <Input placeholder="First Name" onChange={setFirstName} />
        <Input placeholder="Last Name" onChange={setLastName} />
        <Input type="email" placeholder="Email" onChange={setEmail} />
        <Input type="password" placeholder="Password" onChange={setPassword} />
        <span className="text-accent-8">
          <span className="inline-block align-middle ">
            <Info width="15" height="15" />
          </span>{' '}
          <span className="leading-6 text-sm">
            <strong>Info</strong>: Passwords must be longer than 7 chars and
            include numbers.{' '}
          </span>
        </span>
        <div className="pt-2 w-full flex flex-col">
          <Buttons
            variant="slim"
            type="submit"
            loading={loading}
            disabled={isDisable}
            className="bg-white"
          >
            Sign Up
          </Buttons>
        </div>

        <span className="pt-1 text-center text-sm">
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

export default SignUpView
