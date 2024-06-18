import React, { ChangeEvent, useRef } from 'react';
import AnnotationPlayer from './components/player';
import { useDispatch } from 'react-redux';
import { PayloadAction } from '@reduxjs/toolkit';
import * as mediaAnnotationActions from "./store/mediaAnnotation/sagas/actions";
import AnnotationDataList from './components/annotation';
import TopMenu from './components/topMenu';
import "./App.css";
import "./bootstrap.scss";

const App: React.FC = () => {
    const dispatch = useDispatch();

    const playerComponentRef = useRef<any>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];
            const newVideoURL = URL.createObjectURL(file);

            dispatch({
                type: mediaAnnotationActions.SET_MEDIA_FILE_URL,
                payload: newVideoURL
            } as PayloadAction<string>);

            if (playerComponentRef.current) {
                playerComponentRef.current.focus();
            }
        }
    };

    return (
        <div className="d-flex">
            <div className="container-fluid">
                <div className="row g-2">
                    <div className="col-12">
                        <div className="p-2 border bg-light">
                            <TopMenu handleFileChange={handleFileChange} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="p-2 border bg-light">
                            <AnnotationPlayer ref={playerComponentRef} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row g-2">
                    <div className="col">
                        <div className="p-2 border bg-light">
                            <AnnotationDataList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
