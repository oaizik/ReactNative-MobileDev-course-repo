import { SET_USER } from './types';

export const setUser = userData => ({
    type: 'SET_USER',
    payload: userData
});