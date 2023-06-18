import { TasksStateType } from "../types";
import { v1 } from "uuid";
import { addTodolist, removeTodolist } from "./todolists-reducer";
import { Reducer } from "react";

export const removeTask = (taskId: string, todolistId: string) =>
  ({
    type: "REMOVE_TASK",
    payload: {
      taskId,
      todolistId,
    },
  } as const);

export const addTask = (title: string, todolistId: string) =>
  ({
    type: "ADD_TASK",
    payload: {
      title,
      todolistId,
    },
  } as const);

export const changeTaskStatus = (
  taskId: string,
  status: boolean,
  todolistId: string
) =>
  ({
    type: "CHANGE_STATUS_TASK",
    payload: {
      taskId,
      status,
      todolistId,
    },
  } as const);

export const changeTaskTitle = (
  taskId: string,
  title: string,
  todolistId: string
) =>
  ({
    type: "CHANGE_TITLE_TASK",
    payload: {
      taskId,
      title,
      todolistId,
    },
  } as const);

export type TasksActionsType =
  | ReturnType<typeof removeTask>
  | ReturnType<typeof addTask>
  | ReturnType<typeof changeTaskStatus>
  | ReturnType<typeof changeTaskTitle>
  | ReturnType<typeof addTodolist>
  | ReturnType<typeof removeTodolist>;

export type TasksReducerType = Reducer<TasksStateType, TasksActionsType>;

const initialState: TasksStateType = {};

export const tasksReducer = (
  state = initialState,
  action: TasksActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE_TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (t) => t.id !== action.payload.taskId
        ),
      };
    case "ADD_TASK":
      return {
        ...state,
        [action.payload.todolistId]: [
          {
            id: v1(),
            title: action.payload.title,
            isDone: false,
          },
          ...state[action.payload.todolistId],
        ],
      };
    case "CHANGE_STATUS_TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? { ...t, isDone: action.payload.status }
            : t
        ),
      };
    case "CHANGE_TITLE_TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? { ...t, title: action.payload.title }
            : t
        ),
      };
    case "ADD_TODOLIST":
      return {
        ...state,
        [action.payload.todolistId]: [],
      };
    case "REMOVE_TODOLIST":
      delete state[action.payload];
      return { ...state };
    default:
      return state;
  }
};
