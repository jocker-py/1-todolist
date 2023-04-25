import React, {useState} from "react";
import "./App.css";
import {v1} from "uuid";
import {Todolist} from "./components/Todolist";
import {FilterValuesType, TaskType, TodoListTasksType, TodoListType} from "./types";

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
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Sugar", isDone: true},
      {id: v1(), title: "Tea", isDone: false},
      {id: v1(), title: "Salt", isDone: false},
      {id: v1(), title: "Coffee", isDone: false},
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

  function removeTodoList(todoListId: string) {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListId));
    delete tasks[todoListId];
  }

  function changeTaskText(id: string, text: string, todoListId: string) {
    setTasks({...tasks, [todoListId]: tasks[todoListId].map((task) => task.id === id ? {...task, title: text} : task)});
  }

  function changeTodoListTitle(text: string, todoListsId: string) {
    setTodoLists(todoLists.map(tl => tl.id === todoListsId ? {...tl, title: text} : tl));
  }

  return (
    <div className="App">
      {
        todoLists.map(tl => {
          const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter);
          return <Todolist key={tl.id}
                           title={tl.title}
                           filter={tl.filter}
                           todoListId={tl.id}
                           tasks={filteredTasks}

                           addTask={addTask}
                           removeTask={removeTask}
                           changeFilter={changeFilter}
                           removeTodoList={removeTodoList}
                           changeTaskText={changeTaskText}
                           changeTaskStatus={changeTaskStatus}
                           changeTodoListTitle={changeTodoListTitle}/>;
        })
      }
    </div>
  );
}

export default App;
