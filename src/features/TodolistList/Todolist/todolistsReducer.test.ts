import { v1 } from "uuid"
import {
  EntityStatusType,
  FilterType,
  TodolistDomainType,
  todolistsActions,
  todolistsReducer,
  TodolistType,
} from "features/TodolistList/Todolist/todolistsReducer"

let action: any
let todolistId1: string
let todolistId2: string
let todolists: Array<TodolistType> = []
let startState: Array<TodolistDomainType> = []

describe("tests for setTodolist action", () => {
  beforeEach(() => {
    startState = []
    todolists = [
      { id: v1(), addedDate: "", order: 0, title: "What to buy" },
      { id: v1(), addedDate: "", order: 1, title: "What to learn" },
    ]
    action = todolistsActions.setTodolists({ todolists })
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

describe("tests for remove todolist action", () => {
  beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
      {
        id: todolistId1,
        addedDate: "",
        order: 0,
        title: "What to buy",
        entityStatus: "idle",
        filter: "all",
      },
      {
        id: todolistId2,
        addedDate: "",
        order: 1,
        title: "What to learn",
        entityStatus: "idle",
        filter: "all",
      },
    ]

    action = todolistsActions.removeTodolist({ id: todolistId1 })
  })
  test("should remove correct todolist", () => {
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState.some((item) => item.id === todolistId1)).toBe(false)
    expect(endState.some((item) => item.id === todolistId2)).toBe(true)
  })
})

describe("tests for add todolist action", () => {
  beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
      {
        id: todolistId1,
        addedDate: "",
        order: 0,
        title: "What to buy",
        entityStatus: "idle",
        filter: "all",
      },
    ]
    let newTodolist = {
      id: todolistId2,
      addedDate: "",
      order: 1,
      title: "What to learn",
    }
    action = todolistsActions.addTodolist({ todolist: newTodolist })
  })
  test("should add correct todolist", () => {
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState.some((item) => item.id === todolistId1)).toBe(true)
    expect(endState.some((item) => item.id === todolistId2)).toBe(true)

    expect(endState[1].filter).toBe("all")
    expect(endState[1].entityStatus).toBe("idle")
  })
})

describe("tests for change todolist actions", () => {
  beforeEach(() => {
    todolistId1 = v1()
    startState = [
      {
        id: todolistId1,
        addedDate: "",
        order: 0,
        title: "What to buy",
        entityStatus: "idle",
        filter: "all",
      },
    ]
  })
  test("should change correct title todolist", () => {
    const newTitle = "New Title"
    const action = todolistsActions.changeTodolistTitle({
      id: todolistId1,
      title: newTitle,
    })
    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe(newTitle)
    expect(endState[0].id).toBe(todolistId1)
  })

  test("should change correct filter todolist", () => {
    const newFilter = "active" as FilterType
    const action = todolistsActions.changeTodolistFilter({
      id: todolistId1,
      filter: newFilter,
    })
    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe(newFilter)
    expect(endState[0].id).toBe(todolistId1)
  })

  test("should change correct entityStatus todolist", () => {
    const newEntityStatus = "loading" as EntityStatusType
    const action = todolistsActions.changeTodolistEntityStatus({
      id: todolistId1,
      entityStatus: newEntityStatus,
    })
    const endState = todolistsReducer(startState, action)

    expect(endState[0].entityStatus).toBe(newEntityStatus)
    expect(endState[0].id).toBe(todolistId1)
  })
})
