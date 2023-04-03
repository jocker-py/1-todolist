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
  ALL = "All",
  ACTIVE = "Active",
  COMPLETED = "Completed",
}

export const Todolist: FC<TodoListType> = ({title, title1, tasks}) => {
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);
  const [tasksList, setTasksList] = useState<Array<TaskType>>(tasks);
  const changeFilter = (value: string) => {
    setFilter(value as FilterType);
  };
  const filteredTasks = tasksList.filter(
    (task) => {
      switch (filter) {
        case FilterType.ACTIVE:
          return !task.isDone;
        case FilterType.COMPLETED:
          return task.isDone;
        default:
          return true;
      }
    });
  const removeTask = (id: TaskType["id"]) => {
    const updatedTasks = [...tasksList].filter(task => task.id !== id);
    setTasksList(updatedTasks);
  };
  const toggleIsDone = (id: TaskType["id"]) => {
    const updatedTasks = [...tasksList].map(task => task.id === id ? {...task, isDone: !task.isDone} : task);
    setTasksList(updatedTasks);
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
        <input/>
        <button>+</button>
      </div>
      <ul>
        {tasksElements}
      </ul>
      <div>
        <Button callback={() => changeFilter(FilterType.ALL)} name={FilterType.ALL}/>
        <Button callback={() => changeFilter(FilterType.ACTIVE)} name={FilterType.ACTIVE}/>
        <Button callback={() => changeFilter(FilterType.COMPLETED)} name={FilterType.COMPLETED}/>
      </div>
    </div>
  );
};
