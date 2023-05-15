import {FilterValuesType, TodoListType} from "../types";
import {v1} from "uuid";

type ActionType =
  ReturnType<typeof addTodolist>
  | ReturnType<typeof removeTodolist>
  | ReturnType<typeof changeTodolistTitle>;

export const addTodolist = (title: string) => ({type: "ADD_TODOLIST", title} as const);
export const removeTodolist = (id: string) => ({type: "REMOVE_TODOLIST", id} as const);
export const changeTodolistTitle = (id: string, title: string) => ({type: "CHANGE_TODOLIST_TITLE", id, title} as const);
export const changeTodolistFilter = (id: string, filter: FilterValuesType) => ({type: "CHANGE_TODOLIST_FILTER", filter} as const);

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType) => {
  switch (action.type) {
    case "ADD_TODOLIST":
      return [...state, {id: v1(), title: action.title, filter: "all"}];
    case "REMOVE_TODOLIST":
      return state.filter(tl => tl.id !== action.id);
    case "CHANGE_TODOLIST_TITLE":
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
    default:
      throw new Error("Unknown action type");
  }
};