export type Action<T> = {
    type: string;
    payload: T;
};

export type PayloadLessAction = {
    type: string;
};