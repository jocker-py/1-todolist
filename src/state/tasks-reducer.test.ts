import {
  addTask,
  removeTask,
  changeTaskStatus,
  changeTaskTitle,
  tasksReducer,
} from "./tasks-reducer";
import {TasksStateType} from "../types";
import {addTodolist, removeTodolist} from "./todolists-reducer";
import {v1} from "uuid";

let startState: TasksStateType;
let todolistId_1: string;
let todolistId_2: string;

beforeEach(() => {
  todolistId_1 = v1();
  todolistId_2 = v1();

  startState = {
    [todolistId_1]: [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false},
    ],
    [todolistId_2]: [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false},
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  const action = removeTask("2", todolistId_2);
  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    [todolistId_1]: [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false},
    ],
    [todolistId_2]: [
      {id: "1", title: "bread", isDone: false},
      {id: "3", title: "tea", isDone: false},
    ],
  });
});

test("correct task should be added to correct array", () => {
  const action = addTask("juce", todolistId_2);
  const endState = tasksReducer(startState, action);

  expect(endState[todolistId_1].length).toBe(3);
  expect(endState[todolistId_2].length).toBe(4);
  expect(endState[todolistId_2][0].id).toBeDefined();
  expect(endState[todolistId_2][0].title).toBe("juce");
  expect(endState[todolistId_2][0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
  const action = changeTaskStatus("2", false, todolistId_2);
  const endState = tasksReducer(startState, action);

  expect(endState[todolistId_1][1].isDone).toBe(true);
  expect(endState[todolistId_2][1].isDone).toBe(false);
});

test("title of specified task should be changed", () => {
  const action = changeTaskTitle("2", "new Title", todolistId_2);
  const endState = tasksReducer(startState, action);

  expect(endState[todolistId_1][1].title).toBe("JS");
  expect(endState[todolistId_2][1].title).toBe("new Title");
});

test("new array should be added when new todolist is added", () => {
  const action = addTodolist("new todolist");
  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== todolistId_1 && k !== todolistId_2);
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const action = removeTodolist(todolistId_2);
  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todolistId_2]).not.toBeDefined();
});
