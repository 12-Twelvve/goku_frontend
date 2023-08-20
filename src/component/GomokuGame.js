import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoardSize } from './BoardsizeContext';


const GomokuGame = () => {
  const { boardSize, setBoardSize } = useBoardSize();
  const [board, setBoard] = useState(Array(boardSize).fill(null).map(() => Array(boardSize).fill(0)));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameEnded, setGameEnded] = useState(false);
  const [winner, setWinner] = useState(false);
  let navigate = useNavigate()

  const handleCellClick = (row, col) => {
    if (!gameEnded && board[row][col] === 0) {
      const newBoard = [...board];
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      if (checkWin()) {
        setGameEnded(true);
        setWinner(true)
        return

      } else if (checkDraw()) {
        setGameEnded(true)
        return
      }
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  // Function to check win
  const checkWin = ()=>{
    const n = boardSize;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === 0) {
          // Skip empty cells
          continue; 
        }
        // Check horizontal
        if (j + 4 < n && board[i][j] === board[i][j + 1] && board[i][j] === board[i][j + 2] &&
            board[i][j] === board[i][j + 3] && board[i][j] === board[i][j + 4]) {
          return true;
        }
        // Check vertical
        if (i + 4 < n && board[i][j] === board[i + 1][j] && board[i][j] === board[i + 2][j] &&
            board[i][j] === board[i + 3][j] && board[i][j] === board[i + 4][j]) {
          return true;
        }
        // Check diagonal \
        if (i + 4 < n && j + 4 < n && board[i][j] === board[i + 1][j + 1] && board[i][j] === board[i + 2][j + 2] &&
            board[i][j] === board[i + 3][j + 3] && board[i][j] === board[i + 4][j + 4]) {
          return true;
        }
        // Check diagonal /
        if (i - 4 >= 0 && j + 4 < n && board[i][j] === board[i - 1][j + 1] && board[i][j] === board[i - 2][j + 2] &&
            board[i][j] === board[i - 3][j + 3] && board[i][j] === board[i - 4][j + 4]) {
          return true;
        }
      }
    }
    return false;
  
  }


  // Function to check draw
  const checkDraw = ()=> {
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (board[row][col] === 0) {
          // There is an empty cell, not a draw yet
          return false; 
        }
      }
    }
    // All cells are filled, it's a draw
    return true; 
  }

  const handleReset = () => {
    setBoard(Array(boardSize).fill(null).map(() => Array(boardSize).fill(0)));
    setCurrentPlayer(1);
    setWinner(false)
    setGameEnded(false)
  };
  const handleLeave = () => {
    // save to the local storage
    if(gameEnded){
      const gameDetails = {
        date: new Date().toDateString(),
        stats: winner?currentPlayer === 1 ? 'Black Wins' : 'White Wins':"Game draw",
        boardData: board,
      };
      const previousGames = JSON.parse(localStorage.getItem('previousGames')) || [];
      previousGames.push(gameDetails);
      localStorage.setItem('previousGames', JSON.stringify(previousGames));
    }
    navigate("/")
    // to games if game finished
    // navigate("/games")
  };

  return (
    <div>
      {/* status */}
      {gameEnded?winner?<h3>Winner: {currentPlayer===1?"Black":"White"}</h3>:<h3>Game Draw</h3>:
      <h3>Current Player: {currentPlayer === 1 ? 'Black' : 'White'}</h3>}
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell === 1 ? 'black' : cell === 2 ? 'white' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <div>
          <button onClick={handleReset}>Restart Game</button>
          <button onClick={handleLeave}>Leave Game</button>
      </div>
    </div>
  );
};

export default GomokuGame;
