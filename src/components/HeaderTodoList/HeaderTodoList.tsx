import React, {FC} from "react";
import EditSpan from "../EditSpan/EditSpan";
import {Variant} from "@mui/material/styles/createTypography";
import {IconButton, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type HeaderTodoListPropsType = {
  title: string
  variant: Variant
  weight?: "bold" | "normal"
  onClick: () => void
  onChange: (title: string) => void
}

const HeaderTodoList: FC<HeaderTodoListPropsType> = ({title, variant, weight, onClick, onChange}) => {
  return (
    <h3>
      <EditSpan title={title} onChange={onChange}/>
      <Tooltip title="Remove Todolist">
        <IconButton size="small">
          <DeleteIcon fontSize="small" onClick={onClick}/>
        </IconButton>
      </Tooltip>
    </h3>
  );
};

export default HeaderTodoList;