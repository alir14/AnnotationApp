import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cleanErrorData } from "../shared";
import { Annotation } from "entities";

export interface AnnotationClassesState {
    annotationClasses: string[];
    selectedAnnotationClass: string;
    error: any;
}

export const initAnnotationClassesState: AnnotationClassesState = {
    error: '',
    annotationClasses: [],
    selectedAnnotationClass: ''
}

const playerSlice = createSlice({
    name: 'AnnotationClassesState',
    initialState: initAnnotationClassesState,
    reducers: {
        setAnnotationClasses: (state, action: PayloadAction<string[]>) => {
            state.annotationClasses = action.payload;
        },
        setSelectedAnnotationClasses: (state, action: PayloadAction<string>) => {
            state.selectedAnnotationClass = action.payload;
        },
        setAnnotationClassesError: (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(cleanErrorData, (state) => {
            state.error = undefined;
        })
    }
});

export const {
    setAnnotationClasses,
    setSelectedAnnotationClasses,
    setAnnotationClassesError,
} = playerSlice.actions;

export default playerSlice.reducer;