import React, { FC } from "react";
import { EditableSpan } from "../../components/EditableSpan/EditableSpan";
import { deleteTodolist, updateTodolistTitle } from "../todolistsReducer";
import { useAppDispatch } from "../../state/store";

type HeadPropsType = {
  id: string;
  title: string;
};

const Head: FC<HeadPropsType> = ({ id, title }) => {
  const dispatch = useAppDispatch();
  const changeTitle = (title: string) => {
    // @ts-ignore
    dispatch(updateTodolistTitle(id, title));
  };
  const onClickHandler = () => {
    // @ts-ignore
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

export default Head;
