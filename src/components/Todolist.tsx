import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import Task from "./Task/Task";
import {FilterValuesType, TaskType} from "../types";
import InputTodoList from "./InputTodolist/InputTodoList";
import HeaderTodoList from "./HeaderTodoList/HeaderTodoList";

type TodolistPropsType = {
  title: string
  todoListId: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTodoList: (todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  removeTask: (taskId: string, todoListId: string) => void
  changeTaskStatus: (id: string, todoListId: string) => void
  changeFilter: (filter: FilterValuesType, todoListId: string) => void
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
                                                  changeTaskStatus,
                                                }) => {

  let [value, setValue] = useState("");
  let [error, setError] = useState("");

  const addTaskInTodoList = () => {
    if (value.trim()) {
      addTask(value, todoListId);
      setValue("");
    } else {
      setError("Title is required");
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    setError("");
    e.key === "Enter" && addTaskInTodoList();
  };

  const onAllClickHandler = () => changeFilter("all", todoListId);
  const onActiveClickHandler = () => changeFilter("active", todoListId);
  const onCompletedClickHandler = () => changeFilter("completed", todoListId);

  return (
    <div>
      <HeaderTodoList title={title} callback={() => removeTodoList(todoListId)}/>
      <InputTodoList value={value} error={error} onChange={onChange}
                     onKeyPress={onKeyPress} addTask={addTaskInTodoList}/>
      <h5 className="error-message">{error}</h5>
      <ul>{
        tasks.map(t => {
          const onClick = () => removeTask(t.id, todoListId);
          const onChange = () => changeTaskStatus(t.id, todoListId);
          return <Task {...t} onClick={onClick} onChange={onChange}/>;
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
