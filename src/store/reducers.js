import { combineReducers } from 'redux';
import { getNextBoard } from '../board.helper';
import { INIT_BOARD, SET_ANIMATION_SPEED, UPDATE_BOARD } from './actions';

function boardReducer(state = null, action) {
  switch (action.type) {
    case INIT_BOARD:
      return action.payload;
    case UPDATE_BOARD:
      return getNextBoard(state);
    default:
      return state;
  }
}

function settingsReducer(state = { speed: 2 }, action) {
  switch (action.type) {
    case SET_ANIMATION_SPEED:
      return {
        ...state,
        speed: action.payload,
      };

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  board: boardReducer,
  settings: settingsReducer,
});
export const _boardReducer = boardReducer;
export const _settingsReducer = settingsReducer;
