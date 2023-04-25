import React, {FC} from "react";
import Task from "./Task/Task";
import {FilterValuesType, TaskType} from "../types";
import AddInputForm from "./AddInputForm/AddInputForm";
import HeaderTodoList from "./HeaderTodoList/HeaderTodoList";

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
                      onChange={onChangeTodoListTitle}
                      onClick={onRemoveTodoList}/>
      <AddInputForm addItem={addTaskItem}/>
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
        <button onClick={onAllClickHandler}
                className={filter === "all" ? "active-filter" : ""}>All
        </button>
        <button onClick={onActiveClickHandler}
                className={filter === "active" ? "active-filter" : ""}>Active
        </button>
        <button onClick={onCompletedClickHandler}
                className={filter === "completed" ? "active-filter" : ""}>Completed
        </button>
      </div>
    </div>
  );
};
