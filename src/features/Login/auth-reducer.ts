import { authAPI, LoginParamsType, ResultCode } from "../../api/api"
import {
  SetAppErrorType,
  setAppStatus,
  SetAppStatusType,
} from "../../app/appReducer"
import {
  handleNetworkAppError,
  handleServerAppError,
} from "../../utils/error/error"
import { clearData } from "../TodolistList/Todolist/todolistsReducer"
import { AppDispatch, AppThunk } from "../../state/store"

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (state = initialState, action: AuthActionsType) => {
  switch (action.type) {
    case "LOGIN/SET_IS_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.value,
      }
    default:
      return state
  }
}

export const setIsLoggedIn = (value: boolean) => ({
  type: "LOGIN/SET_IS_LOGGED_IN",
  value,
})

export const login =
  (data: LoginParamsType): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatus("loading"))
    authAPI
      .login(data)
      .then((res) => {
        if (res.resultCode === ResultCode.OK) {
          dispatch(setIsLoggedIn(true))
          dispatch(setAppStatus("succeeded"))
        } else {
          handleNetworkAppError(res, dispatch)
        }
      })
      .catch((e) => {
        handleServerAppError(e, dispatch)
      })
  }

export const logOut = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(setAppStatus("loading"))
  authAPI
    .logOut()
    .then((res) => {
      if (res.resultCode === ResultCode.OK) {
        dispatch(setIsLoggedIn(false))
        dispatch(clearData())
        dispatch(setAppStatus("succeeded"))
      } else {
        handleNetworkAppError(res, dispatch)
      }
    })
    .catch((e) => {
      handleServerAppError(e, dispatch)
    })
}

export type AuthActionsType =
  | ReturnType<typeof setIsLoggedIn>
  | SetAppStatusType
  | SetAppErrorType
