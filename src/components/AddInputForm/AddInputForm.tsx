import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";

type AddInputFormPropsType = {
  addItem: (title: string) => void
}

const AddInputForm: FC<AddInputFormPropsType> = ({addItem}) => {
  let [text, setText] = useState("");
  let [error, setError] = useState("");
  const addItemHandler = () => {
    if (text.trim()) {
      addItem(text);
      setText("");
    } else {
      setError("Title is required");
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };
  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    setError("");
    e.key === "Enter" && addItemHandler();
  };
  return (
    <div>
      <input value={text} onChange={onChange} onKeyPress={onKeyPress} className={error ? "error" : ""}
      />
      <button onClick={addItemHandler}>+</button>
      <h5 className="error-message">{error}</h5>
    </div>
  );
};

export default AddInputForm;