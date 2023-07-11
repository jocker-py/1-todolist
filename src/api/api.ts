import axios from "axios";
import { TodolistType } from "../features/todolistsReducer";
import { TaskModelType, TaskType } from "../features/tasksReducer";

const instance = axios.create();

instance.defaults.baseURL = "https://social-network.samuraijs.com/api/1.1/";
instance.defaults.withCredentials = true;
// instance.defaults.headers.API_KEY = "560f5741-2761-4c74-84c7-06c14a60225a";

export const todolistsAPI = {
  getTodolists: () =>
    instance
      .get("todo-lists")
      .then<Array<TodolistType>>((res) => res.data)
      .catch((err) =>
        console.error("TodolistAPI error get Todolists : " + err.message)
      ),

  updateTodolistTitle: (todolistID: string, title: string) =>
    instance
      .put(`todo-lists/${todolistID}`, { title })
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

  deleteTodolist: (todolistID: string) =>
    instance
      .delete(`todo-lists/${todolistID}`)
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

  createTask: (todolistID: string, title: string) =>
    instance
      .post(`todo-lists/${todolistID}/tasks`, { title })
      .then<ResponseType<{ item: TaskType }>>((res) => res.data)
      .catch((err) =>
        console.error("TodolistAPI error create Task : " + err.message)
      ),

  updateTaskModel: (taskID: string, todolistID: string, task: TaskModelType) =>
    instance
      .put(`todo-lists/${todolistID}/tasks/${taskID}`, { ...task })
      .then<ResponseType>((res) => res.data)
      .catch((err) =>
        console.error("TodolistAPI error update TaskModel : " + err.message)
      ),

  deleteTask: (taskID: string, todolistID: string) =>
    instance
      .delete(`todo-lists/${todolistID}/tasks/${taskID}`)
      .then<ResponseType>((res) => res.data)
      .catch((err) =>
        console.error("TodolistAPI error delete Task : " + err.message)
      ),
};

// type
type ResponseType<T = {}> = {
  data: T;
  fieldsErrors: Array<string>;
  messages: Array<string>;
  resultCode: 0 | 1;
};
