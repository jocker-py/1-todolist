type StateType = { age: number, name: string, childrenCount: number };
type ActionType = any;

export const incrementAge = () => ({type: "INCREMENT_AGE"} as const);

export const userReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "XXX":
      return state;
    default:
      throw new Error("Unknown action type");
  }
};