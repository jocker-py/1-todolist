import React, { FC, memo } from "react"
import LayersIcon from "@mui/icons-material/Layers"
import TaskAltIcon from "@mui/icons-material/TaskAlt"
import AlarmIcon from "@mui/icons-material/Alarm"
import { Paper } from "@mui/material"
import AddItemForm from "../../../components/AddItemForm/AddItemForm"
import { useTodolist } from "./useTodolist"
import Hat from "../Hat/Hat"
import { TaskDomainType } from "../Task/tasksReducer"
import { Button } from "components/Button/Button"
import { List } from "components/List/List"
import Task from "../Task/Task"
import { TodolistDomainType } from "features/TodolistList/Todolist/todolistsReducer"

const Todolist: FC<TodolistDomainType> = (todolist) => {
  const {
    id,
    title,
    entityStatus,
    filter,
    addTask,
    tasks,
    isLoading,
    setFilterCompleted,
    setFilterActive,
    setFilterAll,
  } = useTodolist(todolist)

  return (
    <Paper
      elevation={6}
      style={{
        padding: "20px 40px",
        display: "flex",
        flexDirection: "column",
        width: "25%",
      }}
    >
      <Hat id={id} title={title} entityStatus={entityStatus} />
      <AddItemForm tooltip={"Task"} addItem={addTask} disabled={isLoading} />
      <List
        items={tasks}
        renderItem={(task: TaskDomainType) => <Task key={task.id} {...task} />}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "auto",
        }}
      >
        <Button
          onClick={setFilterAll}
          isSelected={filter === "all"}
          title={"All"}
          icon={<LayersIcon />}
        />
        <Button
          onClick={setFilterActive}
          isSelected={filter === "active"}
          title={"Active"}
          icon={<AlarmIcon />}
        />
        <Button
          onClick={setFilterCompleted}
          isSelected={filter === "completed"}
          title={"Completed"}
          icon={<TaskAltIcon />}
        />
      </div>
    </Paper>
  )
}

export default memo(Todolist)
