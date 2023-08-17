import { AppThunk } from "app/store";
import { authAPI, ResultCode } from "api/api";
import { authActions } from "features/Login/auth-reducer";
import { handleNetworkAppError, handleServerAppError } from "utils/error/error";
import { AxiosError } from "axios";
import { appActions } from "app/appReducer";

export const initializeApp = (): AppThunk => (dispatch) => {
  authAPI
    .me()
    .then((res) => {
      if (res.resultCode === ResultCode.OK) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
      } else {
        handleNetworkAppError(res, dispatch);
      }
    })
    .catch((e: AxiosError) => {
      handleServerAppError(e, dispatch);
    })
    .finally(() => {
      dispatch(appActions.setAppInitialized({ isInitialized: true }));
    });
};