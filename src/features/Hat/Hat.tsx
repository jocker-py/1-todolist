import React, { FC } from "react";
import EditableSpan from "../../components/EditableSpan/EditableSpan";
import { deleteTodolist, updateTodolistTitle } from "../todolistsReducer";
import { useAppDispatch } from "../../state/store";

type HeadPropsType = {
  id: string;
  title: string;
};

const Hat: FC<HeadPropsType> = ({ id, title }) => {
  const dispatch = useAppDispatch();
  const changeTitle = (title: string) => {
    dispatch(updateTodolistTitle(id, title));
  };
  const onClickHandler = () => {
    dispatch(deleteTodolist(id));
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <EditableSpan title={title} changeTitle={changeTitle} />
      <button onClick={onClickHandler}>x</button>
    </div>
  );
};

export default Hat;
