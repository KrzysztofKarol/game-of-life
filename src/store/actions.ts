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
  return { type: INIT_BOARD, payload: board } as const;
}

export function insertShape(shape: string) {
  return { type: INSERT_SHAPE, payload: shape } as const;
}

export function updateBoard() {
  return { type: UPDATE_BOARD } as const;
}

export function updateCell(rowI: number, colI: number) {
  return { type: UPDATE_CELL, payload: { rowI, colI } } as const;
}

export function setAnimationSpeed(ticksPerSecond: number) {
  return { type: SET_ANIMATION_SPEED, payload: ticksPerSecond } as const;
}

export function toggleStartStop() {
  return { type: TOGGLE_START_STOP } as const;
}
