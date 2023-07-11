import React, { FC, memo, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  changeTitle: (title: string) => void;
};

const EditableSpan: FC<EditableSpanPropsType> = ({ title, changeTitle }) => {
  const [text, setText] = useState(title);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError(null);
    setText(e.target.value);
  };

  const onBlurHandler = () => {
    if (text.trim().length) {
      changeTitle(text);
      editModeOff();
    } else {
      setError("The field is required");
    }
  };

  const editModeOn = () => setEditMode(true);
  const editModeOff = () => setEditMode(false);

  return (
    <div>
      {editMode ? (
        <input
          value={text}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          autoFocus
        />
      ) : (
        <span onDoubleClick={editModeOn}>{title}</span>
      )}
    </div>
  );
};

export default memo(EditableSpan);
