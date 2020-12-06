import { CellStatus } from "../consts";

export const INIT_BOARD = "INIT_BOARD";
export const INSERT_SHAPE = "INSERT_SHAPE";
export const UPDATE_BOARD = "UPDATE_BOARD";
export const UPDATE_CELL = "UPDATE_CELL";

export const SET_ANIMATION_SPEED = "SET_ANIMATION_SPEED";
export const TOGGLE_START_STOP = "TOGGLE_START_STOP";

export type Board = CellStatus[][];

export interface CellI {
  rowI: number;
  colI: number;
}

interface InitBoardAction {
  type: typeof INIT_BOARD;
  payload: Board;
}

interface InsertShapeAction {
  type: typeof INSERT_SHAPE;
  payload: string;
}

interface UpdateBoardAction {
  type: typeof UPDATE_BOARD;
}

interface UpdateCellAction {
  type: typeof UPDATE_CELL;
  payload: CellI;
}

interface SetAnimationSpeedAction {
  type: typeof SET_ANIMATION_SPEED;
  payload: number;
}

interface ToggleStartStopAction {
  type: typeof TOGGLE_START_STOP;
}

export type ActionTypes =
  | InitBoardAction
  | InsertShapeAction
  | UpdateBoardAction
  | UpdateCellAction
  | SetAnimationSpeedAction
  | ToggleStartStopAction;
