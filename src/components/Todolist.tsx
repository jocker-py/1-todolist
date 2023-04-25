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
  changeTodoListTitle: (text: string, todoListId: string) => void
  changeFilter: (filter: FilterValuesType, todoListId: string) => void
  changeTaskText: (taskId: string, text: string, todoListId: string) => void

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
                                                  changeTaskText,
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

  const onChangeNewTaskText = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onChangeTodoListTitle = (text: string) => {
    changeTodoListTitle(text, todoListId);
  }
  const onRemoveTodoList = () => {
    removeTodoList(todoListId)
  }

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    setError("");
    e.key === "Enter" && addTaskInTodoList();
  };

  const onAllClickHandler = () => changeFilter("all", todoListId);
  const onActiveClickHandler = () => changeFilter("active", todoListId);
  const onCompletedClickHandler = () => changeFilter("completed", todoListId);

  return (
    <div>
      <HeaderTodoList title={title} updateItem={onChangeTodoListTitle} callback={onRemoveTodoList}/>
      <InputTodoList value={value} error={error} onChange={onChangeNewTaskText}
                     onKeyPress={onKeyPress} addTask={addTaskInTodoList}/>
      <h5 className="error-message">{error}</h5>
      <ul>{
        tasks.map(t => {
          const onClick = () => removeTask(t.id, todoListId);
          const onChange = () => changeTaskStatus(t.id, todoListId);
          const onChangeTaskText = (text: string) => changeTaskText(t.id, text, todoListId);
          return <Task {...t} onClick={onClick} onChange={onChange} callback={onChangeTaskText}/>;
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
