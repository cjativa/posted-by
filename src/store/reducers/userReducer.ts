import { Action, PayloadLessAction } from '../actions/actionPayload';
import { ActionTypes } from '../actions/actionTypes';
import { ILoggedInUserState } from '../states/userState';

export const initialState: ILoggedInUserState = {} as ILoggedInUserState;

export const userReducer = (state: ILoggedInUserState = initialState, action: Action<ILoggedInUserState>) => {
    const { payload, type } = action;

    switch (type) {
        case ActionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
};