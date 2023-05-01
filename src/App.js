import { useState } from "react";

let xTurn = true;

function Square({id, buttonText, handleSquareClick}) {
  return <button id={id} className="square" onClick={ev => { handleSquareClick(Number(ev.target.id)); }}>{buttonText}</button>;
}

function Row({squareKey, dimension, squareText, handleSquareClick}) {
  const squares = [];
  for (let j = 0; j < dimension; j++) {
    squares.push(<Square key={squareKey * dimension + j} id={squareKey * dimension + j} buttonText={squareText[squareKey * dimension + j]} handleSquareClick={handleSquareClick}></Square>);
  }
  return <div className="board-row">{squares}</div>;
}

export default function Board() {
  const [dimension, setDimension] = useState(3);
  const [squares, setSquares] = useState(Array(dimension * dimension).fill(''));
  const [winCondition, setWinCondition] = useState(3);
  const [winner, setWinner] = useState('No winner');

  function checkWinner() {
    // TODO Add logic for winning
    return 'No winner';
  }

  function handleSquareClick(idx) {
    if (!!squares[idx]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[idx] = xTurn ? 'X' : 'O';
    xTurn = !xTurn;
    const winner = checkWinner();
    setWinner(winner);
    setSquares(newSquares);
  }

  const rows = [];
  for (let i = 0; i < dimension; i++) {
    rows.push(<Row key={i} squareKey={i} dimension={dimension} squareText={squares} handleSquareClick={handleSquareClick}></Row>);
  }

  function clearBoard() {
    setSquares(Array(dimension * dimension).fill(''));
  }

  return (
    <div className="game">
      <div className="controls">
        <div className="game-info">{winner}</div>
        <label>
          Board dimension
          <input type="number" style={{ width: '40px' }} value={dimension} min={3} max={16} onInput={event => { setDimension(event.target.value * 1); clearBoard(); }}></input><br></br>
        </label>
        <label>
          Win condition
          <input type="number" style={{ width: '40px' }} value={winCondition} min={3} max={5} onInput={event => { setWinCondition(event.target.value * 1); clearBoard(); }}></input><br></br>
        </label>
        <button onClick={() => { clearBoard(); }}>Reset</button>
      </div>
      <div className="board">
        {rows}
      </div>
    </div>
  );
}
