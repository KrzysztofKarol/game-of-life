import { getNextBoard, normalize } from './board.helper';
import { ALIVE } from './consts';

// prettier-ignore
const board = [
  ' ■■',
  '■■ ',
  ' ■ ',
];

// prettier-ignore
const expected = [
  '■■■',
  '■  ',
  '■■ '
];

const denormalize = arr =>
  arr.map(row =>
    row.reduce((acc, cell) => acc + (cell === ALIVE ? '■' : ' '), ''),
  );

const actual = denormalize(getNextBoard(normalize(board)));

export const runTest = () => {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    console.error('Actual');
    console.error('\n' + actual.join('\n'));

    console.error('Expected');
    console.error('\n' + expected.join('\n'));
    throw new Error('Board does not match');
  }
};
