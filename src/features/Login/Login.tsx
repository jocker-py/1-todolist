import React from "react"
import {
  Grid,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Button,
} from "@mui/material"

import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "app/store"
import { login } from "./auth-reducer"
import { Navigate } from "react-router-dom"

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = "Required"
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address"
      }

      if (!values.password) {
        errors.password = "Required"
      } else if (values.password.length < 3) {
        errors.password = "Password should be more than 3 symbols"
      }

      return errors
    },
    onSubmit: (values) => {
      dispatch(login(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={"https://social-network.samuraijs.com/"}
                  target={"_blank"}
                  rel="noreferrer"
                >
                  {" "}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                error={!!(formik.touched.email && formik.errors.email)}
                helperText={(formik.touched.email && formik.errors.email) || ""}
                {...formik.getFieldProps("email")}
                autoComplete={"email"}
              />
              <TextField
                type="password"
                label="Password"
                margin="normal"
                error={!!(formik.touched.password && formik.errors.password)}
                helperText={
                  (formik.touched.password && formik.errors.password) || ""
                }
                {...formik.getFieldProps("password")}
                autoComplete={"current-password"}
              />
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox />}
                {...formik.getFieldProps("rememberMe")}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
