import {
  deleteTask,
  Status,
  TaskDomainType,
  TaskModelType,
  updateTaskModel,
} from "./tasksReducer";

import { useCallback, useMemo } from "react";
import { useAppDispatch } from "../../../state/store";

export const useTask = (task: TaskDomainType) => {
  const dispatch = useAppDispatch();
  const {
    id,
    todoListId,
    title,
    description,
    completed,
    priority,
    startDate,
    deadline,
    status,
    entityStatus,
  } = task;

  const taskModel: TaskModelType = useMemo(() => {
    return {
      title,
      description,
      completed,
      priority,
      startDate,
      deadline,
      status,
    };
  }, [title, description, completed, priority, startDate, deadline, status]);

  const changeTitle = useCallback(
    (newTitle: string) => {
      dispatch(
        updateTaskModel(id, todoListId, { ...taskModel, title: newTitle })
      );
    },
    [dispatch, id, todoListId, taskModel]
  );

  const changeStatus = useCallback(() => {
    const newStatus =
      status === Status.Completed ? Status.Active : Status.Completed;
    const newTaskModel = { ...taskModel, status: newStatus };
    dispatch(updateTaskModel(id, todoListId, newTaskModel));
  }, [dispatch, id, todoListId, status, taskModel]);

  const removeTask = useCallback(
    () => dispatch(deleteTask(id, todoListId)),
    [dispatch, id, todoListId]
  );

  const isCompleted = status === Status.Completed;
  const isLoading = entityStatus === "loading";

  return {
    changeTitle,
    changeStatus,
    removeTask,
    isCompleted,
    isLoading,
    title,
  };
};
