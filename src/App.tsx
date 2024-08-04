import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';

const calculateWinner = (squares: string[]): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const isBoardFull = (squares: string[]): boolean => {
  return squares.every(square => square !== '');
};

const App: React.FC = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const handleClick = (i: number) => {
    const newSquares = squares.slice();
    const winner = calculateWinner(newSquares);

    if (winner || newSquares[i]) {
      return;
    }
    
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    // Check if the game is over
    if (calculateWinner(newSquares) || isBoardFull(newSquares)) {
      // Delay resetting to show the result
      setTimeout(() => {
        resetGame();
      }, 2000);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(''));
    setXIsNext(true);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : isBoardFull(squares)
    ? 'It\'s a draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  );
};

export default App;
