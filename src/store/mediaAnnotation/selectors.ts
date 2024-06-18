import { RootStateType } from "../rootReducers";

export const getMediaFileURL = (state: RootStateType) => state.mediaAnnotationState.mediaFileUrl;
export const getAnnotationData = (state: RootStateType) => state.mediaAnnotationState.annotationData
