import {TodoListType} from "../types";

type ActionType = {type: string};

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType) => {
  switch (action.type) {
    case "XXX":
      return state;
    default:
      throw new Error("Unknow action type");
  }
};