// This solution is based on
// https://www.freecodecamp.org/news/coding-the-game-of-life-with-react-7de2385b7356/

import * as R from 'ramda';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Board from './Board';
import { randomBoard, withPentomino } from './board-templates';
import { initBoard, updateBoard } from './store/actions';

function App() {
  const dispatch = useDispatch();
  const board = useSelector(R.prop('board'));

  useEffect(() => {
    const initialBoard = Math.random() < 0.5 ? withPentomino : randomBoard;
    dispatch(initBoard(initialBoard));

    const stepInterval = 500;
    const timer = window.setInterval(
      () => dispatch(updateBoard()),
      stepInterval,
    );

    return () => {
      window.clearInterval(timer);
    };
  }, [dispatch]);

  return board && <Board board={board} />;
}

export default App;
