import React, { FC } from "react";
import Task from "./Task";
import { useAppSelector } from "../../state/store";
import { TaskDomainType } from "../tasksReducer";

type TasksListPropsType = {
  id: string;
};

const TasksList: FC<TasksListPropsType> = ({ id }) => {
  const tasks = useAppSelector(
    (state) => state.tasks[id]
  ) as Array<TaskDomainType>;
  return (
    <div>{tasks && tasks.map((task) => <Task key={task.id} {...task} />)}</div>
  );
};

export default TasksList;
