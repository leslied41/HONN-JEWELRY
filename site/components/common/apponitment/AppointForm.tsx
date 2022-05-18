import React, { FC, useState } from 'react'
import { DatePickers } from '../../ui/DatePicker'
import { useForm, SubmitHandler } from 'react-hook-form'
import s from './AppointForm.module.css'
import { HandleClickArgs } from '../../../pages/scheduler'

type FormValues = {
  name: string
  phone: number
  email: string
  comment: string
}

interface AppointFormProps {
  handleClick: (data: HandleClickArgs) => void
}

export const AppointForm: FC<AppointFormProps> = ({ handleClick }) => {
  const { register, handleSubmit } = useForm<FormValues>()
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [time, setTime] = useState<string>('')

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
          <DatePickers
            time={time}
            setTime={setTime}
            startDate={startDate}
            setStartDate={setStartDate}
          />
        </div>
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
        <div className={s.submit_btn_div}>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}
export default AppointForm
