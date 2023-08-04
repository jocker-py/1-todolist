import React, { FC, memo, useState } from "react"
import AddBoxIcon from "@mui/icons-material/AddBox"
import { Button } from "../Button/Button"
import { TextField } from "@mui/material"

type AddItemFormPropsType = {
  addItem: (title: string) => void
  tooltip: string
  disabled: boolean
}

const AddItemForm: FC<AddItemFormPropsType> = ({
  addItem,
  tooltip,
  disabled,
}) => {
  const [text, setText] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (!text.trim().length) {
      setError("The field is required")
    }
    if (!error) {
      addItem(text)
      setText("")
    }
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError(null)
    setText(e.target.value)
  }

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <TextField
        size="small"
        value={text}
        variant="outlined"
        onChange={onChangeHandler}
        error={!!error}
        helperText={error}
        disabled={disabled}
      />
      <Button
        title={"Add " + tooltip}
        onClick={addItemHandler}
        icon={<AddBoxIcon />}
        color={"primary"}
        disabled={disabled}
      />
    </div>
  )
}

export default memo(AddItemForm)
