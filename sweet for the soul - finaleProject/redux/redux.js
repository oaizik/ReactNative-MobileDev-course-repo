// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { createLogger } from 'redux-logger'
// export const SET_USER = 'SET_USER'

// const logger = createLogger()

// const initialState = {
//   user: {},
//   data: []
// }

// export const store = createStore(reducer, initialState, applyMiddleware(thunk, logger))

// // Reducer
// function reducer(state, action) {
//   switch (action.type) {
//     case 'SET_USER':
//       return {
//         ...state,
//         user: action.payload
//       }
//     default:
//       return state
//   }
// }

// //Actions
// export const setUser = (item) => ({
//   type: 'SET_USER',
//   payload: item
// })
