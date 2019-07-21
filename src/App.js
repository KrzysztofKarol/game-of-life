// This solution is based on
// https://www.freecodecamp.org/news/coding-the-game-of-life-with-react-7de2385b7356/

import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './Board';
import { getNextBoard } from './board.helper';
import { randomBoard, withPentomino } from './board-templates';

function App() {
  const [board, setBoard] = useState(
    Math.random() < 0.5 ? withPentomino : randomBoard,
  );

  useEffect(() => {
    const stepInterval = 500;
    const timer = window.setInterval(() => handleStep(), stepInterval);

    return () => {
      window.clearInterval(timer);
    };
  });

  const handleStep = () => {
    setBoard(getNextBoard);
  };

  return <Board board={board} />;
}

export default App;
