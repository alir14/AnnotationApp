import { PayloadAction, combineReducers } from "@reduxjs/toolkit";
import mediaAnnotation from "./mediaAnnotation/slice";

const allReducers = combineReducers({
  mediaAnnotationState: mediaAnnotation
});

export type RootStateType = ReturnType<typeof allReducers>;

const RootReducer = (state: any, action: PayloadAction) => allReducers(state, action);

export default RootReducer;