type StateType = { age: number, name: string, childrenCount: number };
type ActionType = ReturnType<typeof incrementAge>;

export const incrementAge = () => ({type: "INCREMENT_AGE"} as const);

export const userReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "INCREMENT_AGE":
      return {
        ...state,
        age: state.age + 1,
      };
    default:
      throw new Error("Unknown action type");
  }
};