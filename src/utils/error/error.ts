import {
  setAppError,
  SetAppErrorType,
  setAppStatus,
  SetAppStatusType,
} from "../../app/appReducer"
import { AxiosError } from "axios"
import { Dispatch } from "redux"
import { ResponseType } from "../../api/api"

export const handleServerAppError = (
  e: AxiosError,
  dispatch: DispatchErrorType,
) => {
  dispatch(setAppError(e.message))
  dispatch(setAppStatus("failed"))
}

export const handleNetworkAppError = (
  res: ResponseType,
  dispatch: DispatchErrorType,
) => {
  if (res.messages.length) {
    dispatch(setAppError(res.messages[0]))
  } else {
    dispatch(setAppError("Some unknown error"))
  }
  dispatch(setAppStatus("failed"))
}

type DispatchErrorType = Dispatch<SetAppStatusType | SetAppErrorType>
