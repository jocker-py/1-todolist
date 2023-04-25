import React, {ChangeEvent, FC, useState} from "react";

type EditSpanPropsType = {
  title: string
  onChange: (title: string) => void
}

const EditSpan: FC<EditSpanPropsType> = ({title, onChange}) => {
  const [text, setText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const activeEditMode = () => {
    setText(title);
    setEditMode(true);
  };
  const activeViewMode = () => {
    setEditMode(false);
    onChange(text);
  };
  const changeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    editMode ?
      <input value={text} onChange={changeText} onBlur={activeViewMode} autoFocus/> :
      <span onDoubleClick={activeEditMode}>{title}</span>);
};

export default EditSpan;