import React, {ChangeEvent, FC, useState} from "react";
import {TextField, Typography} from "@mui/material";
import {Variant} from "@mui/material/styles/createTypography";


type EditSpanPropsType = {
  title: string
  variant: Variant
  weight?: "bold" | "normal"
  onChange: (title: string) => void
}

const EditSpan: FC<EditSpanPropsType> = ({title, onChange, variant, weight = "normal"}) => {
  const [text, setText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(false);
  const activeEditMode = () => {
    setText(title);
    setEditMode(true);
  };
  const activeViewMode = () => {
    if (text.trim()) {
      setEditMode(false);
      onChange(text);
    } else {
      setError(true);
    }
  };
  const changeText = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setText(e.target.value);
  };
  return (
    editMode ?
      <TextField type="text"
                 variant="standard"
                 margin="none"
                 size="small"
                 error={error}
                 helperText={error ? "The field is require" : ""}
                 label={error ? "Error" : ""}
                 value={text}
                 onChange={changeText}
                 onBlur={activeViewMode}
                 autoFocus/> :
      <Typography onDoubleClick={activeEditMode}
                  fontWeight={weight}
                  variant={variant}>{title}</Typography>)
};

export default EditSpan;