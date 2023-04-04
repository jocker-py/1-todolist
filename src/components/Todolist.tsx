import React, {FC, useState} from "react";
import {Button} from "./Button";
import {Task} from "./Task";

export type TaskType = {
  id: number,
  title: string,
  isDone: boolean
};

type TodoListType = {
  title: string,
  title1?: number | string,
  tasks: Array<TaskType>,
}

enum FilterType {
  all = "ALL",
  active = "ACTIVE",
  completed = "COMPLETED",
  three = "THREE",
  delete = "DELETE ALL",
}

export const Todolist: FC<TodoListType> = ({title, title1, tasks}) => {
  const [filter, setFilter] = useState<FilterType>(FilterType.all);
  const [tasksList, setTasksList] = useState<Array<TaskType>>(tasks);
  const [text, setText] = useState<string>("");
  const changeFilter = (value: string) => {
    setFilter(value as FilterType);
  };
  const filteredTasks = tasksList.filter(
    (task, idx) => {
      switch (filter) {
        case FilterType.active:
          return !task.isDone;
        case FilterType.completed:
          return task.isDone;
        case FilterType.three:
          return idx < 3;
        default:
          return true;
      }
    });
  const deleteAllTasks = () => {
    setTasksList([]);
  };
  const removeTask = (id: TaskType["id"]) => {
    const updatedTasks = [...tasksList].filter(task => task.id !== id);
    setTasksList(updatedTasks);
  };
  const toggleIsDone = (id: TaskType["id"]) => {
    const updatedTasks = [...tasksList].map(task => task.id === id ? {...task, isDone: !task.isDone} : task);
    setTasksList(updatedTasks);
  };
  const changeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    setText(text);
  };
  const addTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const maxId = Math.max(...tasks.map(task => task.id));
    const newTask = {
      id: maxId + 1,
      title: text,
      isDone: false,
    };
    setTasksList([...tasksList, newTask]);
    setText("");
  };
  const tasksElements = filteredTasks.map(task => {
    return <Task key={task.id}
                 id={task.id}
                 title={task.title}
                 isDone={task.isDone}
                 removeTask={removeTask}
                 toggleIsDone={toggleIsDone}/>;
  });


  return (
    <div>
      <h3>{title}</h3>
      <h3>{title1}</h3>
      <div>
        <input value={text} onChange={changeInputText}/>
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {tasksElements}
      </ul>
      <div>
        <Button callback={deleteAllTasks} name={"DELETE ALL"}/>
      </div>
      <div>
        <Button callback={() => changeFilter(FilterType.all)} name={FilterType.all}/>
        <Button callback={() => changeFilter(FilterType.active)} name={FilterType.active}/>
        <Button callback={() => changeFilter(FilterType.completed)} name={FilterType.completed}/>
        <Button callback={() => changeFilter(FilterType.three)} name={FilterType.three}/>
      </div>
    </div>
  );
};
