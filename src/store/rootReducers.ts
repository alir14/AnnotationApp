import { PayloadAction, combineReducers } from "@reduxjs/toolkit";
import mediaAnnotation from "./mediaAnnotation/slice";
import annotationClasses from "./annotateClasses/slice";

const allReducers = combineReducers({
  mediaAnnotationState: mediaAnnotation,
  annotationClasses: annotationClasses
});

export type RootStateType = ReturnType<typeof allReducers>;

const RootReducer = (state: any, action: PayloadAction) => allReducers(state, action);

export default RootReducer;