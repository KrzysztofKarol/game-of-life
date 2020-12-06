import {
  Board,
  INIT_BOARD,
  INSERT_SHAPE,
  SET_ANIMATION_SPEED,
  TOGGLE_START_STOP,
  UPDATE_BOARD,
  UPDATE_CELL,
} from "./types";

export function initBoard(board: Board) {
  return { type: INIT_BOARD, payload: board };
}

export function insertShape(shape: string) {
  return { type: INSERT_SHAPE, payload: shape };
}

export function updateBoard() {
  return { type: UPDATE_BOARD };
}

export function updateCell(rowI: number, colI: number) {
  return { type: UPDATE_CELL, payload: { rowI, colI } };
}

export function setAnimationSpeed(ticksPerSecond: number) {
  return { type: SET_ANIMATION_SPEED, payload: ticksPerSecond };
}

export function toggleStartStop() {
  return { type: TOGGLE_START_STOP };
}
