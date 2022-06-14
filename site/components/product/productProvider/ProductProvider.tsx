import React, {
  FC,
  createContext,
  useMemo,
  useCallback,
  useContext,
  useReducer,
} from 'react'
import type { Product } from '@commerce/types/product'

type ProductContextType = {
  product: Product
  allProducts: Product[]
  color: string
  shape: string
  band: string
  mosaic: string
  setShape?: (shape: string) => void
  setColor?: (color: string) => void
  setBand?: (band: string) => void
  setMosaic?: (band: string) => void
}
interface Props {
  product: Product
  allProducts: Product[]
  children?: any
}
const defaultContextValue = {
  product: {} as Product,
  allProducts: [] as Product[],
  color: '',
  shape: '',
  band: '',
  mosaic: '',
}
const ProductContext = createContext<ProductContextType>(defaultContextValue)
//this type of defaultContextValue sholud be same as value in provider and ProductContextType.

//useReducer
const initialState = {
  shape: '',
  color: '',
  band: '',
  mosaic: '',
}
enum ActionType {
  SHAPE = 'SHAPE',
  COLOR = 'COLOR',
  BAND = 'BAND',
  MOSAIC = 'MOSAIC',
}
type Action = {
  type: ActionType
  payload?: any
}
type StateType = {
  color: string
  shape: string
  band: string
  mosaic: string
}

const reducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case ActionType.COLOR:
      return { ...state, color: action.payload }

    case ActionType.SHAPE:
      return { ...state, shape: action.payload }

    case ActionType.BAND:
      return { ...state, band: action.payload }

    case ActionType.MOSAIC:
      return { ...state, mosaic: action.payload }
  }
}

export const ProductProvider: FC<Props> = ({
  product,
  allProducts,
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const setShape = useCallback(
    (shape: string) => dispatch({ type: ActionType.SHAPE, payload: shape }),
    [dispatch]
  )
  const setColor = useCallback(
    (color: string) => dispatch({ type: ActionType.COLOR, payload: color }),
    [dispatch]
  )
  const setBand = useCallback(
    (band: string) => dispatch({ type: ActionType.BAND, payload: band }),
    [dispatch]
  )
  const setMosaic = useCallback(
    (mosaic: string) => dispatch({ type: ActionType.MOSAIC, payload: mosaic }),
    [dispatch]
  )
  const color = useMemo(() => state.color, [state.color])
  const shape = useMemo(() => state.shape, [state.shape])
  const band = useMemo(() => state.band, [state.band])
  const mosaic = useMemo(() => state.mosaic, [state.mosaic])

  const value = useMemo(
    () => ({
      product,
      allProducts,
      color,
      shape,
      band,
      mosaic,
      setShape,
      setColor,
      setBand,
      setMosaic,
    }),
    [
      product,
      allProducts,
      shape,
      color,
      mosaic,
      setShape,
      setColor,
      band,
      setBand,
      setMosaic,
    ]
  )
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const context = useContext<ProductContextType>(ProductContext)
  return context
}
