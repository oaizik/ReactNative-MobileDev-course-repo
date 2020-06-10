import { combineReducers } from 'redux';
import userReducer from './userReducer';
import deliverysReducer from './deliverysReducer';


export default combineReducers({
    user: userReducer,
    deliverys: deliverysReducer
});