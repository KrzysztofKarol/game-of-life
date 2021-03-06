import * as boardHelper from "../board.helper";
import { initBoard, setAnimationSpeed, updateBoard } from "./actions";
import { _boardReducer, _settingsReducer } from "./reducers";
import { Board } from "./types";

describe("board", () => {
  describe("INIT_BOARD", () => {
    it("should return provided board", () => {
      const board: Board = [];

      const actual = _boardReducer(null, initBoard(board));

      expect(actual).toBe(board);
    });
  });

  describe("UPDATE_BOARD", () => {
    let getNextBoardSpy;

    beforeAll(() => {
      getNextBoardSpy = jest.spyOn(boardHelper, "getNextBoard");
    });

    afterAll(() => {
      getNextBoardSpy.mockRestore();
    });

    it("should call getNextBoard and return its result", () => {
      const state = [];
      const expected = [];
      getNextBoardSpy.mockReturnValue(expected);

      const actual = _boardReducer(state, updateBoard());

      expect(actual).toBe(expected);
      expect(getNextBoardSpy).toHaveBeenCalledWith(state);
    });
  });

  describe("UNKNOWN_ACTION", () => {
    it("should return state", () => {
      const state = [];

      const actual = _boardReducer(state, { type: "UNKNOWN_ACTION" });

      expect(actual).toBe(state);
    });
  });
});

describe("settings", () => {
  describe("SET_ANIMATION_SPEED", () => {
    it("should return provided board", () => {
      const state = { speed: 2, started: true };
      const speed = 10;
      const expected = {
        ...state,
        speed: 10,
      };

      const actual = _settingsReducer(state, setAnimationSpeed(speed));

      expect(actual).toEqual(expected);
    });
  });
});
