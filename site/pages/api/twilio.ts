import { NextApiRequest, NextApiResponse } from 'next'
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER
const client = require('twilio')(accountSid, authToken)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log('user booking request')
    const { name, email, comment, date, customer_number } = req.body
    const content = `Customer Name: ${name}, Email: ${email} is making an appointment on ${date}. Comment: ${comment} `
    return client.messages
      .create({
        body: content,
        from: twilioPhoneNumber,
        to: customer_number,
      })
      .then((message: any) => res.send(`you have send this sms ${message.sid}`))
      .catch((err: any) => console.log(err))
  }
}

export default handler
