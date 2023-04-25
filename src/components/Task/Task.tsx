import React, {FC} from "react";
import {TaskType} from "../../types";
import EditSpan from "../EditSpan/EditSpan";


type TasksPropsType = TaskType & {
  callback: (text: string) => void;
  onChange: () => void
  onClick: () => void
}

const Task: FC<TasksPropsType> = ({id, title, isDone, onChange, onClick, callback}) => {
  return (
    <li key={id} className={isDone ? "is-done" : ""}>
      <input type="checkbox" checked={isDone} onChange={onChange}/>
      <EditSpan title={title} onChange={callback}/>
      <button onClick={onClick}>x</button>
    </li>
  );
};

export default Task;