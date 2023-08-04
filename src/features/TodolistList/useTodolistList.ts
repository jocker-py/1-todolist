import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../state/store"
import {
  createTodolist,
  fetchTodolists,
  TodolistsStateType,
} from "./Todolist/todolistsReducer"

export const useTodolistList = () => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(
    (state) => state.todolists,
  ) as TodolistsStateType

  const { entityStatus } = useAppSelector((state) => state.app)
  const { isLoggedIn } = useAppSelector((state) => state.auth)

  const isLoading = entityStatus === "loading"

  const addTodolist = useCallback(
    (title: string) => dispatch(createTodolist(title)),
    [],
  )

  useEffect(() => {
    if (isLoggedIn) dispatch(fetchTodolists())
  }, [])

  return {
    addTodolist,
    todolists,
    isLoading,
    isLoggedIn,
  }
}
