import {incrementAge, userReducer} from "./user-reducer";

test("should increment only age", () => {
  const startState = {age: 20, childrenCount: 2, name: "Dimych"};
  const action = incrementAge();
  const endState = userReducer(startState, action);
  expect(endState.age).toBe(21);
  expect(endState.childrenCount).toBe(2);
  expect(endState.name).toBe("Dimych");
});