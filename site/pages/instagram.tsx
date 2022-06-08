import React from 'react'
import { GetServerSideProps } from 'next'
import {
  getStartAndToken,
  getData,
  update,
} from '../lib/utilities/ins-accesskey-funcs'

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

  //start excuting from here.
  let { start, access_key } = await getStartAndToken()
  const data = await getData(access_key)

  if (Date.now() - start > 2592000000) {
    start = Date.now()
    update(start, access_key)
  }

  if (!data) {
    start = Date.now()
    update(start, access_key)
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
