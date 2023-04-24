import React, {FC} from "react";

type HeaderTodoListPropsType = {
  title: string
  callback: () => void
}


const HeaderTodoList: FC<HeaderTodoListPropsType> = ({title, callback}) => {
  return (
    <h3>{title}
      <button onClick={callback}>x</button>
    </h3>
  );
};

export default HeaderTodoList;