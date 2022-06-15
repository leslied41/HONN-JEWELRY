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
  stoneColorLevel: string
  stoneClarity: string
  stoneCut: string
  textStyle: string
  setShape?: (shape: string) => void
  setColor?: (color: string) => void
  setBand?: (band: string) => void
  setMosaic?: (mosaic: string) => void
  setStoneColorLevel?: (stoneColorLevel: string) => void
  setStoneClarity?: (stoneClarity: string) => void
  setStoneCut?: (stoneCut: string) => void
  setTextStyle?: (textStyle: string) => void
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
  stoneColorLevel: '',
  stoneClarity: '',
  stoneCut: '',
  textStyle: '',
}
const ProductContext = createContext<ProductContextType>(defaultContextValue)
//this type of defaultContextValue sholud be same as value in provider and ProductContextType.

//useReducer
const initialState = {
  shape: '',
  color: '',
  band: '',
  mosaic: '',
  stoneColorLevel: '1',
  stoneClarity: '',
  stoneCut: '',
  textStyle: '',
}
enum ActionType {
  SHAPE = 'SHAPE',
  COLOR = 'COLOR',
  BAND = 'BAND',
  MOSAIC = 'MOSAIC',
  STONECOLORLEVEL = 'STONECOLORLEVEL',
  STONECLARITY = 'STONECLARITY',
  STONECUT = 'STONECUT',
  TEXTSTYLE = 'TEXTSTYLE',
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
  stoneColorLevel: string
  stoneClarity: string
  stoneCut: string
  textStyle: string
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
    case ActionType.STONECOLORLEVEL:
      return { ...state, stoneColorLevel: action.payload }
    case ActionType.STONECLARITY:
      return { ...state, stoneClarity: action.payload }
    case ActionType.STONECUT:
      return { ...state, stoneCut: action.payload }
    case ActionType.TEXTSTYLE:
      return { ...state, textStyle: action.payload }
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
  const setStoneColorLevel = useCallback(
    (stoneColorLevel: string) =>
      dispatch({ type: ActionType.STONECOLORLEVEL, payload: stoneColorLevel }),
    [dispatch]
  )
  const setStoneClarity = useCallback(
    (stoneClarity: string) =>
      dispatch({ type: ActionType.STONECLARITY, payload: stoneClarity }),
    [dispatch]
  )
  const setStoneCut = useCallback(
    (stoneCut: string) =>
      dispatch({ type: ActionType.STONECUT, payload: stoneCut }),
    [dispatch]
  )
  const setTextStyle = useCallback(
    (textStyle: string) =>
      dispatch({ type: ActionType.TEXTSTYLE, payload: textStyle }),
    [dispatch]
  )
  const color = useMemo(() => state.color, [state.color])
  const shape = useMemo(() => state.shape, [state.shape])
  const band = useMemo(() => state.band, [state.band])
  const mosaic = useMemo(() => state.mosaic, [state.mosaic])
  const stoneColorLevel = useMemo(
    () => state.stoneColorLevel,
    [state.stoneColorLevel]
  )
  const stoneClarity = useMemo(() => state.stoneClarity, [state.stoneClarity])
  const stoneCut = useMemo(() => state.stoneCut, [state.stoneCut])
  const textStyle = useMemo(() => state.textStyle, [state.textStyle])

  const value = useMemo(
    () => ({
      product,
      allProducts,
      color,
      shape,
      band,
      mosaic,
      stoneColorLevel,
      stoneClarity,
      stoneCut,
      textStyle,
      setShape,
      setColor,
      setBand,
      setMosaic,
      setStoneColorLevel,
      setStoneClarity,
      setStoneCut,
      setTextStyle,
    }),
    [
      product,
      allProducts,
      shape,
      color,
      mosaic,
      band,
      stoneColorLevel,
      stoneClarity,
      stoneCut,
      textStyle,
      setShape,
      setColor,
      setBand,
      setMosaic,
      setStoneColorLevel,
      setStoneClarity,
      setStoneCut,
      setTextStyle,
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
