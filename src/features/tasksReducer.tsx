// initial
import { EntityStatusType } from "./todolistsReducer";
import { todolistsAPI } from "../api/api";
import { AppThunk } from "../state/store";
import { setAppError, setAppStatus } from "../app/appReducer";

const initialState: TasksStateType = {};

// reducer
export const tasksReducer = (
  state = initialState,
  action: TasksActionsType
) => {
  switch (action.type) {
    case "TASKS/SET_TASKS":
      return {
        ...state,
        [action.todolistID]: action.tasks.map((task) => ({
          ...task,
          entityStatus: "idle",
        })),
      };

    case "TASKS/ADD_TASK":
      return {
        ...state,
        [action.todolistID]: [
          { ...action.task, entityStatus: "idle" },
          ...state[action.todolistID],
        ],
      };

    case "TASKS/UPDATE_TASK":
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map((task) =>
          task.id === action.taskID ? { ...task, ...action.task } : task
        ),
      };

    case "TASKS/REMOVE_TASK":
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter(
          (task) => task.id !== action.taskID
        ),
      };
    default:
      return state;
  }
};

// actions
export const setTasks = (todolistID: string, tasks: Array<TaskType>) =>
  ({ type: "TASKS/SET_TASKS", todolistID, tasks } as const);

export const addTask = (todolistID: string, task: TaskType) =>
  ({ type: "TASKS/ADD_TASK", todolistID, task } as const);

export const updateTask = (
  taskID: string,
  todolistID: string,
  task: TaskModelType
) => ({ type: "TASKS/UPDATE_TASK", taskID, todolistID, task } as const);

export const removeTask = (taskID: string, todolistID: string) =>
  ({ type: "TASKS/REMOVE_TASK", taskID, todolistID } as const);

// thunks
export const fetchTasks =
  (todolistID: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus("loading"));
    todolistsAPI.getTasks(todolistID).then((data) => {
      if (data) {
        dispatch(setTasks(todolistID, data.items));
        dispatch(setAppStatus("succeeded"));
      }
    });
  };

export const createTask =
  (todolistID: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus("loading"));
    todolistsAPI.createTask(todolistID, title).then((res) => {
      if (res && res.resultCode === 0) {
        dispatch(addTask(todolistID, res.data.item));
        dispatch(setAppStatus("succeeded"));
      } else {
        dispatch(setAppStatus("failed"));
        dispatch(setAppError("Some error"));
      }
    });
  };
export const updateTaskModel =
  (taskID: string, todolistID: string, task: TaskModelType): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus("loading"));
    todolistsAPI.updateTaskModel(taskID, todolistID, task).then((res) => {
      if (res && res.resultCode === 0) {
        dispatch(updateTask(taskID, todolistID, task));
        dispatch(setAppStatus("succeeded"));
      } else {
        dispatch(setAppStatus("failed"));
        dispatch(setAppError("Some error"));
      }
    });
  };
export const deleteTask =
  (taskID: string, todolistID: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus("loading"));
    todolistsAPI.deleteTask(taskID, todolistID).then((res) => {
      if (res && res.resultCode === 0) {
        dispatch(removeTask(taskID, todolistID));
        dispatch(setAppStatus("succeeded"));
      } else {
        dispatch(setAppStatus("failed"));
        dispatch(setAppError("Some error"));
      }
    });
  };

// types

export enum Status {
  New = 0,
  Completed = 1,
  Active = 2,
}

export type TaskModelType = {
  title: string;
  description: string | null;
  completed: boolean;
  status: Status;
  priority: number;
  startDate: string | null;
  deadline: string | null;
};

export type TaskType = TaskModelType & {
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type TaskDomainType = TaskType & {
  entityStatus: EntityStatusType;
};

type TasksStateType = { [key: string]: Array<TaskDomainType> };

export type TasksActionsType =
  | ReturnType<typeof setTasks>
  | ReturnType<typeof addTask>
  | ReturnType<typeof removeTask>
  | ReturnType<typeof updateTask>;
