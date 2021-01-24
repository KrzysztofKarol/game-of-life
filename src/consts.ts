const ALIVE = true;
const DEAD = false;

const ALIVE_EMOJI = "⬛";
const DEAD_EMOJI = "⬜";

export { ALIVE, ALIVE_EMOJI, DEAD, DEAD_EMOJI };

export type CellStatus = typeof ALIVE | typeof DEAD;
