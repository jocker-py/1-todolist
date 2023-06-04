import React, {FC, useCallback} from "react";
import {TaskType} from "../../types";
import EditSpan from "../EditSpan/EditSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {Stack, Tooltip, Checkbox, IconButton} from "@mui/material";
import {useDispatch} from "react-redux";
import {changeTaskStatus, changeTaskTitle, removeTask} from "../../state/tasks-reducer";


type TasksPropsType = TaskType & {
  todolistId: string
}

const Task: FC<TasksPropsType> = ({id, title, isDone, todolistId}) => {
    const dispatch = useDispatch();
    const onRemoveTask = useCallback(() => dispatch(removeTask(id, todolistId)), [dispatch, id, todolistId]);
    const onChangeTaskStatus = useCallback((e: React.ChangeEvent<HTMLInputElement>) => (
      dispatch(changeTaskStatus(id, e.currentTarget.checked, todolistId))
    ), [dispatch, id, todolistId]);
    const onChangeTaskTitle = useCallback((title: string) => dispatch(changeTaskTitle(id, title, todolistId)), [dispatch, id, todolistId]);

    return (
      <Stack key={id}
             direction="row"
             alignItems="center"
             justifyContent="space-between"
             style={isDone ? {"opacity": 0.5} : {}}>
        <Tooltip title={isDone ? "Set Active" : "Set Complete"}>
          <Checkbox checked={isDone} onChange={onChangeTaskStatus} color="primary"/>
        </Tooltip>
        <EditSpan title={title} onChange={onChangeTaskTitle} variant={"body1"}/>
        <Tooltip title="Remove Task">
          <IconButton size="small">
            <DeleteIcon fontSize="small" onClick={onRemoveTask}/>
          </IconButton>
        </Tooltip>
      </Stack>
    );
  }
;

export default React.memo(Task);