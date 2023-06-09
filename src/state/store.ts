import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import {
  TodolistActionsType,
  todolistsReducer,
} from "../features/todolistsReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TasksActionsType, tasksReducer } from "../features/tasksReducer";

// root
const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

// store
export const store = createStore(rootReducer, applyMiddleware(thunk));

//types
type AppActionsType = TodolistActionsType | TasksActionsType;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<AppState, unknown, AppActionsType>;

// typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
//: DispatchFunc = useDispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AppActionsType
>;
