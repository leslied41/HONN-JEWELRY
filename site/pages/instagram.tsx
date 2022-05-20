import React, { useState, useEffect } from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  let token = process.env.IG_LONG_LIVED_ACCESS_TOKEN
  console.log(token)
  //   const response = await fetch(
  //     `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  //   )
  //   const long_live_obj = await response.json()
  //   const { access_token,expires_in } = long_live_obj
  const data = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=${token}`
  )
  const processed_data = await data.json()
  const final_data = processed_data.data
  //if current time > startting time+gap, refresh token and set starting time to current time.
  //如果知道token的expire时间，那么60-expiry就是创建时间，那么现在的时间-创建时间=30天，就refresh。

  return {
    props: { final_data }, // will be passed to the page component as props
  }
}

interface Props {
  final_data: {
    id?: string
    caption?: string
    media_url?: string
  }[]
}

const Instagram = (props: Props) => {
  const data = props.final_data
  return (
    <div>
      {data?.map((i) => {
        const { id, media_url, caption } = i
        return <img src={media_url} alt={caption} key={id} />
      })}
    </div>
  )
}
export default Instagram
