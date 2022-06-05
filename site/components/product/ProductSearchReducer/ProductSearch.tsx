import React, { useReducer, useCallback, useMemo } from 'react'

type ProducSearchType = {
  shape: { value: string; label: string }
  color: string
}

export enum ActionType {
  SHAPE = 'SHAPE',
  COLOR = 'COLOR',
}
type Action = {
  type: ActionType
  payload?: any
}

export const productReducer = (state: ProducSearchType, action: Action) => {
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
  }
}

//useMemo can memorize this value and this value will not be regenerated when this componet gets rerendered.
//Due to referencial equality, everytime this compoent rerender, this value would be created again and it means that
//this value inside ProductLayoutContext.Provider would be updated everytime compoent rerender, making all the component
//consuming this useContext will get rerendered.
