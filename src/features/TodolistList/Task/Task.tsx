import React, { FC, memo } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import EditableSpan from "../../../components/EditableSpan/EditableSpan"
import { Button } from "../../../components/Button/Button"
import { useTask } from "./useTask"
import { TaskDomainType } from "./tasksReducer"

const Task: FC<TaskDomainType> = (task) => {
  const {
    changeStatus,
    changeTitle,
    removeTask,
    title,
    isCompleted,
    isLoading,
  } = useTask(task)

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
        checked={isCompleted}
        onChange={changeStatus}
        disabled={isLoading}
      />
      <EditableSpan title={title} changeTitle={changeTitle} />
      <Button
        onClick={removeTask}
        title={"Delete Task"}
        icon={<DeleteIcon />}
        size={"small"}
        disabled={isLoading}
      />
    </div>
  )
}

export default memo(Task)
