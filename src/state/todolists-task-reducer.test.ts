import {tasksReducer} from "./tasks-reducer";
import {addTodolist, todolistsReducer} from "./todolists-reducer";
import {TasksStateType, TodolistType} from "../types";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistType> = [];

  const action = addTodolist("new todolist");

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolistId);
  expect(idFromTodolists).toBe(action.payload.todolistId);
});


