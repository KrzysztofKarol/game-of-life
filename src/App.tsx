// This solution is based on
// https://www.freecodecamp.org/news/coding-the-game-of-life-with-react-7de2385b7356/

import * as R from "ramda";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnimationSpeedSlider from "./AnimationSpeedSlider";
import Board from "./Board";
import { randomBoard, withPentomino } from "./board-templates";
import ShapeHolder from "./ShapeHolder";
import {
  initBoard,
  toggleStartStop as toggleStartStopAction,
  updateBoard,
} from "./store/actions";
import { useSelector } from "./store/useSelector";

function App() {
  const dispatch = useDispatch();
  const board = useSelector(R.prop("board"));
  const { speed, started } = useSelector(R.prop("settings"));

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
        stepInterval
      );

      return () => {
        window.clearInterval(timer);
      };
    }
  }, [dispatch, speed, started]);

  return (
    <div>
      <button onClick={toggleStartStop} style={{ fontSize: 24 }}>
        {started ? "⏸" : "▶️"}
      </button>
      <ShapeHolder />
      {board && <Board board={board} />}
      <AnimationSpeedSlider />
    </div>
  );
}

export default App;
