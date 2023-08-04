// initial
import { clearData, EntityStatusType } from "../Todolist/todolistsReducer";
import {
  handleNetworkAppError,
  handleServerAppError,
} from "../../../utils/error/error";
import { AppDispatch, AppThunk } from "../../../state/store";
import { AxiosError } from "axios";
import { todolistsAPI } from "../../../api/api";
import { setAppStatus } from "../../../app/appReducer";

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
    case "TASKS/SET_TASK_ENTITY_STATUS":
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map((task) =>
          task.id === action.taskID
            ? { ...task, entityStatus: action.status }
            : task
        ),
      };
    case "CLEAR_DATA":
      return {};
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

export const setTaskEntityStatus = (
  taskID: string,
  todolistID: string,
  status: EntityStatusType
) =>
  ({
    type: "TASKS/SET_TASK_ENTITY_STATUS",
    taskID,
    todolistID,
    status,
  } as const);

// thunks
export const fetchTasks =
  (todolistID: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatus("loading"));
    todolistsAPI
      .getTasks(todolistID)
      .then((data) => {
        if (data) {
          dispatch(setTasks(todolistID, data.items));
          dispatch(setAppStatus("succeeded"));
        }
      })
      .catch((e: AxiosError) => {
        handleServerAppError(e, dispatch);
      });
  };

export const createTask =
  (todolistID: string, title: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatus("loading"));
    todolistsAPI
      .createTask(todolistID, title)
      .then((res) => {
        if (res && res.resultCode === 0) {
          dispatch(addTask(todolistID, res.data.item));
          dispatch(setAppStatus("succeeded"));
        } else {
          handleNetworkAppError(res, dispatch);
        }
      })
      .catch((e: AxiosError) => {
        handleServerAppError(e, dispatch);
      });
  };

export const updateTaskModel =
  (taskID: string, todolistID: string, task: TaskModelType): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatus("loading"));
    dispatch(setTaskEntityStatus(taskID, todolistID, "loading"));
    todolistsAPI
      .updateTaskModel(taskID, todolistID, task)
      .then((res) => {
        if (res && res.resultCode === 0) {
          dispatch(updateTask(taskID, todolistID, task));
          dispatch(setAppStatus("succeeded"));
          dispatch(setTaskEntityStatus(taskID, todolistID, "succeeded"));
        } else {
          handleNetworkAppError(res, dispatch);
          dispatch(setTaskEntityStatus(taskID, todolistID, "failed"));
        }
      })
      .catch((e: AxiosError) => {
        handleServerAppError(e, dispatch);
      });
  };
export const deleteTask =
  (taskID: string, todolistID: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatus("loading"));
    dispatch(setTaskEntityStatus(taskID, todolistID, "loading"));
    todolistsAPI
      .deleteTask(taskID, todolistID)
      .then((res) => {
        if (res && res.resultCode === 0) {
          dispatch(removeTask(taskID, todolistID));
          dispatch(setAppStatus("succeeded"));
        } else {
          handleNetworkAppError(res, dispatch);
          dispatch(setTaskEntityStatus(taskID, todolistID, "failed"));
        }
      })
      .catch((e: AxiosError) => {
        handleServerAppError(e, dispatch);
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
  | ReturnType<typeof updateTask>
  | ReturnType<typeof setTaskEntityStatus>
  | ReturnType<typeof clearData>;
