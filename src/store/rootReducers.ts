import { PayloadAction, combineReducers } from "@reduxjs/toolkit";
import viewerReducer from "./mediaAnnotation/slice";

const allReducers = combineReducers({
  ifcVeiwer: viewerReducer
});

export type RootStateType = ReturnType<typeof allReducers>;

const RootReducer = (state: any, action: PayloadAction) => allReducers(state, action);

export default RootReducer;