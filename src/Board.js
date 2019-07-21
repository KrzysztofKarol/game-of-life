import React from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import { ALIVE } from './consts';

function Board({ board }) {
  const rows = board.length;
  const cols = board[0].length;

  const tr = [];
  for (let r = 0; r < rows; r++) {
    const td = [];
    for (let c = 0; c < cols; c++) {
      td.push(
        <td
          key={`${r},${c}`}
          className={`cell ${board[r][c] === ALIVE ? 'alive' : 'dead'}`}
        />,
      );
    }
    tr.push(<tr key={r}>{td}</tr>);
  }
  return (
    <table>
      <tbody>{tr}</tbody>
    </table>
  );
}
Board.propTypes = {
  // TODO: Strictify
  board: PropTypes.array.isRequired,
};

export default Board;
