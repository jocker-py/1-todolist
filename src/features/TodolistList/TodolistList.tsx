import React from "react";
import {useTodolistList} from "./useTodolistList";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import {List} from "../../components/List/List";
import {TodolistDomainType} from "./Todolist/todolistsReducer";
import Todolist from "./Todolist/Todolist";

import {Navigate} from "react-router-dom";

const TodolistList = () => {
  const {isLoading, todolists, addTodolist, isLoggedIn} = useTodolistList();

  if (!isLoggedIn) {
    return <Navigate to={"/login"}/>;
  }

  return (
    <div>
      <div style={{padding: "20px"}}>
        <AddItemForm
          tooltip={"Todolist"}
          addItem={addTodolist}
          disabled={isLoading}
        />
      </div>
      <List
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "center",
        }}
        items={todolists}
        renderItem={(tl: TodolistDomainType) => (
          <Todolist key={tl.id} {...tl} />
        )}
      />
    </div>
  );
};

export default TodolistList;
