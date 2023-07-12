import React, { FC, memo } from "react";
import { Status, TaskDomainType } from "../tasksReducer";
import EditableSpan from "../../components/EditableSpan/EditableSpan";
import { useTask } from "./useTask";
import { Button } from "../../components/Button/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const Task: FC<TaskDomainType> = (task) => {
  const {
    changeTaskStatus,
    changeTaskTitle,
    removeTask,
    status,
    entityStatus,
    title,
  } = useTask(task);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <input
        type="checkbox"
        checked={status === Status.Completed}
        onChange={changeTaskStatus}
      />
      <EditableSpan title={title} changeTitle={changeTaskTitle} />
      <Button
        onClick={removeTask}
        title={"Delete Task"}
        icon={<DeleteIcon />}
        size={"small"}
        disabled={entityStatus === "loading"}
      />
    </div>
  );
};

export default memo(Task);
