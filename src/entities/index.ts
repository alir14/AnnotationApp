export interface Annotation {
    id: number;
    classId: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    time: number;
    annotationRectangle: AnnotationRectangle;
}

export interface AnnotationRectangle { 
    x1: number; 
    y1: number; 
    x2: number; 
    y2: number 
}