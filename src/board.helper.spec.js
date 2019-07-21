import { getNextBoard, normalize } from './board.helper';
import { ALIVE, ALIVE_EMOJI, DEAD_EMOJI } from './consts';
import * as R from 'ramda';

// https://github.com/ramda/ramda/wiki/Cookbook#apply-a-given-function-n-times
// // applyN :: (a -> a) -> Number -> (a -> a)
const applyN = R.compose(
  R.reduceRight(R.compose, R.identity),
  R.repeat,
);

const testCases = [
  {
    board: `
⬜⬜⬜⬜
⬜⬜⬛⬛
⬜⬛⬛⬜
⬜⬜⬛⬜
`,
    expected: `
⬜⬜⬜⬜
⬜⬛⬛⬛
⬜⬛⬜⬜
⬜⬛⬛⬜
`,
  },
  {
    board: `
⬜⬜⬜⬜
⬜⬛⬛⬛
⬜⬛⬜⬜
⬜⬛⬛⬜
`,
    expected: `
⬜⬜⬛⬜
⬜⬛⬛⬜
⬛⬜⬜⬛
⬜⬛⬛⬜
`,
  },
  {
    board: `
⬜⬜⬛⬜
⬜⬛⬛⬜
⬛⬜⬜⬛
⬜⬛⬛⬜
`,
    expected: `
⬜⬛⬛⬜
⬜⬛⬛⬛
⬛⬜⬜⬛
⬜⬛⬛⬜
`,
  },
  {
    board: `
⬜⬜⬜⬜
⬜⬜⬛⬛
⬜⬛⬛⬜
⬜⬜⬛⬜
`,
    expected: `
⬜⬛⬛⬜
⬜⬛⬛⬛
⬛⬜⬜⬛
⬜⬛⬛⬜
`,
    generations: 3,
  },
];

const denormalize = arr =>
  arr
    .map(row =>
      row.reduce(
        (acc, cell) => acc + (cell === ALIVE ? ALIVE_EMOJI : DEAD_EMOJI),
        '',
      ),
    )
    .filter(R.complement(R.isEmpty))
    .join('\n');

const runTest = (actual, expected) => {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    console.error('Actual');
    console.error('\n' + actual);

    console.error('Expected');
    console.error('\n' + expected);
    throw new Error('Board does not match');
  }
};

export const runTests = () => {
  testCases.forEach(({ board, expected, generations = 1 }) => {
    const actual = applyN(
      R.pipe(
        normalize,
        getNextBoard,
        denormalize,
      ),
      generations,
    )(board);

    runTest(actual, expected.trim());
  });
};
