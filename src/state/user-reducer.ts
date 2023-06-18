type StateType = { age: number; name: string; childrenCount: number };
type ActionType =
  | ReturnType<typeof incrementAge>
  | ReturnType<typeof incrementChildrenCount>
  | ReturnType<typeof changeName>;

export const incrementAge = () => ({ type: "INCREMENT_AGE" } as const);
export const changeName = (name: string) =>
  ({ type: "CHANGE_NAME", name } as const);
export const incrementChildrenCount = () =>
  ({ type: "INCREMENT_CHILDREN_COUNT" } as const);

export const userReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "INCREMENT_AGE":
      return {
        ...state,
        age: state.age + 1,
      };
    case "INCREMENT_CHILDREN_COUNT":
      return {
        ...state,
        childrenCount: state.childrenCount + 1,
      };
    case "CHANGE_NAME":
      return {
        ...state,
        name: action.name,
      };
    default:
      throw new Error("Unknown action type");
  }
};
