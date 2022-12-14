import React, {
  FC,
  createContext,
  useMemo,
  useCallback,
  useContext,
  useReducer,
} from 'react'

type ProductContextType = {
  metalColor: string
  shape: string
  band: string
  mosaic: string
  stoneColorLevel: string
  stoneClarity: string
  stoneCut: string
  textStyle: string
  littleDiamondColor: string
  size: string
  weight: string
  engraved: string
  setSize?: (size: string) => void
  setShape?: (shape: string) => void
  setMetalColor?: (metalColor: string) => void
  setBand?: (band: string) => void
  setMosaic?: (mosaic: string) => void
  setStoneColorLevel?: (stoneColorLevel: string) => void
  setStoneClarity?: (stoneClarity: string) => void
  setStoneCut?: (stoneCut: string) => void
  setTextStyle?: (textStyle: string) => void
  setLittleDiamondColor?: (littleDiamondColor: string) => void
  setWeight?: (weight: string) => void
  setEngraved?: (weight: string) => void
}
interface Props {
  children?: any
}
const defaultContextValue = {
  metalColor: '',
  shape: '',
  band: '',
  mosaic: '',
  stoneColorLevel: '',
  stoneClarity: '',
  stoneCut: '',
  textStyle: '',
  littleDiamondColor: '',
  size: '',
  weight: '',
  engraved: '',
}
const ProductContext = createContext<ProductContextType>(defaultContextValue)
//this type of defaultContextValue sholud be same as value in provider and ProductContextType.

//useReducer
const initialState = {
  shape: '',
  metalColor: '',
  band: '',
  mosaic: '',
  stoneColorLevel: '',
  stoneClarity: '',
  stoneCut: '',
  textStyle: '',
  littleDiamondColor: '',
  size: '',
  weight: '',
  engraved: '',
}
enum ActionType {
  SHAPE = 'SHAPE',
  METALCOLOR = 'METALCOLOR',
  BAND = 'BAND',
  MOSAIC = 'MOSAIC',
  STONECOLORLEVEL = 'STONECOLORLEVEL',
  STONECLARITY = 'STONECLARITY',
  STONECUT = 'STONECUT',
  TEXTSTYLE = 'TEXTSTYLE',
  LITTLEDIAMONDCOLOR = 'LITTLEDIAMONDCOLOR',
  SIZE = 'SIZE',
  WEIGHT = 'WEIGHT',
  ENGRAVED = 'ENGRAVED',
}
type Action = {
  type: ActionType
  payload?: any
}
type StateType = {
  metalColor: string
  shape: string
  band: string
  mosaic: string
  stoneColorLevel: string
  stoneClarity: string
  stoneCut: string
  textStyle: string
  littleDiamondColor: string
  size: string
  weight: string
  engraved: string
}

const reducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case ActionType.METALCOLOR:
      return { ...state, metalColor: action.payload }
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
    case ActionType.LITTLEDIAMONDCOLOR:
      return { ...state, littleDiamondColor: action.payload }
    case ActionType.SIZE:
      return { ...state, size: action.payload }
    case ActionType.WEIGHT:
      return { ...state, weight: action.payload }
    case ActionType.ENGRAVED:
      return { ...state, engraved: action.payload }
  }
}

export const ProductProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const setShape = useCallback(
    (shape: string) => dispatch({ type: ActionType.SHAPE, payload: shape }),
    [dispatch]
  )
  const setMetalColor = useCallback(
    (metalColor: string) =>
      dispatch({ type: ActionType.METALCOLOR, payload: metalColor }),
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
  const setLittleDiamondColor = useCallback(
    (littleDiamondColor: string) =>
      dispatch({
        type: ActionType.LITTLEDIAMONDCOLOR,
        payload: littleDiamondColor,
      }),
    [dispatch]
  )
  const setSize = useCallback(
    (size: string) => dispatch({ type: ActionType.SIZE, payload: size }),
    [dispatch]
  )
  const setWeight = useCallback(
    (weight: string) => dispatch({ type: ActionType.WEIGHT, payload: weight }),
    [dispatch]
  )
  const setEngraved = useCallback(
    (engraved: string) =>
      dispatch({ type: ActionType.ENGRAVED, payload: engraved }),
    [dispatch]
  )
  const metalColor = useMemo(() => state.metalColor, [state.metalColor])
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
  const littleDiamondColor = useMemo(
    () => state.littleDiamondColor,
    [state.littleDiamondColor]
  )
  const size = useMemo(() => state.size, [state.size])
  const weight = useMemo(() => state.weight, [state.weight])
  const engraved = useMemo(() => state.engraved, [state.engraved])

  const value = useMemo(
    () => ({
      metalColor,
      shape,
      band,
      mosaic,
      stoneColorLevel,
      stoneClarity,
      stoneCut,
      textStyle,
      littleDiamondColor,
      size,
      weight,
      engraved,
      setShape,
      setMetalColor,
      setBand,
      setMosaic,
      setStoneColorLevel,
      setStoneClarity,
      setStoneCut,
      setTextStyle,
      setLittleDiamondColor,
      setSize,
      setWeight,
      setEngraved,
    }),
    [
      shape,
      metalColor,
      mosaic,
      band,
      stoneColorLevel,
      stoneClarity,
      stoneCut,
      textStyle,
      littleDiamondColor,
      size,
      weight,
      engraved,
      setShape,
      setMetalColor,
      setBand,
      setMosaic,
      setStoneColorLevel,
      setStoneClarity,
      setStoneCut,
      setTextStyle,
      setLittleDiamondColor,
      setSize,
      setWeight,
      setEngraved,
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
