import * as R from 'ramda';
import { ALIVE, DEAD } from './consts';

// prettier-ignore
/**
 * @param {CellStatus} cell
 * @param {number}     numOfLivingNeighbors
 */
export const applyRules = (cell, numOfLivingNeighbors) => R.cond([
    // 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    [R.useWith(R.and, [R.equals(ALIVE), R.lt(R.__, 2)]),                      R.always(DEAD) ],

    // 2. Any live cell with two or three live neighbours lives on to the next generation.
    [R.useWith(R.and, [R.equals(ALIVE), R.either(R.equals(2), R.equals(3))]), R.always(ALIVE)],

    // 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
    [R.useWith(R.and, [R.equals(ALIVE), R.gt(R.__, 3)]),                      R.always(DEAD) ],

    // 4. Any dead cell with three live neighbours becomes a live cell, as if by reproduction.
    [R.useWith(R.and, [R.equals(DEAD),  R.equals(3)]),                        R.always(ALIVE)],
  ])(cell, numOfLivingNeighbors);
