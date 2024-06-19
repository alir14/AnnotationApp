import { RootStateType } from "../rootReducers";

export const getAnnotationClasses = (state: RootStateType) => state.annotationClasses.annotationClasses;
export const getSelectedAnnotationClass = (state: RootStateType) => state.annotationClasses.selectedAnnotationClass;