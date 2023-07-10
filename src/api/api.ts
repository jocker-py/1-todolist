import axios from "axios";
import { TodolistType } from "../features/todolistsReducer";
import { TaskType } from "../features/tasksReducer";

const instance = axios.create();

instance.defaults.baseURL = "https://social-network.samuraijs.com/api/1.1/";
instance.defaults.withCredentials = true;
// instance.defaults.headers.API_KEY = "560f5741-2761-4c74-84c7-06c14a60225a";

export const todolistsAPI = {
  getTodolists: () =>
    instance
      .get("todo-lists")
      .then<Array<TodolistType>>((res) => res.data)
      .catch((err) => console.error("TodolistAPI error get : " + err.message)),

  updateTodolistTitle: (id: string, title: string) =>
    instance
      .put(`todo-lists/${id}`, { title })
      .then<ResponseType>((res) => res.data)
      .catch((err) =>
        console.error("TodolistAPI error put Todolist : " + err.message)
      ),

  createTodolist: (title: string) =>
    instance
      .post("todo-lists", { title })
      .then<ResponseType<{ item: TodolistType }>>((res) => res.data)
      .catch((err) =>
        console.error("TodolistAPI error post Todolist: " + err.message)
      ),

  deleteTodolist: (id: string) =>
    instance
      .delete(`todo-lists/${id}`)
      .then<ResponseType>((res) => res.data)
      .catch((err) =>
        console.error("TodolistAPI error delete Todolist: " + err.message)
      ),

  getTasks: (todolistID: string) =>
    instance
      .get(`todo-lists/${todolistID}/tasks`)
      .then<{ items: Array<TaskType> }>((res) => res.data)
      .catch((err) =>
        console.error("TodolistAPI error get Tasks : " + err.message)
      ),
};

// type
type ResponseType<T = {}> = {
  data: T;
  fieldsErrors: Array<string>;
  messages: Array<string>;
  resultCode: 0 | 1;
};
