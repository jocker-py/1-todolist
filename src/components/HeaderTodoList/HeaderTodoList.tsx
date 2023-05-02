import React, {FC} from "react";
import EditSpan from "../EditSpan/EditSpan";
import {Variant} from "@mui/material/styles/createTypography";

type HeaderTodoListPropsType = {
  title: string
  variant: Variant
  weight?: "bold" | "normal"
  onClick: () => void
  onChange: (title: string) => void
}

const HeaderTodoList: FC<HeaderTodoListPropsType> = ({title, variant, weight, onClick, onChange, }) => {
  return (
    <h3>
      <EditSpan title={title} onChange={onChange}/>
      <button onClick={onClick}>x</button>
    </h3>
  );
};

export default HeaderTodoList;