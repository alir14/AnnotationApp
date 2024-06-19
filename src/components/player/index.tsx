import React, { forwardRef, MouseEventHandler, SyntheticEvent, useEffect, useRef, useState } from 'react';
import "./player.css";
import { useSelector } from 'react-redux';
import { Annotation } from '../../entities';
import { getMediaFileURL } from '../../store/mediaAnnotation/selectors';
import { useDispatch } from 'react-redux';
import * as mediaAnnotationActions from "../../store/mediaAnnotation/sagas/actions";
import { PayloadAction } from '@reduxjs/toolkit';
import { getAnnotationData } from '../../store/mediaAnnotation/selectors';


const AnnotationPalyer = forwardRef((props, ref: any) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [annotating, setAnnotating] = useState<boolean>(false);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [start, setStart] = useState({ x: 0, y: 0 });
    const annotationList = useSelector(getAnnotationData);


    const videoURL = useSelector(getMediaFileURL);
    const dispatch = useDispatch();

    useEffect(() => {
        canvasRef?.current?.focus();
    }, [videoURL]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!videoRef.current) return;

            switch (event.key) {
                case ' ':
                    if (videoRef.current.paused) videoRef.current.play();
                    else videoRef.current.pause();
                    if (canvasRef.current) {
                        const ctx = canvasRef.current.getContext('2d');
                        ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    }
                    break;
                case 'ArrowRight':
                    videoRef.current.currentTime += 0.5;
                    break;
                case 'ArrowLeft':
                    videoRef.current.currentTime -= 0.5;
                    break;
                case 'x':
                    if (!videoRef.current.paused) videoRef.current.pause();
                    setAnnotating(!annotating);
                    if (canvasRef.current) {
                        canvasRef.current.style.pointerEvents = annotating ? 'none' : 'auto';
                        if (!annotating) {
                            const ctx = canvasRef.current.getContext('2d');
                            ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                        }
                    }
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;

            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas

            annotationList.forEach(rect => {
                ctx.beginPath();
                ctx.rect(rect.annotationRectangle.x1, rect.annotationRectangle.y1, rect.annotationRectangle.x2 - rect.annotationRectangle.x1, rect.annotationRectangle.y2 - rect.annotationRectangle.y1);
                ctx.strokeStyle = 'red';
                ctx.stroke();
            });
        }
    }, [annotationList])

    const handleMouseDown: MouseEventHandler<HTMLCanvasElement> = (event) => {
        if (!annotating) return;
        setIsDrawing(true);
        setStart({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // Redraw all rectangles every move
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas

        annotationList.forEach(rect => {
            ctx.beginPath();
            ctx.rect(rect.annotationRectangle.x1, rect.annotationRectangle.y1, rect.annotationRectangle.x2 - rect.annotationRectangle.x1, rect.annotationRectangle.y2 - rect.annotationRectangle.y1);
            ctx.strokeStyle = 'red';
            ctx.stroke();
        });

        // Draw current rectangle
        ctx.beginPath();
        ctx.rect(start.x, start.y, event.nativeEvent.offsetX - start.x, event.nativeEvent.offsetY - start.y);
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }

    const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !canvasRef.current) return;
        setIsDrawing(false);
        const endX = event.nativeEvent.offsetX;
        const endY = event.nativeEvent.offsetY;

        saveAnnotation(start.x, start.y, endX, endY);
    }

    const saveAnnotation = (x1: number, y1: number, x2: number, y2: number) => {
        if (!canvasRef.current || !videoRef.current) return;

        const annotation: Annotation = {
            id: Date.now(),
            classId: 1,
            startX: x1 / canvasRef.current.width,
            startY: y1 / canvasRef.current.height,
            endX: x2 / canvasRef.current.width,
            endY: y2 / canvasRef.current.height,
            time: videoRef.current.currentTime,
            annotationRectangle: { x1: start.x, y1: start.y, x2, y2 }
        };
        console.log('Annotation saved:', annotation);
        // Store this annotation or send it to a server
        dispatch({
            type: mediaAnnotationActions.SAVE_ANNOTATION,
            payload: annotation
        } as PayloadAction<Annotation>);
    }

    const handleOnLoadVideoMetaData = (event: SyntheticEvent<HTMLVideoElement>) => {
        const videoElement = event.currentTarget as HTMLVideoElement;
        console.log(`Video dimensions: ${videoElement.videoWidth} x ${videoElement.videoHeight}`);
    }

    return (
        <div {...props} ref={ref} tabIndex={-1} className="video-container">
            <video ref={videoRef} width="1028" height="720" muted onLoadedMetadata={handleOnLoadVideoMetaData}>
                {videoURL && <source src={videoURL} type="video/mp4" />}
                Your browser does not support the video tag.
            </video>
            <canvas
                ref={canvasRef}
                width={1028}
                height={720}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className='annotationCanvas'
            >
            </canvas>
        </div>
    )
})

export default AnnotationPalyer;