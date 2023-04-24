import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
  id: string
  title: string
  filter: string
}
type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type TodoListTasksType = {
  [todoListId: string]: Array<TaskType>
}

function App() {
  const todoListId_1 = v1();
  const todoListId_2 = v1();
  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListId_1, title: "What to Learn", filter: "all"},
    {id: todoListId_2, title: "What to Buy", filter: "all"},
  ]);
  const [tasks, setTasks] = useState<TodoListTasksType>({
   [todoListId_1] : [
      {id: v1(), title: "HTML&CSS", isDone: true},
  {id: v1(), title: "JS", isDone: true},
  {id: v1(), title: "ReactJS", isDone: false},
  {id: v1(), title: "Rest API", isDone: false},
  {id: v1(), title: "GraphQL", isDone: false},
],
  [todoListId_2]: [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ]
  })

  function removeTask(id: string, todoListId: string) {
    setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== id)});
  }

  function addTask(title: string) {
    let task = {id: v1(), title: title, isDone: false};
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
  }

  function changeTaskStatus(id: string) {
    const updatedTasks = tasks.map((task) => task.id === id ? {...task, isDone: !task.isDone} : task);
    setTasks(updatedTasks);
  }

  let [filter, setFilter] = useState<FilterValuesType>("all");

  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => t.isDone === false);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone === true);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }


  return (
    <div className="App">
      <Todolist title="What to learn"
                tasks={tasksForTodolist}
                filter={filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;
