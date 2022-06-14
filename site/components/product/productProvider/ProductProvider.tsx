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
  setShape?: (shape: string) => void
  setColor?: (color: string) => void
  setBand?: (band: string) => void
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
}
const ProductContext = createContext<ProductContextType>(defaultContextValue)
//this type of defaultContextValue sholud be same as value in provider and ProductContextType.

//useReducer
const initialState = {
  shape: '',
  color: '',
  band: '',
}
enum ActionType {
  SHAPE = 'SHAPE',
  COLOR = 'COLOR',
  BAND = 'BAND',
}
type Action = {
  type: ActionType
  payload?: any
}
type StateType = {
  color: string
  shape: string
  band: string
}

const reducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case ActionType.COLOR:
      return { ...state, color: action.payload }

    case ActionType.SHAPE:
      return { ...state, shape: action.payload }

    case ActionType.BAND:
      return { ...state, band: action.payload }
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
  const color = useMemo(() => state.color, [state.color])
  const shape = useMemo(() => state.shape, [state.shape])
  const band = useMemo(() => state.band, [state.band])

  const value = useMemo(
    () => ({
      product,
      allProducts,
      color,
      shape,
      band,
      setShape,
      setColor,
      setBand,
    }),
    [product, allProducts, shape, color, setShape, setColor, band, setBand]
  )
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const context = useContext<ProductContextType>(ProductContext)
  return context
}
