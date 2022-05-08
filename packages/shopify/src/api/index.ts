import {
  CommerceAPI,
  CommerceAPIConfig,
  getCommerceApi as commerceApi,
} from '@vercel/commerce/api'
//this commerse/api is universal for all the cms providers.
import {
  API_URL,
  API_TOKEN,
  SHOPIFY_CUSTOMER_TOKEN_COOKIE,
  SHOPIFY_CHECKOUT_ID_COOKIE,
} from '../const'

//all the API_URL...are stored in the ../const file and inside this file using env to connect your shopify.

import fetchGraphqlApi from './utils/fetch-graphql-api'
//this is the function to use graphql to get data from shopify.

import * as operations from './operations'
//this is to import all the functions that fetch  the different kinds of data.

if (!API_URL) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is missing and it's required to access your store`
  )
}

if (!API_TOKEN) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is missing and it's required to access your store`
  )
}
export interface ShopifyConfig extends CommerceAPIConfig {}

const ONE_DAY = 60 * 60 * 24

const config: ShopifyConfig = {
  commerceUrl: API_URL,
  apiToken: API_TOKEN,
  customerCookie: SHOPIFY_CUSTOMER_TOKEN_COOKIE,
  cartCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: fetchGraphqlApi,
}

export const provider = {
  config,
  operations, //this contains all the function to fetch data.
}

export type Provider = typeof provider

export type ShopifyAPI<P extends Provider = Provider> = CommerceAPI<P>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any //customProvider's type is P and default value is provider whose type is any.
): ShopifyAPI<P> {
  return commerceApi(customProvider)
} //and this function will return commerceApi(customProvider) that is commerceApi(proivder).
//And as provider includes confing and operations. So all the functions that fetch data can be generated.
