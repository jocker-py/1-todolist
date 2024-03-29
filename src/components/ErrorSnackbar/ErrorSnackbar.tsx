import * as React from "react"
import Stack from "@mui/material/Stack"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import { appActions } from "app/appReducer"
import { useAppDispatch, useAppSelector } from "app/store"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  },
)

export default function CustomizedSnackbars() {
  const dispatch = useAppDispatch()
  const error = useAppSelector((state) => state.app.error)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(appActions.setAppError({ error: null }))
  }

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
