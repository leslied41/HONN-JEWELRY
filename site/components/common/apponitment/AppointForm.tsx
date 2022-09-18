import React, { FC, useState, useEffect } from 'react'
// import { DatePickers } from '../../ui/DatePicker'
import s from './AppointForm.module.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import { HandleClickArgs } from '../../request/request'
import cn from 'clsx'

type FormValues = {
  name: string
  phone: string
  email: string
  comment: string
}

interface AppointFormProps {
  handleClick: (data: HandleClickArgs) => void
  time: string
  startDate: Date | null
  setTime: React.Dispatch<React.SetStateAction<string>>
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>
  twilloError: string
  quoteError: string
  error: string
}

export const AppointForm: FC<AppointFormProps> = ({
  handleClick,
  time,
  startDate,
  setTime,
  setStartDate,
  twilloError,
  quoteError,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<FormValues>()
  const [noTime, setNoTime] = useState(false)

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!time) return setNoTime(true)
    setNoTime(false)
    const final_data = { ...data, date: time }
    handleClick(final_data)
    setTime('')
    setStartDate(new Date())
  }
  //this useeffect is to check if the submission is successful and reset form if so.
  useEffect(() => {
    if (!twilloError && !quoteError)
      reset({ name: '', phone: '', email: '', comment: '' })
  }, [quoteError, twilloError])
  return (
    <section>
      <h2 className="text-body-1 text-brown capitalize">Contact information</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full capitalize text-brown text-body-1 mt-2"
      >
        <div>
          <input
            className={cn(s.input, {
              [s.inputError]: errors.name?.type === 'required',
            })}
            aria-label="name"
            type="text"
            placeholder={
              errors.name?.type === 'required' ? 'Name is required' : 'Name'
            }
            {...register('name', { required: true, maxLength: 20 })}
          />
        </div>
        <div>
          <input
            className={cn(s.input, {
              [s.inputError]: errors.phone?.type === 'required',
            })}
            aria-label="phone number"
            type="number"
            placeholder={
              errors.phone?.type === 'required'
                ? 'Please enter your phone number'
                : 'Phone, e.g. +46 8 123456 or 08- 12 34 56'
            }
            {...register('phone', { required: true, maxLength: 20 })}
          />
        </div>
        <div>
          <input
            className={cn(s.input, {
              [s.inputError]: errors.email?.type === 'required',
            })}
            type="email"
            placeholder={
              errors.phone?.type === 'required'
                ? 'Please enter your Email address'
                : 'Email'
            }
            {...register('email', { required: true, maxLength: 20 })}
          />
        </div>
        <div>
          <textarea
            className={cn(s.input, '!h-16', '!mb-6')}
            aria-label="comment"
            placeholder="Please give us some tips before we start."
            {...register('comment', { required: false, maxLength: 500 })}
          />
        </div>
        <input
          type="submit"
          value="Submit"
          aria-label="submit"
          className="cursor-pointer h-12 w-full md:w-80 bg-brown text-gray text-body-2 uppercase transition ease-in-out duration-150
          shadow-sm hover:border-accent-9 hover:bg-accent-6 focus:shadow-outline-normal focus:outline-none"
        />
        {noTime && <p>Please choose a time slot</p>}
        {error === 'no request items' && <p>Please add request items</p>}
        {(twilloError === 'error' || quoteError === 'error') && (
          <p>somethig goes wrong...</p>
        )}
        {twilloError === 'wrong number' && (
          <p>Phone number format is not right</p>
        )}
        {!twilloError && !quoteError && (
          <p>Thank you for the quote, we will contact to you very soon.</p>
        )}
      </form>
    </section>
  )
}
export default AppointForm
