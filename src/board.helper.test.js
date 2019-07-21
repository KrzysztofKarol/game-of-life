import * as R from 'ramda';
import { getNextBoard, normalize } from './board.helper';
import { ALIVE, ALIVE_EMOJI, DEAD_EMOJI } from './consts';

const mapToEmoji = R.map(
  R.reduce(
    (acc, cell) => acc + (cell === ALIVE ? ALIVE_EMOJI : DEAD_EMOJI),
    '',
  ),
);
const removeEmptyRows = R.reject(R.isEmpty);
const joinWithNewLine = R.join('\n');

const denormalize = R.pipe(
  mapToEmoji,
  removeEmptyRows,
  joinWithNewLine,
);

const boards = Object.freeze([
  `
⬜⬜⬜⬜
⬜⬜⬛⬛
⬜⬛⬛⬜
⬜⬜⬛⬜
`,
  `
⬜⬜⬜⬜
⬜⬛⬛⬛
⬜⬛⬜⬜
⬜⬛⬛⬜
`,
  `
⬜⬜⬛⬜
⬜⬛⬛⬜
⬛⬜⬜⬛
⬜⬛⬛⬜
`,
  `
⬜⬛⬛⬜
⬜⬛⬛⬛
⬛⬜⬜⬛
⬜⬛⬛⬜
`,
]);
const trim = R.trim;

const getActual = (board, generations = 1) => {
  // https://github.com/ramda/ramda/wiki/Cookbook#apply-a-given-function-n-times
  // applyN :: (a -> a) -> Number -> (a -> a)
  const applyN = R.compose(
    R.reduceRight(R.compose, R.identity),
    R.repeat,
  );

  return applyN(
    R.pipe(
      normalize,
      getNextBoard,
      denormalize,
    ),
    generations,
  )(board);
};

describe('getNextBoard', () => {
  it('correctly returns new board for single iteration (Step 1)', () => {
    const board = boards[0];
    const actual = getActual(board);
    const expected = trim(boards[1]);

    expect(actual).toEqual(expected);
  });

  it('correctly returns new board for single iteration (Step 2)', () => {
    const board = boards[1];
    const actual = getActual(board);
    const expected = trim(boards[2]);

    expect(actual).toEqual(expected);
  });

  it('correctly returns new board for single iteration (Step 3)', () => {
    const board = boards[2];
    const actual = getActual(board);
    const expected = trim(boards[3]);

    expect(actual).toEqual(expected);
  });

  it('correctly returns new board for multiple iteration (3 ticks)', () => {
    const board = boards[0];
    const actual = getActual(board, 3);
    const expected = trim(boards[3]);

    expect(actual).toEqual(expected);
  });
});
