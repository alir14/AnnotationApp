import { all, fork } from 'redux-saga/effects';

// Import your individual sagas
import { watchViewerSaga as viewerSaga } from './mediaAnnotation/sagas';

function* rootSaga() {
    yield all([
        fork(viewerSaga),
    ]);
}

export default rootSaga;
