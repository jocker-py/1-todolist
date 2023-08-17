import { appActions, appReducer, InitialAppStateType } from "app/appReducer";

describe("app slice", function() {
  const initialState: InitialAppStateType = {
    error: null,
    entityStatus: "idle",
    isInitialized: false
  };

  it("should set correct message", () => {
    const endState = appReducer(
      initialState,
      appActions.setAppError({ error: "some error" })
    );
    expect(endState.error).toBe("some error");
  });

  it("should set correct status", () => {
    const endState = appReducer(
      initialState,
      appActions.setAppStatus({ entityStatus: "loading" })
    );
    expect(endState.entityStatus).toBe("loading");
  });
});
