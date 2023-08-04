import {
  setTodolists,
  TodolistActionsType,
  TodolistDomainType,
  todolistsReducer,
  TodolistType,
} from "./todolistsReducer"
import { v1 } from "uuid"

let startState: Array<TodolistDomainType>
let todolists: Array<TodolistType>
let action: TodolistActionsType

describe("tests for setTodolist action", () => {
  beforeEach(() => {
    startState = []
    todolists = [
      { id: v1(), addedDate: "", order: 0, title: "What to buy" },
      { id: v1(), addedDate: "", order: 1, title: "What to learn" },
    ]
    action = setTodolists(todolists)
  })
  test("should set new Todolists", () => {
    const endState = todolistsReducer(startState, action)
    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("What to buy")
    expect(endState[1].title).toBe("What to learn")
  })

  test("should add entityStatus: idle", () => {
    const endState = todolistsReducer(startState, action)
    expect(endState.every((tl) => tl.hasOwnProperty("entityStatus"))).toBe(true)
    expect(endState.every((tl) => tl["entityStatus"] === "idle")).toBe(true)
  })

  test("should add filter: all", () => {
    const endState = todolistsReducer(startState, action)
    expect(endState.every((tl) => tl.hasOwnProperty("filter"))).toBe(true)
    expect(endState.every((tl) => tl["filter"] === "all")).toBe(true)
  })
})
