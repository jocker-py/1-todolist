import React, {FC} from "react";

type ButtonType = {
  callback: () => void;
  name: string;
}

export const Button: FC<ButtonType> = ({name, callback}) => {
  const onClickHandler = () => {
    callback();
  };
  return (
    <button onClick={onClickHandler}>{name}</button>
  );
};
