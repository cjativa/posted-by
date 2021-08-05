import { ActionTypes } from './actionTypes';
import { ILoggedInUserState } from '../states/userState';

export const loginSuccess = (payload: ILoggedInUserState) => {
    return {
        type: ActionTypes.USER_LOGIN_SUCCESS,
        payload,
    };
};