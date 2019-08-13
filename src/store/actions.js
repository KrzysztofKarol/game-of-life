export const INIT_BOARD = 'INIT_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const UPDATE_CELL = 'UPDATE_CELL';

export const SET_ANIMATION_SPEED = 'SET_ANIMATION_SPEED';
export const TOGGLE_START_STOP = 'TOGGLE_START_STOP';

export function initBoard(board) {
  return { type: INIT_BOARD, payload: board };
}

export function updateBoard() {
  return { type: UPDATE_BOARD };
}

export function updateCell(rowI, colI) {
  return { type: UPDATE_CELL, payload: { rowI, colI } };
}

export function setAnimationSpeed(ticksPerSecond) {
  return { type: SET_ANIMATION_SPEED, payload: ticksPerSecond };
}

export function toggleStartStop() {
  return { type: TOGGLE_START_STOP };
}
