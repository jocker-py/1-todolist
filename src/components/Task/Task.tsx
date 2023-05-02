import React, {FC} from "react";
import {TaskType} from "../../types";
import EditSpan from "../EditSpan/EditSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {Tooltip, Checkbox, IconButton} from "@mui/material";



type TasksPropsType = TaskType & {
  callback: (text: string) => void;
  onChange: () => void
  onClick: () => void
}

const Task: FC<TasksPropsType> = ({id, title, isDone, onChange, onClick, callback}) => {
  return (
    <li key={id} className={isDone ? "is-done" : ""}>
      <Tooltip title={isDone ? "Set Active" : "Set Complete"}>
        <Checkbox checked={isDone} onChange={onChange}/>
      </Tooltip>
      <EditSpan title={title} onChange={callback} variant={"body1"}/>
      <Tooltip title="Remove Task">
        <IconButton size="small">
          <DeleteIcon fontSize="small" onClick={onClick}/>
        </IconButton>
      </Tooltip>
    </li>
  );
};

export default Task;