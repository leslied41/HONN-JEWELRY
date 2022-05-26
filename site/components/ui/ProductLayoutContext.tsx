import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from 'react'

type ProducLayoutType = {
  shape: string
  color: string
  products: any
}

enum ActionType {
  SHAPE = 'SHAPE',
  COLOR = 'COLOR',
  PRODUCTS = 'PRODUCTS',
}
type Action = {
  type: ActionType
  payload?: any
}
const initialState = {
  shape: '',
  color: '',
  products: [],
}
export const ProductLayoutContext = createContext<ProducLayoutType | any>(
  initialState
)
const productLayoutReducer = (state: ProducLayoutType, action: Action) => {
  switch (action.type) {
    case ActionType.SHAPE:
      return {
        ...state,
        shape: action.payload,
      }
    case ActionType.COLOR:
      return {
        ...state,
        color: action.payload,
      }
    case ActionType.PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
  }
}

export const ProductLayoutProvider: React.FC<React.ReactNode> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(productLayoutReducer, initialState)
  const setShape = useCallback(
    (shape) => dispatch({ type: ActionType.SHAPE, payload: shape }),
    [dispatch]
  )
  const setColor = useCallback(
    (color) => dispatch({ type: ActionType.COLOR, payload: color }),
    [dispatch]
  )
  const setProducts = useCallback(
    (products) => dispatch({ type: ActionType.PRODUCTS, payload: products }),
    [dispatch]
  )
  const value = useMemo(
    () => ({ ...state, setColor, setShape, setProducts }),
    [state]
  )
  return (
    <ProductLayoutContext.Provider value={value}>
      {children}
    </ProductLayoutContext.Provider>
  )
}

export const useGlobalContext = () => useContext(ProductLayoutContext)
