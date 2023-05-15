import {v1} from "uuid";
import {TodoListType} from "../types";
import {removeTodolist, todolistsReducer} from "./todolists-reducer";

test("should remove first todolist", () => {
  const todolistId_1 = v1();
  const todolistId_2 = v1();
  const startState: Array<TodoListType> = [
    {id: todolistId_1, title: "What to learn", filter: "all"},
    {id: todolistId_2, title: "What to buy", filter: "all"},
  ];
  const action = removeTodolist(todolistId_1);
  const endState = todolistsReducer(startState, action);
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId_2);
});

test("should change name of second todolist", () => {
  const todolistId_1 = v1();
  const todolistId_2 = v1();
  const startState: Array<TodoListType> = [
    {id: todolistId_1, title: "What to learn", filter: "all"},
    {id: todolistId_2, title: "What to buy", filter: "all"},
  ];
  const newTodolistTitle = "New todolist";
  const action = changeTodolistTitle(todolistId_2, newTodolistTitle);
  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});