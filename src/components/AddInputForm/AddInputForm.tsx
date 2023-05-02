import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {IconButton, TextField, Tooltip} from "@mui/material";

type AddInputFormPropsType = {
  title: string
  addItem: (title: string) => void
}

const AddInputForm: FC<AddInputFormPropsType> = ({title, addItem}) => {
  let [text, setText] = useState("");
  let [error, setError] = useState(false);
  const addItemHandler = () => {
    if (text.trim()) {
      addItem(text);
      setText("");
    } else {
      setError(true);
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };
  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(false);
    e.key === "Enter" && addItemHandler();
  };
  return (
    <div>
      <TextField type="text"
                 size="small"
                 variant="outlined"
                 error={error}
                 helperText={error ? "The field is require" : ""}
                 label={error ? "Error" : `New ${title}`}
                 value={text}
                 onChange={onChange}
                 onKeyPress={onKeyPress}/>
      <Tooltip title={`Add ${title}`}>
        <IconButton size="medium">
          <AddBoxIcon onClick={addItemHandler}
                      color="primary"
                      fontSize="large"/>
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default AddInputForm;