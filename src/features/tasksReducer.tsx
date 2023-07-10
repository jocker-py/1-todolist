// initial
import { EntityStatusType } from "./todolistsReducer";
import { todolistsAPI } from "../api/api";
import { AppDispatch } from "../state/store";

const initialState: TasksStateType = {};

// reducer
export const tasksReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case "TASKS/SET_TASKS":
    default:
      return state;
  }
};

// actions
export const setTasks = (todolistID: string, tasks: Array<TaskType>) =>
  ({ type: "TASKS/SET_TASKS", todolistID, tasks } as const);

// thunks
export const fetchTasks = (todolistID: string) => (dispatch: AppDispatch) => {
  todolistsAPI.getTasks(todolistID).then((data) => {
    if (data) {
      dispatch(setTasks(todolistID, data.items));
    }
  });
};

// types
//
// enum Status {
//   New = 0,
// }

export type TaskType = {
  description: string | null;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string | null;
  deadline: string | null;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type TaskDomainType = TaskType & {
  entityStatus: EntityStatusType;
};

type TasksStateType = { [key: string]: Array<TaskDomainType> };

type ActionsType = ReturnType<typeof setTasks>;
