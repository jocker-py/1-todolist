import { todolistsAPI } from "../../../api/api";
import {
  handleNetworkAppError,
  handleServerAppError,
} from "../../../utils/error/error";
import { AppDispatch, AppThunk } from "../../../state/store";
import { AxiosError } from "axios";
import { setAppStatus } from "../../../app/appReducer";
import { fetchTasks } from "../Task/tasksReducer";

// initial
const initialState: TodolistsStateType = [];

// reducer
export const todolistsReducer = (
  state = initialState,
  action: TodolistActionsType
) => {
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
    case "TODOLISTS/CHANGE_TODOLIST_FILTER":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
    case "TODOLISTS/ADD_TODOLIST":
      return [
        { ...action.todolist, filter: "all", entityStatus: "idle" },
        ...state,
      ];
    case "TODOLISTS/DELETE_TODOLISTS":
      return state.filter((tl) => tl.id !== action.id);
    case "CLEAR_DATA":
      return [];
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

export const changeTodolistFilter = (id: string, filter: FilterType) =>
  ({ type: "TODOLISTS/CHANGE_TODOLIST_FILTER", id, filter } as const);

export const removeTodolist = (id: string) =>
  ({ type: "TODOLISTS/DELETE_TODOLISTS", id } as const);

export const clearData = () => ({ type: "CLEAR_DATA" } as const);

// thunks
export const fetchTodolists = (): AppThunk => (dispatch: AppDispatch) => {
  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(setTodolists(res));
      return res;
    })
    .then((todolists) => {
      todolists.forEach((tl) => dispatch(fetchTasks(tl.id)));
      dispatch(setAppStatus("succeeded"));
    })
    .catch((e: AxiosError) => {
      handleServerAppError(e, dispatch);
    });
};

export const updateTodolistTitle =
  (id: string, title: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatus("loading"));
    todolistsAPI
      .updateTodolistTitle(id, title)
      .then((res) => {
        if (res && res.resultCode === 0) {
          dispatch(changeTodolistTitle(id, title));
          dispatch(setAppStatus("succeeded"));
        } else {
          handleNetworkAppError(res, dispatch);
        }
      })
      .catch((e: AxiosError) => {
        handleServerAppError(e, dispatch);
      });
  };

export const createTodolist =
  (title: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatus("loading"));
    todolistsAPI
      .createTodolist(title)
      .then((res) => {
        if (res && res.resultCode === 0) {
          dispatch(addTodolist(res.data.item));
          dispatch(setAppStatus("succeeded"));
        } else {
          handleNetworkAppError(res, dispatch);
        }
      })
      .catch((e: AxiosError) => {
        handleServerAppError(e, dispatch);
      });
  };

export const deleteTodolist =
  (id: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatus("loading"));
    todolistsAPI
      .deleteTodolist(id)
      .then((res) => {
        if (res && res.resultCode === 0) {
          dispatch(removeTodolist(id));
          dispatch(setAppStatus("succeeded"));
        } else {
          handleNetworkAppError(res, dispatch);
        }
      })
      .catch((e: AxiosError) => {
        handleServerAppError(e, dispatch);
      });
  };

// types
export type FilterType = "all" | "active" | "completed";
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

export type TodolistActionsType =
  | ReturnType<typeof setTodolists>
  | ReturnType<typeof removeTodolist>
  | ReturnType<typeof addTodolist>
  | ReturnType<typeof changeTodolistTitle>
  | ReturnType<typeof changeTodolistFilter>
  | ReturnType<typeof clearData>;
