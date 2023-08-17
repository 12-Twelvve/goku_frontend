import React, {useState} from 'react';
import NavigationBar from '../component/NavigationBar';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../component/AuthContext';
import { useBoardSize } from '../component/BoardsizeContext';


const HomePage = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const { boardSize, setBoardSize } = useBoardSize();

  let navigate = useNavigate()
  const handleStartGame = () => {
    if(isAuthenticated){
      navigate(`/game`)
    }
    else{
      navigate("/login")
    }
  };

  const handleBoardSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setBoardSize(newSize);
  };

  return (
    <div>
      <NavigationBar/>
      <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
        <div>
            <label>Board Size: </label>
            <select value={boardSize} onChange={handleBoardSizeChange}>
              {Array.from({ length: 11 }, (_, index) => index + 5).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {/* <input type="number" min={5} max={19} step={1} value={boardSize} onChange={handleBoardSizeChange} /> */}
        </div>
        <button onClick={handleStartGame}>Start Game</button>
      </div>
      {/* Other content */}
    </div>
  );
};

export default HomePage;
