import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { todolistsReducer } from "../features/todolistsReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunk from "redux-thunk";
import { tasksReducer } from "../features/tasksReducer";

// root
const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

// store
export const store = createStore(rootReducer, applyMiddleware(thunk));

// typed hooks
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//types
type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
