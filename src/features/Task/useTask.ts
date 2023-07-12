import {
  deleteTask,
  Status,
  TaskDomainType,
  TaskModelType,
  updateTaskModel,
} from "../tasksReducer";
import { useAppDispatch } from "../../state/store";
import { useCallback, useMemo } from "react";

export const useTask = (task: TaskDomainType) => {
  const dispatch = useAppDispatch();
  const taskModel: TaskModelType = useMemo(() => {
    return {
      title: task.title,
      description: task.description,
      completed: task.completed,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
    };
  }, [task]);

  const changeTaskTitle = useCallback(
    (newTitle: string) => {
      const newTaskModel = { ...taskModel, title: newTitle };
      dispatch(updateTaskModel(task.id, task.todoListId, newTaskModel));
    },
    [dispatch, task.title, taskModel]
  );

  const removeTask = useCallback(() => {
    dispatch(deleteTask(task.id, task.todoListId));
  }, [dispatch, task]);

  const changeTaskStatus = useCallback(() => {
    const newStatus =
      task.status === Status.Active ? Status.Completed : Status.Active;
    const newTaskModel = {
      ...taskModel,
      status: newStatus,
    };
    dispatch(updateTaskModel(task.id, task.todoListId, newTaskModel));
  }, [dispatch, task.status, taskModel]);
  return {
    changeTaskTitle,
    changeTaskStatus,
    removeTask,
    status: task.status,
    entityStatus: task.entityStatus,
    title: task.title,
  };
};
