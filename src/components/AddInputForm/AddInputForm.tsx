import React, {ChangeEvent, KeyboardEvent, FC} from "react";

type AddInputFormPropsType = {
  value: string
  error: string
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  addItem: () => void
}

const AddInputForm: FC<AddInputFormPropsType> = ({value, onKeyPress, onChange, error, addItem}) => {
  return (
    <div>
      <input value={value}
             onChange={onChange}
             onKeyPress={onKeyPress}
             className={error ? "error" : ""}
      />
      <button onClick={addItem}>+</button>
    </div>
  );
};

export default AddInputForm;