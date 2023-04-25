import React, {ChangeEvent, FC, useState} from "react";

type EditSpanPropsType = {
  title: string
  updateItem: (text: string) => void
}

const EditSpan: FC<EditSpanPropsType> = ({title, updateItem}) => {
  const [text, setText] = useState(title);
  const [editMode, setEditMode] = useState(false);
  const activeEditMode = () => {
    setEditMode(true);
  };
  const disactiveEditMode = () => {
    setEditMode(false);
    updateItem(text);
  };
  const changeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (editMode ?
    <input value={text} onChange={changeText} onBlur={disactiveEditMode} autoFocus/> :
    <span onDoubleClick={activeEditMode}>{title}</span>);
};

export default EditSpan;