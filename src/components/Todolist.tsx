import React, {FC} from "react";
import Task from "./Task/Task";
import {FilterValuesType, TaskType} from "../types";
import AddInputForm from "./AddInputForm/AddInputForm";
import HeaderTodoList from "./HeaderTodoList/HeaderTodoList";
import {IconButton, Tooltip} from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TimelapseIcon from "@mui/icons-material/Timelapse";

type TodolistPropsType = {
  title: string
  todoListId: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTodoList: (todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  removeTask: (taskId: string, todoListId: string) => void
  changeTaskStatus: (taskId: string, todoListId: string) => void
  changeTodoListTitle: (title: string, todoListId: string) => void
  changeFilter: (filter: FilterValuesType, todoListId: string) => void
  changeTaskTitle: (taskId: string, text: string, todoListId: string) => void
}

export const Todolist: FC<TodolistPropsType> = ({
                                                  tasks,
                                                  title,
                                                  filter,
                                                  addTask,
                                                  todoListId,
                                                  removeTask,
                                                  changeFilter,
                                                  removeTodoList,
                                                  changeTodoListTitle,
                                                  changeTaskTitle,
                                                  changeTaskStatus,
                                                }) => {

  const onChangeTodoListTitle = (title: string) => {
    changeTodoListTitle(title, todoListId);
  };
  const onRemoveTodoList = () => {
    removeTodoList(todoListId);
  };
  const addTaskItem = (text: string) => {
    addTask(text, todoListId);
  };
  const onAllClickHandler = () => changeFilter("all", todoListId);
  const onActiveClickHandler = () => changeFilter("active", todoListId);
  const onCompletedClickHandler = () => changeFilter("completed", todoListId);

  return (
    <div>
      <HeaderTodoList title={title}
                      variant={"h6"}
                      weight={"bold"}
                      onChange={onChangeTodoListTitle}
                      onClick={onRemoveTodoList}/>
      <AddInputForm addItem={addTaskItem} title={"Task"}/>
      <ul>{
        tasks.map(t => {
          const onRemoveTask = () => removeTask(t.id, todoListId);
          const onChangeTaskStatus = () => changeTaskStatus(t.id, todoListId);
          const onChangeTaskTitle = (title: string) => changeTaskTitle(t.id, title, todoListId);
          return <Task {...t}
                       onClick={onRemoveTask}
                       onChange={onChangeTaskStatus}
                       callback={onChangeTaskTitle}/>;
        })}
      </ul>
      <div>
        <Tooltip title="All Tasks">
          <IconButton size="small"
                      color={filter === "all" ? "primary" : "default"}>
            <LayersIcon fontSize="medium"
                        onClick={onAllClickHandler}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Active Tasks">
          <IconButton size="small"
                      color={filter === "active" ? "primary" : "default"}>
            <TimelapseIcon fontSize="medium"
                           onClick={onActiveClickHandler}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Completed Tasks">
          <IconButton size="small"
                      color={filter === "completed" ? "primary" : "default"}>
            <TaskAltIcon fontSize="medium"
                         onClick={onCompletedClickHandler}
            />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
