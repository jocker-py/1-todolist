import {TodoListType} from "../types";

type ActionType = ReturnType<typeof removeTodolist>;

export const removeTodolist = (id: string) => ({type: "REMOVE_TODOLIST", id} as const);
export const changeTodolistTitle = (title: string) => ({type: "CHANGE_TODOLIST_TITLE", title} as const);

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType) => {
  switch (action.type) {
    case "REMOVE_TODOLIST":
      return state.filter(tl => tl.id !== action.id);
    default:
      throw new Error("Unknown action type");
  }
};