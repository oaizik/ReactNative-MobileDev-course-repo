import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
export const FETCH_TRACKS = 'FETCH_TRACKS'

const logger = createLogger()

const initialState = {
  tracks: [],
  history: []
}

export const store = createStore(reducer, initialState, applyMiddleware(thunk, logger))

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_TRACKS':
      return {
        ...state,
        tracks: [...state.tracks, action.payload]
      }
    case 'SET_HISTORY':
      return {
        ...state,
        history: [...state.history, action.payload]
      }
    default:
      return state
  }
}

//Actions
export const fetchTracks = (tracks) => ({
  type: 'FETCH_TRACKS',
  payload: tracks
})

export const setHistory = (item) => ({
  type: 'SET_HISTORY',
  payload: item
})
