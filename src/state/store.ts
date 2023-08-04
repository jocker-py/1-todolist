import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import {
  TodolistActionsType,
  todolistsReducer,
} from "../features/TodolistList/Todolist/todolistsReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  TasksActionsType,
  tasksReducer,
} from "../features/TodolistList/Task/tasksReducer";
import { AppActionsType, appReducer } from "../app/appReducer";
import { AuthActionsType, authReducer } from "../features/Login/auth-reducer";

// root
const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
});

// store
export const store = createStore(rootReducer, applyMiddleware(thunk));

//types
type ActionsType =
  | TodolistActionsType
  | TasksActionsType
  | AppActionsType
  | AuthActionsType;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<AppState, unknown, ActionsType>;

// typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
//: DispatchFunc = useDispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  ActionsType
>;
