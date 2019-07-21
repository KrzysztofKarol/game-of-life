import { ALIVE, DEAD } from './consts';
import { normalize } from './board.helper';

const numOfRows = 20;
const numOfCols = 20;
const emptyRow = ' '.repeat(numOfCols);
export const withPentomino = normalize([
  ...Array.from({ length: 8 }, () => emptyRow),
  ' '.repeat(8) + ' ■■' + ' '.repeat(9),
  ' '.repeat(8) + '■■ ' + ' '.repeat(9),
  ' '.repeat(8) + ' ■ ' + ' '.repeat(9),
  ...Array.from({ length: 9 }, () => emptyRow),
]);

export const randomBoard = Array.from({ length: numOfRows }, () => {
  return Array.from({ length: numOfCols }, () => {
    return Math.random() < 0.25 ? ALIVE : DEAD;
  });
});
