import React, {ChangeEvent, KeyboardEvent, FC} from "react";

type InputTodoListPropsType = {
  value: string
  error: string
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  addTask: () => void
}

const InputTodoList: FC<InputTodoListPropsType> = ({value, onKeyPress, onChange, error, addTask}) => {
  return (
    <div>
      <input value={value}
             onChange={onChange}
             onKeyPress={onKeyPress}
             className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
    </div>
  );
};

export default InputTodoList;