import { combineReducers } from 'redux';
import { getNextBoard } from '../board.helper';
import { INIT_BOARD, UPDATE_BOARD } from './actions';

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

export const rootReducer = combineReducers({ board: boardReducer });
export const _boardReducer = boardReducer;
