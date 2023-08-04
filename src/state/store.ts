import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AppActionsType, appReducer } from "../app/appReducer"
import {
  TasksActionsType,
  tasksReducer,
} from "../features/TodolistList/Task/tasksReducer"
import {
  TodolistActionsType,
  todolistsReducer,
} from "../features/TodolistList/Todolist/todolistsReducer"
import { AuthActionsType, authReducer } from "../features/Login/auth-reducer"

// Root reducer
const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

// Store
const store = createStore(rootReducer, applyMiddleware(thunk))

// Types
type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ActionsType
>

type ActionsType =
  | TodolistActionsType
  | TasksActionsType
  | AppActionsType
  | AuthActionsType

export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { store }
