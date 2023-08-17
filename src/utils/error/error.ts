import { AxiosError } from "axios"
import { ResponseType } from "api/api"
import { appActions } from "app/appReducer"
import { Dispatch } from "redux"

export const handleServerAppError = (e: AxiosError, dispatch: Dispatch) => {
  dispatch(appActions.setAppError({ error: e.message }))
  dispatch(appActions.setAppStatus({ entityStatus: "failed" }))
}

export const handleNetworkAppError = (
  res: ResponseType,
  dispatch: Dispatch,
) => {
  if (res.messages.length) {
    dispatch(appActions.setAppError({ error: res.messages[0] }))
  } else {
    dispatch(appActions.setAppError({ error: "Some unknown error" }))
  }
  dispatch(appActions.setAppStatus({ entityStatus: "failed" }))
}
