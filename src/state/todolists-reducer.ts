import {TodoListType} from "../types";

type ActionType = ReturnType<typeof removeTodolist>;

export const removeTodolist = (id: string) => ({type: "REMOVE_TODOLIST", id} as const);

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType) => {
  switch (action.type) {
    case "XXX":
      return state;
    default:
      throw new Error("Unknow action type");
  }
};