import React, { FC } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  deleteTodolist,
  updateTodolistTitle,
} from "features/TodolistList/Todolist/todolistsThunks"
import EditableSpan from "components/EditableSpan/EditableSpan"
import { useAppDispatch } from "app/store"
import { Button } from "components/Button/Button"
import { EntityStatusType } from "features/TodolistList/Todolist/todolistsReducer"

type HeadPropsType = {
  id: string
  title: string
  entityStatus: EntityStatusType
}

const Hat: FC<HeadPropsType> = ({ id, title, entityStatus }) => {
  const dispatch = useAppDispatch()
  const changeTitle = (title: string) => {
    dispatch(updateTodolistTitle(id, title))
  }
  const removeTodolist = () => {
    dispatch(deleteTodolist(id))
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <EditableSpan title={title} changeTitle={changeTitle} />
      <Button
        onClick={removeTodolist}
        title={"Delete Todolist"}
        size={"small"}
        icon={<DeleteIcon />}
        disabled={entityStatus === "loading"}
      />
    </div>
  )
}

export default Hat
