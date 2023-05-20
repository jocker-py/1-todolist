import {FilterValuesType, TodolistType} from "../types";
import {v1} from "uuid";

type ActionType =
  ReturnType<typeof addTodolist>
  | ReturnType<typeof removeTodolist>
  | ReturnType<typeof changeTodolistTitle>
  | ReturnType<typeof changeTodolistFilter>;

export const addTodolist = (title: string) => ({type: "ADD_TODOLIST", payload: {todolistId: v1(), title}} as const);
export const removeTodolist = (todolistId: string) => ({type: "REMOVE_TODOLIST", payload: todolistId} as const);
export const changeTodolistTitle = (todolistId: string, title: string) => ({
  type: "CHANGE_TODOLIST_TITLE",
  payload: {todolistId, title},
} as const);
export const changeTodolistFilter = (todolistId: string, filter: FilterValuesType) => ({
  type: "CHANGE_TODOLIST_FILTER",
  payload: {todolistId, filter},
} as const);

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
  switch (action.type) {
    case "ADD_TODOLIST":
      return [...state, {id: action.payload.todolistId, title: action.payload.title, filter: "all"}];
    case "REMOVE_TODOLIST":
      return state.filter(tl => tl.id !== action.payload);
    case "CHANGE_TODOLIST_TITLE":
      return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl);
    case "CHANGE_TODOLIST_FILTER":
      return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl);
    default:
      throw new Error("Unknown action type");
  }
};