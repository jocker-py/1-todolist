import React, { FC, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm: FC<AddItemFormPropsType> = ({ addItem }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (!error) {
      addItem(text);
      setText("");
    } else {
      if (!text.length) setError("The field is required");
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError(null);
    setText(e.target.value);
  };
  return (
    <div>
      <input value={text} onChange={onChangeHandler} />
      <button onClick={addItemHandler}>+</button>
    </div>
  );
};
