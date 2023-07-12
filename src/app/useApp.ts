import { useAppDispatch, useAppSelector } from "../state/store";
import {
  createTodolist,
  fetchTodolists,
  TodolistsStateType,
} from "../features/todolistsReducer";
import { useCallback, useEffect } from "react";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector(
    (state) => state.todolists
  ) as TodolistsStateType;

  const addTodolist = useCallback(
    (title: string) => dispatch(createTodolist(title)),
    []
  );

  useEffect(() => {
    dispatch(fetchTodolists());
  }, []);

  return {
    addTodolist,
    todolists,
  };
};
