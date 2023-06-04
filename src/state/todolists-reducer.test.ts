import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../types";
import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  removeTodolist,
  todolistsReducer,
} from "./todolists-reducer";

let todolistId_1: string;
let todolistId_2: string;
let startState: Array<TodolistType>;

beforeEach(() => {
  todolistId_1 = v1();
  todolistId_2 = v1();
  startState = [
    {id: todolistId_1, title: "What to learn", filter: "all"},
    {id: todolistId_2, title: "What to buy", filter: "all"},
  ];
});

test("should remove first todolist", () => {
  const action = removeTodolist(todolistId_1);
  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId_2);
});

test("should change name of second todolist", () => {
  const newTodolistTitle = "New todolist";
  const action = changeTodolistTitle(newTodolistTitle, todolistId_2);
  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("should add new todolist", () => {
  const newTodolistTitle = "New todolist";
  const action = addTodolist(newTodolistTitle);
  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe("What to buy");
  expect(endState[2].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed";
  const action = changeTodolistFilter(newFilter, todolistId_2);
  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
