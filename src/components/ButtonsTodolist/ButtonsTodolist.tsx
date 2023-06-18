import React, {FC} from "react";
import {IconButton, Stack, Tooltip} from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {changeTodolistFilter} from "../../state/todolists-reducer";
import {useDispatch} from "react-redux";
import {TodolistType} from "../../types";


const ButtonsTodolist: FC<TodolistType> = ({id, filter}) => {
  const dispatch = useDispatch();
  const onAllClickHandler = () => dispatch(changeTodolistFilter("all", id))
  const onActiveClickHandler = () => dispatch(changeTodolistFilter("active", id))
  const onCompletedClickHandler = () => dispatch(changeTodolistFilter("completed", id))
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} color="primary">
      <Tooltip title="All Tasks">
        <IconButton size="small" color={filter === "all" ? "primary" : "default"}>
          <LayersIcon fontSize="medium" onClick={onAllClickHandler}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Active Tasks">
        <IconButton size="small" color={filter === "active" ? "primary" : "default"}>
          <TimelapseIcon fontSize="medium" onClick={onActiveClickHandler}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Completed Tasks">
        <IconButton size="small" color={filter === "completed" ? "primary" : "default"}>
          <TaskAltIcon fontSize="medium" onClick={onCompletedClickHandler}/>
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default React.memo(ButtonsTodolist);