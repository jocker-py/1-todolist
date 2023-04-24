import React, {FC} from "react";
import {TaskType} from "../../types";


type TasksPropsType = TaskType & {
  onChange: () => void
  onClick: () => void
}

const Task: FC<TasksPropsType> = ({id, title, isDone, onChange, onClick}) => {
  return (
    <li key={id} className={isDone ? "is-done" : ""}>
      <input type="checkbox" checked={isDone} onChange={onChange}/>
      <span>{title}</span>
      <button onClick={onClick}>x</button>
    </li>
  );
};

export default Task;