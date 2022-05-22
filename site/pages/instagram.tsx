import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'

const axios = require('axios').default

interface Props {
  data: {
    media_url?: string
    id: string
    caption?: string
  }[]
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  ) //this is used to cache dynamic response.

  const getStartAndToken = async () => {
    const res = await fetch(`${process.env.FETCH_START_AND_TOKEN_URL}/ig/get`)
    const data = await res.json()
    return {
      start: data.ig_obj[0].start_time,
      access_key: data.ig_obj[0].access_key,
    }
  }
  const update = async (time: Number) => {
    const id = '1653136746962' //this id is used to identify the {start_time,access_token} in mangodb.
    //code refresh token here
    const access_key = await refreshToken()
    //update the access_keu and start_time in mangodb.
    axios
      .patch(`${process.env.FETCH_START_AND_TOKEN_URL}/ig/update/${id}`, {
        start_time: time,
        access_key: access_key,
      })
      .then((res: any) => {
        //console.log(res)
      })
      .catch((err: any) => console.log(err))
  }
  const refreshToken = async () => {
    const response: any = await fetch(
      `${process.env.IG_REFRESH_TOKEN_URL}${access_key}`
    )
    const long_live_obj = await response.json()
    const { access_token, expires_in } = long_live_obj
    return access_token
  }
  const getData = async () => {
    const raw_data = await fetch(
      `${process.env.IG_FETCH_DATA_URL}${access_key}`
    )
    const processed_data = await raw_data.json()
    const data = processed_data.data
    return data
  }
  //execution lines starting from below
  let { start, access_key } = await getStartAndToken()
  const data = await getData()

  if (Date.now() - start > 2592000000) {
    start = Date.now()
    update(start)
  }

  if (!data) {
    start = Date.now()
    update(start)
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}

const Instagram = (props: Props) => {
  const data = props.data
  return (
    <div>
      {data?.map((item) => {
        const { id, media_url, caption } = item
        return <img src={media_url} alt={caption} key={id} />
      })}
    </div>
  )
}
export default Instagram
