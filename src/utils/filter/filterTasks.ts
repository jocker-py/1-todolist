import { Status, TaskDomainType } from "../../features/tasksReducer";
import { FilterType } from "../../features/todolistsReducer";

const completedTasks = (task: TaskDomainType) =>
  task.status === Status.Completed;

const activeTasks = (task: TaskDomainType) => task.status !== Status.Completed;

export const filteredTasks = (
  tasks: Array<TaskDomainType>,
  filter: FilterType
) => {
  switch (filter) {
    case "completed":
      return tasks.filter(completedTasks);
    case "active":
      return tasks.filter(activeTasks);
    case "all":
    default:
      return tasks;
  }
};
