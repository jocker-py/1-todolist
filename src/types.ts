export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksStateType = {
  [todoListId: string]: Array<TaskType>
}

export type TodolistStateType = Array<TodolistType>