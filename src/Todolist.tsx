import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
  todoListId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todoListId: string) => void
  changeFilter: (filter: FilterValuesType, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  changeTaskStatus: (id: string, todoListId: string) => void
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void
}

export const Todolist: FC<PropsType> = (props) => {

  let [title, setTitle] = useState("");
  let [error, setError] = useState("");

  const addTask = () => {
    if (title.trim()) {
      props.addTask(title, props.todoListId);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError("");
    if (e.key === "Enter") {
      addTask();
    }
  };

  const onAllClickHandler = () => props.changeFilter("all", props.todoListId);
  const onActiveClickHandler = () => props.changeFilter("active", props.todoListId);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.todoListId);

  return <div>
    <h3>{props.title}
      <button onClick={() => props.removeTodoList(props.todoListId)}>x</button>
    </h3>
    <div>
      <input value={title}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
             className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
    </div>
    <h5 className="error-message">{error}</h5>
    <ul>
      {
        props.tasks.map(t => {

          const onClickHandler = () => props.removeTask(t.id, props.todoListId);
          const onChangeHandler = (() => props.changeTaskStatus(t.id, props.todoListId));

          return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
            <span>{t.title}</span>
            <button onClick={onClickHandler}>x</button>
          </li>;
        })
      }
    </ul>
    <div>
      <button onClick={onAllClickHandler}
              className={props.filter === "all" ? "active-filter" : ""}>All
      </button>
      <button onClick={onActiveClickHandler}
              className={props.filter === "active" ? "active-filter" : ""}>Active
      </button>
      <button onClick={onCompletedClickHandler}
              className={props.filter === "completed" ? "active-filter" : ""}>Completed
      </button>
    </div>
  </div>;
};
