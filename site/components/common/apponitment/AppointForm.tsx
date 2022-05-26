import React, { FC, useState } from 'react'
import { DatePickers } from '../../ui/DatePicker'
import { useForm, SubmitHandler } from 'react-hook-form'
import s from './AppointForm.module.css'
import { HandleClickArgs } from '../../request'

type FormValues = {
  name: string
  phone: number
  email: string
  comment: string
}

interface AppointFormProps {
  handleClick: (data: HandleClickArgs) => void
  time: string
  startDate: Date | null
}

export const AppointForm: FC<AppointFormProps> = ({ handleClick, time, startDate }) => {
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!time) return
    let dateTime = startDate!.toString().split(' ')
    dateTime.splice(4, 1, time)
    let final_dateTime = dateTime.join(' ')
    const final_data = { ...data, date: final_dateTime }
    handleClick(final_data)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div>
          <input
            type="text"
            placeholder="Name"
            {...register('name', { required: true, maxLength: 20 })}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Phone, e.g. +46 8 123456 or 08- 12 34 56"
            {...register('phone', { required: false, maxLength: 20 })}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: false, maxLength: 20 })}
          />
        </div>
        <div>
          <textarea
            placeholder="Please give us some tips before we start."
            {...register('comment', { required: false, maxLength: 500 })}
          />
        </div>
        <input type="submit" value="Submit" className={s.submit_btn_div}/>
      </form>
    </div>
  )
}
export default AppointForm
