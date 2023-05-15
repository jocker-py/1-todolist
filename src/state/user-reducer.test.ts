import {changeName, incrementAge, incrementChildrenCount, userReducer} from "./user-reducer";

test("should increment only age", () => {
  const startState = {age: 20, childrenCount: 2, name: "Dimych"};
  const action = incrementAge();
  const endState = userReducer(startState, action);
  expect(endState.age).toBe(21);
  expect(endState.childrenCount).toBe(2);
  expect(endState.name).toBe("Dimych");
});

test("should increment only children count", () => {
  const startState = {age: 20, childrenCount: 2, name: "Dimych"};
  const action = incrementChildrenCount();
  const endState = userReducer(startState, action);
  expect(endState.age).toBe(20);
  expect(endState.childrenCount).toBe(3);
  expect(endState.name).toBe("Dimych");
});

test("should only change name", () => {
  const startState = {age: 20, childrenCount: 2, name: "Dimych"};
  const newName = "Vlad";
  const action = changeName(newName);
  const endState = userReducer(startState, action);
  expect(endState.age).toBe(20);
  expect(endState.childrenCount).toBe(2);
  expect(endState.name).toBe(newName);
  expect(endState.name).toEqual(newName);
});