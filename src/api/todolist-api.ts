import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-Key": "bdafb503-ffc4-41ea-a8ad-92618c3793ad",
  },
});

type TodolistItemDataType = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};

type TaskItemDataType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type TasksDataType = {
  items: Array<TasksDataType>;
  totalCount: number;
  error: null | string;
};

type ResponseType<D> = {
  data: D;
  fieldsErrors: [];
  messages: string[];
  resultCode: 0 | 1;
};

type TaskResponseType<T> = Omit<ResponseType<T>, "fieldsErrors">;

export const todolistAPI = {
  // Todolist
  getTodolist() {
    return instance.get<Array<TodolistItemDataType>>("todo-lists");
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType<{ item: TodolistItemDataType }>>(
      "todo-lists/" + todolistId,
      { title }
    );
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{}>>("todo-lists", { title });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`);
  },

  // Tasks
  getTasks(todolistId: string) {
    return instance.get<Array<TaskItemDataType>>(
      `todo-lists/${todolistId}/tasks`
    );
  },
  createTask(todolistId: string, title: string) {
    return instance.post<TaskResponseType<TaskItemDataType>>(
      `todo-lists/${todolistId}/tasks`,
      { title }
    );
  },
  updateTask(todolistId: string, taskId: string, title: string) {
    return instance.put<TaskResponseType<{}>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      { title }
    );
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<TaskResponseType<{}>>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
};
