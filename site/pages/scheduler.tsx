import React from 'react'
import axios from 'axios'
import { Layout } from '@components/common'
import { Button, Container } from '@components/ui'
import AppointForm from '../components/common/apponitment'

export type HandleClickArgs = {
  name: string
  phone: number
  email: string
  comment: string
  date: string
}

const Scheduler = () => {
  const handleClick = (data: HandleClickArgs): void => {
    const sms_info = {
      name: data.name,
      email: data.email,
      date: data.date,
      comment: data.comment,
      customer_number: `+${data.phone.toString()}`,
    }

    axios
      .post(`http://localhost:3000/api/twilio`, sms_info)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <Container className="bg-white min-h-screen text-emerald-900">
      <header>
        <p className="text-center  text-3xl pt-7  border-b-2 ">
          Scheduling an Appointment
        </p>
      </header>
      <section className=" w-8/12 mx-auto">
        <p>Digital meetings</p>
        <div>
          <AppointForm handleClick={handleClick} />
        </div>
      </section>
    </Container>
  )
}
Scheduler.Layout = Layout

export default Scheduler
