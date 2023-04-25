import React, {FC} from "react";
import EditSpan from "../EditSpan/EditSpan";

type HeaderTodoListPropsType = {
  title: string
  onChange: (title: string) => void
  onClick: () => void
}

const HeaderTodoList: FC<HeaderTodoListPropsType> = ({title, onClick, onChange}) => {
  return (
    <h3>
      <EditSpan title={title} onChange={onChange}/>
      <button onClick={onClick}>x</button>
    </h3>
  );
};

export default HeaderTodoList;