import { todolistsAPI } from "../api/api";
import { AppDispatch } from "../state/store";
import { setTasks } from "./tasksReducer";

// initial
const initialState: TodolistsStateType = [];

// reducer
export const todolistsReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case "TODOLISTS/SET_TODOLISTS":
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    case "TODOLISTS/CHANGE_TODOLIST_TITLE":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );
    case "TODOLISTS/ADD_TODOLIST":
      return [
        { ...action.todolist, filter: "all", entityStatus: "idle" },
        ...state,
      ];
    case "TODOLISTS/DELETE_TODOLISTS":
      return state.filter((tl) => tl.id !== action.id);
    default:
      return state;
  }
};

// actions
export const setTodolists = (todolists: Array<TodolistType>) =>
  ({ type: "TODOLISTS/SET_TODOLISTS", todolists } as const);

export const addTodolist = (todolist: TodolistType) =>
  ({ type: "TODOLISTS/ADD_TODOLIST", todolist } as const);

export const changeTodolistTitle = (id: string, title: string) =>
  ({ type: "TODOLISTS/CHANGE_TODOLIST_TITLE", id, title } as const);

export const removeTodolist = (id: string) =>
  ({ type: "TODOLISTS/DELETE_TODOLISTS", id } as const);

// thunks
export const fetchTodolists = () => (dispatch: AppDispatch) => {
  todolistsAPI.getTodolists().then((data) => {
    if (data) {
      data.forEach((tl) => setTasks(tl.id, []));
      dispatch(setTodolists(data));
    }
  });
};

export const updateTodolistTitle =
  (id: string, title: string) => (dispatch: AppDispatch) => {
    todolistsAPI.updateTodolistTitle(id, title).then((data) => {
      console.log(data);
      if (data && data.resultCode === 0) {
        dispatch(changeTodolistTitle(id, title));
      }
    });
  };

export const createTodolist = (title: string) => (dispatch: AppDispatch) => {
  todolistsAPI.createTodolist(title).then((data) => {
    if (data && data.resultCode === 0) {
      dispatch(addTodolist(data.data.item));
    }
  });
};

export const deleteTodolist = (id: string) => (dispatch: AppDispatch) => {
  todolistsAPI.deleteTodolist(id).then((data) => {
    if (data && data.resultCode === 0) {
      dispatch(removeTodolist(id));
    }
  });
};

// types
type FilterType = "all" | "active" | "completed";
export type EntityStatusType = "idle" | "succeeded" | "failed" | "loading";

export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type TodolistDomainType = TodolistType & {
  filter: FilterType;
  entityStatus: EntityStatusType;
};

export type TodolistsStateType = Array<TodolistDomainType>;

type ActionsType =
  | ReturnType<typeof setTodolists>
  | ReturnType<typeof removeTodolist>
  | ReturnType<typeof addTodolist>
  | ReturnType<typeof changeTodolistTitle>;
