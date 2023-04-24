import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
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
    [todoListId_1]: [
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
    ],
  });

  function removeTask(id: string, todoListId: string) {
    setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== id)});
  }

  function addTask(title: string, todoListId: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]});
  }

  function changeTaskStatus(id: string, todoListId: string) {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((task) => task.id === id ? {...task, isDone: !task.isDone} : task),
    });
  }

  function getFilteredTasks(tasks: Array<TaskType>, filter: FilterValuesType) {
    switch (filter) {
      case "active":
        return tasks.filter(t => !t.isDone);
      case "completed":
        return tasks.filter(t => t.isDone);
      default:
        return tasks;
    }
  }

  function changeFilter(filter: FilterValuesType, todoListId: string) {
    setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter} : tl));
  }

  return (
    <div className="App">
      {
        todoLists.map(tl => {
          const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter);
          return <Todolist key={tl.id}
                           todoListId={tl.id}
                           title={tl.title}
                           tasks={filteredTasks}
                           filter={tl.filter}
                           removeTask={removeTask}
                           changeFilter={changeFilter}
                           addTask={addTask}
                           changeTaskStatus={changeTaskStatus}
          />;
        })
      }
    </div>
  );
}

export default App;
