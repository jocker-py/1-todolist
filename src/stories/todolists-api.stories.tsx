import React, { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolist-api";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    debugger;
    todolistAPI.getTodolist().then((res) => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const title = "New Title";
    todolistAPI.createTodolist(title).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "03d95f04-f3df-4a02-aca4-ae010f5f543b";
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "03d95f04-f3df-4a02-aca4-ae010f5f543b";
    const title = "VLAD";
    todolistAPI.updateTodolist(todolistId, title).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "9a784d95-918d-4941-8e50-05d7273f96f0";
    todolistAPI.getTasks(todolistId).then((res) => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "9a784d95-918d-4941-8e50-05d7273f96f0";
    const title = "New Task title";
    todolistAPI.createTask(todolistId, title).then((res) => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "9a784d95-918d-4941-8e50-05d7273f96f0";
    const taskId = "9740bd93-9359-422b-9a38-7bbe6c8a8c52";
    const title = "UPDATED TASK TITLE >>>>>>>>>>>>";
    todolistAPI.updateTask(todolistId, taskId, title).then((res) => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "9a784d95-918d-4941-8e50-05d7273f96f0";
    const taskId = "bf4467bb-829d-4229-8dc8-2934509c9fd1";
    todolistAPI
      .deleteTask(todolistId, taskId)
      .then((res) => setState(res.data));
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};
