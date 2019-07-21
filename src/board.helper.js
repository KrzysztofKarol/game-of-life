import * as R from 'ramda';
import { ALIVE, DEAD } from './consts';

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

export const normalize = arr =>
  arr.map(row => row.split('').map(cell => (cell === '■' ? ALIVE : DEAD)));

export const getNextBoard = board => {
  return mapIndexed(
    (row, rowI) =>
      mapIndexed((cell, colI) => {
        const numOfLivingNeighbors = getNumOfLivingNeighbors(board, rowI, colI);

        // prettier-ignore
        // return R.cond([
        // TODO: Make it work
        // TODO: Make them point-free
        //   [(c, n) =>console.log(c, n, R.and(R.equals(DEAD, c),  R.equals(3, n)))|| R.and(R.equals(DEAD, c),  R.equals(3, n)),                  R.always(ALIVE)],
        //   [(c, n) => R.and(R.equals(ALIVE, c), R.either([R.lt(2), R.gt(3)])(n)), R.always(DEAD) ],
        //   [R.T,                                                                  R.always(cell) ],
        // ])(cell, getNumOfLivingNeighbors(board, rowI, colI));

        if (cell === DEAD) {
          if (numOfLivingNeighbors === 3) return ALIVE;
        } else {
          if (numOfLivingNeighbors < 2 || numOfLivingNeighbors > 3)
            return DEAD;
        }

        return cell;
      }, row),
    board,
  );
};
