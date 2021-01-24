import { FC } from "react";
import { useDispatch } from "react-redux";
import "./Board.css";
import { ALIVE } from "./consts";
import { updateCell } from "./store/actions";
import { Board } from "./store/types";

interface Props {
  board: Board;
}

const BoardComponent: FC<Props> = ({ board }) => {
  const dispatch = useDispatch();

  const rows = board.length;
  const cols = board[0].length;

  const tr = [];
  for (let r = 0; r < rows; r++) {
    const td = [];
    for (let c = 0; c < cols; c++) {
      td.push(
        <td
          key={`${r},${c}`}
          className={`cell ${board[r][c] === ALIVE ? "alive" : "dead"}`}
          onClick={() => dispatch(updateCell(r, c))}
          onMouseOver={({ ctrlKey }) => ctrlKey && dispatch(updateCell(r, c))}
        />
      );
    }
    tr.push(<tr key={r}>{td}</tr>);
  }
  return (
    <table>
      <tbody>{tr}</tbody>
    </table>
  );
};

export default BoardComponent;
