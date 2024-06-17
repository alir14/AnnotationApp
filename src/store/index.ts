import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

// Import your reducers and sagas
import reducers from './rootReducers'; // This is your combined reducers
import sagas from './rootSagas'; // This will be your root saga

const sagaMiddleware = createSagaMiddleware();
const isDevMode = process.env.NODE_ENV === "development";

// Create the Redux store with saga middleware
const store = configureStore({
    reducer: reducers,
    devTools: isDevMode,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(sagaMiddleware),
});

// Then run the root saga
sagaMiddleware.run(sagas);

export default store;
