// This solution is based on
// https://www.freecodecamp.org/news/coding-the-game-of-life-with-react-7de2385b7356/

import * as R from 'ramda';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnimationSpeedSlider from './AnimationSpeedSlider';
import './App.css';
import Board from './Board';
import { randomBoard, withPentomino } from './board-templates';
import {
  initBoard,
  toggleStartStop as toggleStartStopAction,
  updateBoard,
} from './store/actions';

function App() {
  const dispatch = useDispatch();
  const board = useSelector(R.prop('board'));
  const { speed, started } = useSelector(R.prop('settings'));

  const toggleStartStop = () => {
    dispatch(toggleStartStopAction());
  };

  useEffect(() => {
    const initialBoard = Math.random() < 0.5 ? withPentomino : randomBoard;
    dispatch(initBoard(initialBoard));
  }, [dispatch]);

  useEffect(() => {
    const stepInterval = 1000 / speed;

    if (started) {
      const timer = window.setInterval(
        () => dispatch(updateBoard()),
        stepInterval,
      );

      return () => {
        window.clearInterval(timer);
      };
    }
  }, [dispatch, speed, started]);

  return (
    <div>
      <button onClick={toggleStartStop} style={{ fontSize: 24 }}>
        {started ? '⏸' : '▶️'}
      </button>
      {board && <Board board={board} />}
      <AnimationSpeedSlider />
    </div>
  );
}

export default App;
