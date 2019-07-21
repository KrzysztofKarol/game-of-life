export const INIT_BOARD = 'INIT_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';

export function initBoard(board) {
  return { type: INIT_BOARD, payload: board };
}

export function updateBoard() {
  return { type: UPDATE_BOARD };
}
