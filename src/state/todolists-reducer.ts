import { FilterValuesType, TodolistStateType } from "../types";
import { v1 } from "uuid";
import { Reducer } from "react";

export type TodolistActionsType =
  | ReturnType<typeof addTodolist>
  | ReturnType<typeof removeTodolist>
  | ReturnType<typeof changeTodolistTitle>
  | ReturnType<typeof changeTodolistFilter>;

export const addTodolist = (title: string) =>
  ({ type: "ADD_TODOLIST", payload: { todolistId: v1(), title } } as const);
export const removeTodolist = (todolistId: string) =>
  ({ type: "REMOVE_TODOLIST", payload: todolistId } as const);
export const changeTodolistTitle = (title: string, todolistId: string) =>
  ({
    type: "CHANGE_TODOLIST_TITLE",
    payload: { todolistId, title },
  } as const);
export const changeTodolistFilter = (
  filter: FilterValuesType,
  todolistId: string
) =>
  ({
    type: "CHANGE_TODOLIST_FILTER",
    payload: { todolistId, filter },
  } as const);

const initialState: TodolistStateType = [];

export type TodolistsReducerType = Reducer<
  TodolistStateType,
  TodolistActionsType
>;
export const todolistsReducer = (
  state = initialState,
  action: TodolistActionsType
): TodolistStateType => {
  switch (action.type) {
    case "ADD_TODOLIST":
      return [
        ...state,
        {
          id: action.payload.todolistId,
          title: action.payload.title,
          filter: "all",
        },
      ];
    case "REMOVE_TODOLIST":
      return state.filter((tl) => tl.id !== action.payload);
    case "CHANGE_TODOLIST_TITLE":
      return state.map((tl) =>
        tl.id === action.payload.todolistId
          ? { ...tl, title: action.payload.title }
          : tl
      );
    case "CHANGE_TODOLIST_FILTER":
      return state.map((tl) =>
        tl.id === action.payload.todolistId
          ? { ...tl, filter: action.payload.filter }
          : tl
      );
    default:
      return state;
  }
};
