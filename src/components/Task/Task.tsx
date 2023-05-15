import React, {FC} from "react";
import {TaskType} from "../../types";
import EditSpan from "../EditSpan/EditSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {Stack, Tooltip, Checkbox, IconButton} from "@mui/material";


type TasksPropsType = TaskType & {
  callback: (text: string) => void;
  onChange: () => void
  onClick: () => void
}

const Task: FC<TasksPropsType> = ({id, title, isDone, onChange, onClick, callback}) => {
  return (
    <Stack key={id}
           direction="row"
           alignItems="center"
           justifyContent="space-between"
           style={isDone ? {"opacity": 0.5} : {}}>
      <Tooltip title={isDone ? "Set Active" : "Set Complete"}>
        <Checkbox checked={isDone} onChange={onChange} color="primary"/>
      </Tooltip>
      <EditSpan title={title} onChange={callback} variant={"body1"}/>
      <Tooltip title="Remove Task">
        <IconButton size="small">
          <DeleteIcon fontSize="small" onClick={onClick}/>
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default Task;