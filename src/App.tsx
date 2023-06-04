import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./App.css";
import Todolist from "./components/Todolist";
import {TodolistStateType} from "./types";
import AddInputForm from "./components/AddInputForm/AddInputForm";
import {Container, Grid, Paper} from "@mui/material";
import Header from "./components/Header";
import {AppRootStoreType} from "./state/store";
import {addTodolist} from "./state/todolists-reducer";

function App() {
  const todolists = useSelector<AppRootStoreType, TodolistStateType>(state => state.todolists);
  const dispatch = useDispatch();

  const onAddTodolist = useCallback((title: string) => {
    dispatch(addTodolist(title));
  }, [dispatch]);

  return (
    <div className="App">
      <Header/>
      <Container fixed>
        <Grid container style={{padding: "20px"}}>
          <AddInputForm addItem={onAddTodolist} title="TodoList"/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => (
              <Grid key={tl.id} item>
                <Paper elevation={3} style={{padding: "15px 10px", borderRadius: "15px"}}>
                  <Todolist {...tl}/>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;

