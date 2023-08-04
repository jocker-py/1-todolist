import { useAppDispatch, useAppSelector } from "../../../state/store"
import { filteredTasks } from "../../../utils/filter/filterTasks"
import { changeTodolistFilter, TodolistDomainType } from "./todolistsReducer"
import { createTask, TaskDomainType } from "../Task/tasksReducer"
import { useCallback, useMemo } from "react"

export const useTodolist = ({
  id,
  title,
  entityStatus,
  filter,
}: TodolistDomainType) => {
  const dispatch = useAppDispatch()
  const setFilterAll = () => dispatch(changeTodolistFilter(id, "all"))
  const setFilterActive = () => dispatch(changeTodolistFilter(id, "active"))
  const setFilterCompleted = () =>
    dispatch(changeTodolistFilter(id, "completed"))

  let tasks = useAppSelector(
    (state) => state.tasks[id],
  ) as Array<TaskDomainType>

  const addTask = useCallback(
    (title: string) => {
      dispatch(createTask(id, title))
    },
    [dispatch, id],
  )

  tasks = useMemo(() => {
    return filteredTasks(tasks, filter)
  }, [tasks, filter])

  const isLoading = entityStatus === "loading"
  return {
    id,
    title,
    entityStatus,
    filter,
    addTask,
    tasks,
    isLoading,
    setFilterCompleted,
    setFilterActive,
    setFilterAll,
  }
}
