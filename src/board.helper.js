import * as R from 'ramda';
import { ALIVE, ALIVE_EMOJI, DEAD } from './consts';
import { applyRules } from './rules';

const mapIndexed = R.addIndex(R.map);

const getNumOfLivingNeighbors = (board, rowI, colI) => {
  const numOfRows = board.length;
  const numOfCols = board[0].length;

  // prettier-ignore
  const neighbors = [
    [-1, -1], [0,  -1], [1, -1],
    [-1,  0],           [1,  0],
    [-1,  1], [0,   1], [1,  1],
  ];
  return neighbors.reduce((trueNeighbors, [dx, dy]) => {
    const x = rowI + dx;
    const y = colI + dy;
    const isNeighborOnBoard =
      x >= 0 && x < numOfRows && y >= 0 && y < numOfCols;
    /* No need to count more than 4 alive neighbors due to rules */
    if (trueNeighbors < 4 && isNeighborOnBoard && board[x][y]) {
      return trueNeighbors + 1;
    } else {
      return trueNeighbors;
    }
  }, 0);
};

export const normalize = str =>
  str
    .split('\n')
    .filter(R.complement(R.isEmpty))
    .map(row =>
      row.split('').map(cell => (cell === ALIVE_EMOJI ? ALIVE : DEAD)),
    );

export const getNextBoard = board => {
  return mapIndexed(
    (row, rowI) =>
      mapIndexed(
        (cell, colI) =>
          applyRules(cell, getNumOfLivingNeighbors(board, rowI, colI)),
        row,
      ),
    board,
  );
};

const getNumOfRowsAndCols = arrayOfArries => ({
  rows: arrayOfArries.length,
  cols: arrayOfArries[0].length,
});

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const insertShape = (state, normalizedShape) => {
  const { rows: stateRows, cols: stateCols } = getNumOfRowsAndCols(state);
  const { rows: shapeRows, cols: shapeCols } = getNumOfRowsAndCols(
    normalizedShape,
  );

  const rowOffset = getRandomInt(0, stateRows - shapeRows);
  const colOffset = getRandomInt(0, stateCols - shapeCols);

  const copy = JSON.parse(JSON.stringify(state));

  normalizedShape.forEach((shapeRow, rowIndex) =>
    shapeRow.forEach((cell, colIndex) => {
      copy[rowIndex + rowOffset][colIndex + colOffset] = cell;
    }),
  );

  return copy;
};

export const updateCell = (state, rowI, colI) =>
  state.map((row, rowIndex) =>
    rowIndex === rowI
      ? row.map((cell, colIndex) => (colIndex === colI ? !cell : cell))
      : row,
  );
