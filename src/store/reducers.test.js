import * as boardHelper from '../board.helper';
import { initBoard, updateBoard } from './actions';
import { _boardReducer } from './reducers';

describe('board', () => {
  describe('INIT_BOARD', () => {
    it('should return provided board', () => {
      const board = [];

      const actual = _boardReducer(null, initBoard(board));

      expect(actual).toBe(board);
    });
  });

  describe('UPDATE_BOARD', () => {
    let getNextBoardSpy;

    beforeAll(() => {
      getNextBoardSpy = jest.spyOn(boardHelper, 'getNextBoard');
    });

    afterAll(() => {
      getNextBoardSpy.mockRestore();
    });

    it('should call getNextBoard and return its result', () => {
      const state = [];
      const expected = [];
      getNextBoardSpy.mockReturnValue(expected);

      const actual = _boardReducer(state, updateBoard());

      expect(actual).toBe(expected);
      expect(getNextBoardSpy).toHaveBeenCalledWith(state);
    });
  });

  describe('UNKNOWN_ACTION', () => {
    it('should return state', () => {
      const state = [];

      const actual = _boardReducer(state, { type: 'UNKNOWN_ACTION' });

      expect(actual).toBe(state);
    });
  });
});
