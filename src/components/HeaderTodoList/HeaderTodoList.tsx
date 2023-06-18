import React, { FC } from "react";
import EditSpan from "../EditSpan/EditSpan";
import { Variant } from "@mui/material/styles/createTypography";
import { IconButton, Stack, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type HeaderTodoListPropsType = {
  title: string;
  variant: Variant;
  weight?: "bold" | "normal";
  onClick: () => void;
  onChange: (title: string) => void;
};

const HeaderTodoList: FC<HeaderTodoListPropsType> = ({
  title,
  variant,
  weight,
  onClick,
  onChange,
}) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <EditSpan
        title={title}
        onChange={onChange}
        variant={variant}
        weight={weight}
      />
      <Tooltip title="Remove Todolist">
        <IconButton size="small">
          <DeleteIcon fontSize="small" onClick={onClick} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default React.memo(HeaderTodoList);
