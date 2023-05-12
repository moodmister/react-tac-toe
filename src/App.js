import { useState } from "react";

let xTurn = true;
let isGameFinished = false;

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
  const [winner, setWinner] = useState('Play!');

  function checkBoardVertically(playedSymbol, newSquares) {
    for (let i = 0; i < dimension * dimension; i++) {
      for (let j = 0; j < winCondition; j++) {
        if (newSquares[i] !== playedSymbol) {
          break;
        }
        if (j === winCondition - 1) {
          return true;
        }
        i = i + dimension;
      }
    }
    return false;
  }
  function checkBoardHorizontally(playedSymbol, newSquares) {
    for (let i = 0; i < dimension * dimension; i++) {
      for (let j = 0; j < winCondition; j++) {
        if (newSquares[i] !== playedSymbol) {
          break;
        }
        if (j === winCondition - 1) {
          return true;
        }
        if (i === dimension - 1 && j < winCondition - 1) {
          break;
        }
        i = i + 1;
      }
    }
    return false;
  }

  function checkBoardMainDiagonal(playedSymbol, newSquares) {
    for (let i = 0; i < dimension * dimension; i++) {
      for (let j = 0; j < winCondition; j++) {
        if (newSquares[i] !== playedSymbol) {
          break;
        }
        if (j === winCondition - 1) {
          return true;
        }
        if ((i + 1) % dimension === 0 && j < winCondition - 1) {
          break;
        }
        if (i >= dimension * dimension - dimension && i < dimension * dimension && j < winCondition - 1) {
          break;
        }
        i = i + dimension + 1;
      }
    }
    return false;
  }

  function checkBoardOppositeDiagonal(playedSymbol, newSquares) {
    for (let i = 0; i < dimension * dimension; i++) {
      for (let j = 0; j < winCondition; j++) {
        if (newSquares[i] !== playedSymbol) {
          break;
        }
        if (j === winCondition - 1) {
          return true;
        }
        if (i % dimension === 0 && j < winCondition - 1) {
          break;
        }
        if (i >= dimension * dimension - dimension && i < dimension * dimension && j < winCondition - 1) {
          break;
        }
        i = i + dimension - 1;
      }
    }
    return false;
  }

  function checkWinner(newSquares) {
    const playedSymbol = xTurn ? 'X' : 'O';

    if (checkBoardVertically(playedSymbol, newSquares) ||
      checkBoardHorizontally(playedSymbol, newSquares) ||
      checkBoardMainDiagonal(playedSymbol, newSquares) ||
      checkBoardOppositeDiagonal(playedSymbol, newSquares)) {
      isGameFinished = true;
      document.body.classList.add('rave');
        return `${playedSymbol} wins`;
      }
    return 'Play!';
  }

  function handleSquareClick(idx) {
    if (!!squares[idx]) {
      return;
    }
    if (isGameFinished) {
      return;
    }
    const newSquares = [...squares];
    newSquares[idx] = xTurn ? 'X' : 'O';
    setSquares(newSquares);
    const winner = checkWinner(newSquares);
    xTurn = !xTurn;
    setWinner(winner);
  }

  const rows = [];
  for (let i = 0; i < dimension; i++) {
    rows.push(<Row key={i} squareKey={i} dimension={dimension} squareText={squares} handleSquareClick={handleSquareClick}></Row>);
  }

  function resetGame() {
    isGameFinished = false;
    xTurn = true;
    setWinner("Play!");
    document.body.classList.remove('rave');
    setSquares(Array(dimension * dimension).fill(''));
  }

  function changeDimension(dimension) {
    if (dimension >= 3 && dimension <= 16) {
      setDimension(Number(dimension));
    }
    resetGame();
  }

  function changeWinCondition(condition) {
    if (condition >= 2 && condition <= dimension) {
      setWinCondition(Number(condition));
    }
    resetGame();
  }

  return (
    <div className="game">
      <div className="controls">
        <strong>Warning! Contains flashy images!</strong>
        <div className="game-info">{winner}</div>
        <label>
          Board dimension
          <input type="number" style={{ width: '40px' }} value={dimension} min={3} max={16} onInput={event => { changeDimension(event.target.value); }}></input><br></br>
        </label>
        <label>
          Win condition
          <input type="number" style={{ width: '40px' }} value={winCondition} min={3} max={dimension} onInput={event => { changeWinCondition(event.target.value); }}></input><br></br>
        </label>
        <button onClick={() => { resetGame(); }}>Reset</button>
      </div>
      <div className="board">
        {rows}
      </div>
    </div>
  );
}
