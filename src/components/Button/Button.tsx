import React, { FC } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ButtonProps } from "@mui/material";

type ButtonPropsType = ButtonProps & {
  title: string;
  icon: React.ReactNode;
  size?: "small" | "medium" | "large";
  isSelected?: boolean;
};

export const Button: FC<ButtonPropsType> = ({
  title,
  icon,
  isSelected = false,
  size = "large",
  ...otherProps
}) => {
  return (
    <Tooltip title={title}>
      <IconButton
        size={size}
        color={isSelected ? "primary" : "default"}
        {...otherProps}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};
