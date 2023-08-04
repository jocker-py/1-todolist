// initial state
import { EntityStatusType } from "../features/TodolistList/Todolist/todolistsReducer"
import { authAPI, ResultCode } from "../api/api"
import { Dispatch } from "redux"
import {
  handleNetworkAppError,
  handleServerAppError,
} from "../utils/error/error"
import { AxiosError } from "axios"
import { AuthActionsType, setIsLoggedIn } from "../features/Login/auth-reducer"

const initialState: AppStateType = {
  entityStatus: "idle",
  error: null,
  isInitialized: false,
}

// reducer
export const appReducer = (state = initialState, action: AppActionsType) => {
  switch (action.type) {
    case "APP/SET_STATUS":
      return { ...state, entityStatus: action.entityStatus }
    case "APP/SET_ERROR":
      return { ...state, error: action.error }
    case "APP/SET_INITIALIZED":
      return { ...state, isInitialized: true }
    default:
      return state
  }
}

// actions
export const setAppStatus = (entityStatus: EntityStatusType) =>
  ({
    type: "APP/SET_STATUS",
    entityStatus,
  }) as const

export const setAppError = (error: null | string) =>
  ({
    type: "APP/SET_ERROR",
    error,
  }) as const

export const setAppInitialized = () =>
  ({
    type: "APP/SET_INITIALIZED",
  }) as const

export const initializeApp =
  () => (dispatch: Dispatch<AppActionsType | AuthActionsType>) => {
    authAPI
      .me()
      .then((res) => {
        if (res.resultCode === ResultCode.OK) {
          dispatch(setIsLoggedIn(true))
        } else {
          handleNetworkAppError(res, dispatch)
        }
      })
      .catch((e: AxiosError) => {
        handleServerAppError(e, dispatch)
      })
      .finally(() => {
        dispatch(setAppInitialized())
      })
  }

// type
type AppStateType = {
  entityStatus: EntityStatusType
  error: null | string
  isInitialized: boolean
}

export type SetAppStatusType = ReturnType<typeof setAppStatus>
export type SetAppErrorType = ReturnType<typeof setAppError>

export type AppActionsType =
  | SetAppStatusType
  | SetAppErrorType
  | ReturnType<typeof setAppInitialized>
