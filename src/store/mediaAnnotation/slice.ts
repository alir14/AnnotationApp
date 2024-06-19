import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cleanErrorData } from "../shared";
import { Annotation } from "entities";

export interface MediaAnnotationState {
    mediaFileUrl?: string;
    annotationData: Annotation[];
    saveValidationFalg: boolean;
    error: any;
}

export const initMediaAnnotationState: MediaAnnotationState = {
    error: '',
    saveValidationFalg: false,
    annotationData: []
}

const playerSlice = createSlice({
    name: 'PalayerState',
    initialState: initMediaAnnotationState,
    reducers: {
        setMediaFileURL: (state, action: PayloadAction<string>) => {
            state.mediaFileUrl = action.payload;
        },
        setAnnotationData: (state, action: PayloadAction<Annotation[]>) => {
            state.annotationData = action.payload;
        },
        setAnnotationError: (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        setSaveValidationFlag: (state, action: PayloadAction<boolean>) => {
            state.saveValidationFalg = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(cleanErrorData, (state) => {
            state.error = undefined;
        })
    }
});

export const {
    setMediaFileURL,
    setAnnotationData,
    setAnnotationError,
    setSaveValidationFlag
} = playerSlice.actions;

export default playerSlice.reducer;