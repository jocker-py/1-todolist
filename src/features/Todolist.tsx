import React, { FC, useEffect } from "react";
import { TodolistDomainType } from "./todolistsReducer";
import { AddItemForm } from "../components/AddItemForm/AddItemForm";
import Head from "./Head/Head";
import { useAppDispatch, useAppSelector } from "../state/store";
import { fetchTasks } from "./tasksReducer";

type TodolistPropsType = {
  todolist: TodolistDomainType;
};

const Todolist: FC<TodolistPropsType> = ({ todolist }) => {
  const { id, title } = todolist;
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks[id]);
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchTasks(id));
  }, []);
  return (
    <div>
      <Head id={id} title={title} />
      <AddItemForm addItem={() => {}} />
      <div>
        {tasks && tasks.map((task) => <div key={task.id}>{task.title}</div>)}
      </div>
    </div>
  );
};

export default Todolist;
