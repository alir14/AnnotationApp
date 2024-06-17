import { takeLatest, put, call } from "redux-saga/effects";
import * as actions from "./actions";
import { PayloadAction } from "@reduxjs/toolkit";
import {
    setMediaFileURL,
} from "../slice";

export function* watchViewerSaga() {
    yield takeLatest(actions.SET_Media_File_URL, setMediaFileURLSaga);
}

export function* setMediaFileURLSaga(action: PayloadAction<string>) {
    yield put(setMediaFileURL(action.payload));
}