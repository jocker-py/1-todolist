import React, {FC, useCallback, useMemo} from "react";
import Task from "./Task/Task";
import {FilterValuesType, TaskType, TodolistType} from "../types";
import AddInputForm from "./AddInputForm/AddInputForm";
import HeaderTodoList from "./HeaderTodoList/HeaderTodoList";
import {Stack, Divider} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStoreType} from "../state/store";
import {changeTodolistTitle, removeTodolist} from "../state/todolists-reducer";
import {addTask} from "../state/tasks-reducer";
import ButtonsTodolist from "./ButtonsTodolist/ButtonsTodolist";

const Todolist: FC<TodolistType> = (todolist) => {
  const {id, title, filter} = todolist;
  const tasks = useSelector<AppRootStoreType, Array<TaskType>>(state => state.tasks[id]);
  const dispatch = useDispatch();

  const getFilteredTasks = useMemo(() => {
    return (tasks: Array<TaskType>, filter: FilterValuesType) => {
      switch (filter) {
        case "completed":
          return tasks.filter(task => task.isDone);
        case "active":
          return tasks.filter(task => !task.isDone);
        case "all":
        default:
          return tasks;
      }
    };
  }, []);


  const onChangeTodolistTitle = useCallback((title: string) =>
    dispatch(changeTodolistTitle(title, id)), [dispatch, id]);

  const onRemoveTodolist = useCallback(() =>
    dispatch(removeTodolist(id)), [dispatch, id]);

  const addTaskItem = useCallback((title: string) =>
    dispatch(addTask(title, id)), [dispatch, id]);

  return (
    <div>
      <HeaderTodoList title={title} variant={"h6"} weight={"bold"}
                      onChange={onChangeTodolistTitle} onClick={onRemoveTodolist}/>
      <AddInputForm addItem={addTaskItem} title={"Task"}/>
      <Stack direction="column" divider={<Divider orientation="horizontal" flexItem/>}>
        {getFilteredTasks(tasks, filter).map(t => <Task key={t.id} {...t} todolistId={id}/>)}
      </Stack>
      <ButtonsTodolist {...todolist} />
    </div>
  );
};

export default React.memo(Todolist);

