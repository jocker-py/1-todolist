import React, {FC} from "react";
import {TaskType} from "./Todolist";
import {Button} from "./Button";

export interface ITask extends TaskType {
  removeTask: (id: TaskType["id"]) => void;
  toggleIsDone: (id: TaskType["id"]) => void;
}

export const Task: FC<ITask> = ({id, isDone, title, removeTask, toggleIsDone}) => {
  return (
    <li>
      <input type="checkbox" onChange={() => toggleIsDone(id)} checked={isDone}/>
      <span>{title}</span>
      <Button callback={() => removeTask(id)} name={"x"}></Button>
    </li>
  );
};
