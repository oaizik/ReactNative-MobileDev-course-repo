import { FETCH_DELIVERYS } from '../actions/types';

const initialState = {
  deliverys: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_DELIVERYS:
      return {
        ...state,
        deliverys: action.payload
      };
    default:
      return state;
  }
}