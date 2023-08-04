import React from "react";
import AppBar from "@mui/material/AppBar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "../Button/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppDispatch, useAppSelector } from "../../state/store";
import ErrorSnackbar from "../ErrorSnackbar/ErrorSnackbar";
import LogoutIcon from "@mui/icons-material/Logout";
import { logOut } from "../../features/Login/auth-reducer";

const Header = () => {
  const dispatch = useAppDispatch();
  const { entityStatus } = useAppSelector((state) => state.app);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const handleLogOut = () => dispatch(logOut());
  return (
    <AppBar position={"relative"} style={{ zIndex: 1 }}>
      <Toolbar>
        <Button title={"Menu"} icon={<MenuIcon />} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todolist
        </Typography>
        {isLoggedIn ? (
          <Button
            title={"Logout"}
            icon={<LogoutIcon />}
            onClick={handleLogOut}
          />
        ) : (
          <Button title={"Login"} icon={<AccountCircle />} />
        )}
      </Toolbar>
      {entityStatus === "loading" && (
        <LinearProgress
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            zIndex: 2,
          }}
        />
      )}
      <ErrorSnackbar />
    </AppBar>
  );
};

export default Header;
