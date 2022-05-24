import {
  getNextBoard,
  insertShape,
  normalize,
  updateCell,
} from "../board.helper";
import {
  ActionTypes,
  Board,
  INIT_BOARD,
  INSERT_SHAPE,
  SET_ANIMATION_SPEED,
  TOGGLE_START_STOP,
  UPDATE_BOARD,
  UPDATE_CELL,
} from "./types";

export function boardReducer(state: Board = [[]], action: ActionTypes) {
  switch (action.type) {
    case INIT_BOARD:
      return action.payload;
    case INSERT_SHAPE:
      const normalizedShape = normalize(action.payload);

      return insertShape(state, normalizedShape);
    case UPDATE_BOARD:
      return getNextBoard(state);
    case UPDATE_CELL:
      const { rowI, colI } = action.payload;

      return updateCell(state, rowI, colI);
    default:
      return state;
  }
}

export function settingsReducer(
  state = { speed: 2, started: true },
  action: ActionTypes
) {
  switch (action.type) {
    case SET_ANIMATION_SPEED:
      return {
        ...state,
        speed: action.payload,
      };
    case TOGGLE_START_STOP:
      return {
        ...state,
        started: !state.started,
      };
    default:
      return state;
  }
}
