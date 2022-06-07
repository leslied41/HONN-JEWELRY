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
  state: StateType
  setShape?: (shape: string) => void
  setColor?: (color: string) => void
}
interface Props {
  product: Product
  allProducts: Product[]
  children?: any
}
const defaultContextValue = {
  product: {} as Product,
  allProducts: [] as Product[],
  state: {} as StateType,
}
const ProductContext = createContext<ProductContextType>(defaultContextValue)
//this type of defaultContextValue sholud be same as value in provider and ProductContextType.

//useReducer
const initialState = {
  shape: '',
  color: '',
}
enum ActionType {
  SHAPE = 'SHAPE',
  COLOR = 'COLOR',
}
type Action = {
  type: ActionType
  payload?: any
}
type StateType = {
  color: string
  shape: string
}

const reducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case ActionType.COLOR:
      return { ...state, color: action.payload }

    case ActionType.SHAPE:
      return { ...state, shape: action.payload }
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
  const value = useMemo(
    () => ({
      product,
      allProducts,
      state,
      setShape,
      setColor,
    }),
    [product, allProducts, state, setShape, setColor]
  )
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const context = useContext<ProductContextType>(ProductContext)
  return context
}
