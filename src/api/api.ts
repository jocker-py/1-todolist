import axios from "axios";
import { TodolistType } from "../features/TodolistList/Todolist/todolistsReducer";
import {
  TaskModelType,
  TaskType,
} from "../features/TodolistList/Task/tasksReducer";

const instance = axios.create();

instance.defaults.baseURL = "https://social-network.samuraijs.com/api/1.1/";
instance.defaults.withCredentials = true;
// instance.defaults.headers.API_KEY = "560f5741-2761-4c74-84c7-06c14a60225a";

export const todolistsAPI = {
  getTodolists: () =>
    instance.get("todo-lists").then<Array<TodolistType>>((res) => res.data),

  updateTodolistTitle: (todolistID: string, title: string) =>
    instance
      .put(`todo-lists/${todolistID}`, { title })
      .then<ResponseType>((res) => res.data),

  createTodolist: (title: string) =>
    instance
      .post("todo-lists", { title })
      .then<ResponseType<{ item: TodolistType }>>((res) => res.data),

  deleteTodolist: (todolistID: string) =>
    instance
      .delete(`todo-lists/${todolistID}`)
      .then<ResponseType>((res) => res.data),

  getTasks: (todolistID: string) =>
    instance
      .get(`todo-lists/${todolistID}/tasks`)
      .then<{ items: Array<TaskType> }>((res) => res.data),

  createTask: (todolistID: string, title: string) =>
    instance
      .post(`todo-lists/${todolistID}/tasks`, { title })
      .then<ResponseType<{ item: TaskType }>>((res) => res.data),

  updateTaskModel: (taskID: string, todolistID: string, task: TaskModelType) =>
    instance
      .put(`todo-lists/${todolistID}/tasks/${taskID}`, { ...task })
      .then<ResponseType>((res) => res.data),

  deleteTask: (taskID: string, todolistID: string) =>
    instance
      .delete(`todo-lists/${todolistID}/tasks/${taskID}`)
      .then<ResponseType>((res) => res.data),
};

export const authAPI = {
  login: (params: LoginParamsType) =>
    instance
      .post(`auth/login`, params)
      .then<ResponseType<{ userId: number }>>((res) => res.data),
  logOut: () =>
    instance.delete("auth/login").then<ResponseType>((res) => res.data),
  me: () =>
    instance.get("auth/me").then<ResponseType<UserType>>((res) => res.data),
};

// type
export type ResponseType<T = {}> = {
  data: T;
  fieldsErrors: Array<string>;
  messages: Array<string>;
  resultCode: ResultCode;
};

export enum ResultCode {
  OK,
  invalid,
  captchaError = 10,
}

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};

type UserType = {
  email: string;
  login: string;
  id: number;
};
