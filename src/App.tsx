import React, { ChangeEvent, useRef } from 'react';
import "./bootstrap.scss";
import "./App.css";
import AnnotationPalyer from './components/player';
import { useDispatch } from 'react-redux';
import { PayloadAction } from '@reduxjs/toolkit';
import * as mediaAnnotationActions from "./store/mediaAnnotation/sagas/actions";
import classNames from 'classnames';


const App: React.FC = () => {
    const dispatch = useDispatch();

    const playerComponentRef = useRef<any>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];
            const newVideoURL = URL.createObjectURL(file);

            dispatch({
                type: mediaAnnotationActions.SET_Media_File_URL,
                payload: newVideoURL
            } as PayloadAction<string>);

            if (playerComponentRef.current) {
                console.log("focus on player");
                playerComponentRef.current.focus();
            }
        }
    };

    return (
        <div className="container-flex">
            <div className={classNames('row', 'menu')} >
                <input type='file' accept='video/*' tabIndex={100} onChange={handleFileChange} />

            </div>
            <AnnotationPalyer ref={playerComponentRef}/>
        </div>
    );
};

export default App;
