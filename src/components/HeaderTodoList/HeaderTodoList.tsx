import React, {FC} from "react";
import EditSpan from "../EditSpan/EditSpan";

type HeaderTodoListPropsType = {
  title: string
  updateItem: (text: string) => void
  callback: () => void
}


const HeaderTodoList: FC<HeaderTodoListPropsType> = ({title, callback, updateItem}) => {
  return (
    <h3>
      <EditSpan title={title} updateItem={updateItem}/>
      <button onClick={callback}>x</button>
    </h3>
  );
};

export default HeaderTodoList;