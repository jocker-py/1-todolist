import React, { useEffect } from "react";
import { AddItemForm } from "../components/AddItemForm/AddItemForm";
import {
  createTodolist,
  fetchTodolists,
  TodolistsStateType,
} from "../features/todolistsReducer";
import { useAppDispatch, useAppSelector } from "../state/store";
import Todolist from "../features/Todolist";

function App() {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector(
    (state) => state.todolists
  ) as TodolistsStateType;

  const addTodolist = (title: string) => {
    // @ts-ignore
    dispatch(createTodolist(title));
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchTodolists());
  }, []);

  return (
    <div style={{ padding: "100px" }}>
      <AddItemForm addItem={addTodolist} />
      <div style={{ display: "flex", gap: "20px" }}>
        {todolists.map((tl) => (
          <Todolist key={tl.id} todolist={tl} />
        ))}
      </div>
    </div>
  );
}

export default App;
