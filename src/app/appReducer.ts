import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EntityStatusType } from "features/TodolistList/Todolist/todolistsReducer";

// initial state
const initialState = {
  entityStatus: "idle" as EntityStatusType,
  error: null as null | string,
  isInitialized: false
};

export type InitialAppStateType = typeof initialState

//slice
const slice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (
      state,
      action: PayloadAction<{ entityStatus: EntityStatusType }>
    ) => {
      state.entityStatus = action.payload.entityStatus;
    },
    setAppInitialized: (
      state,
      action: PayloadAction<{ isInitialized: boolean }>
    ) => {
      state.isInitialized = action.payload.isInitialized;
    }
  }
});


// actions
export const appActions = slice.actions;

// reducer
export const appReducer = slice.reducer;
