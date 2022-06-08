import React from 'react'
const axios = require('axios').default

const getStartAndToken = async () => {
  const res = await fetch(`${process.env.FETCH_START_AND_TOKEN_URL}/ig/get`)
  const data = await res.json()
  return {
    start: data.ig_obj[0].start_time,
    access_key: data.ig_obj[0].access_key,
  }
}
const update = async (time: Number, access_key: any) => {
  const id = '1653136746962' //this id is used to identify the {start_time,access_token} in mangodb.
  //code refresh token here
  const new_access_key = await refreshToken(access_key)
  //update the access_keu and start_time in mangodb.
  axios
    .patch(`${process.env.FETCH_START_AND_TOKEN_URL}/ig/update/${id}`, {
      start_time: time,
      access_key: new_access_key,
    })
    .then((res: any) => {
      //console.log(res)
    })
    .catch((err: any) => console.log(err))
}
const refreshToken = async (access_key: any) => {
  const response: any = await fetch(
    `${process.env.IG_REFRESH_TOKEN_URL}${access_key}`
  )
  const long_live_obj = await response.json()
  const { access_token, expires_in } = long_live_obj
  return access_token
}
const getData = async (access_key: any) => {
  const raw_data = await fetch(`${process.env.IG_FETCH_DATA_URL}${access_key}`)
  const processed_data = await raw_data.json()
  const data = processed_data.data
  return data
}

export { getStartAndToken, update, getData }
//the reason why refreshToken dose not need to be exported is that it is only needed by update function.
