import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../component/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavigationBar1 from '../component/NavigationBar1';


const GameLogPage = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState({});
  const { isAuthenticated, login, logout } = useAuth();
  let navigate = useNavigate()

  useEffect(() => {
    if(!isAuthenticated){
      navigate("/")
    }
    // Fetch game details using the 'id' parameter
    const storedGames = JSON.parse(localStorage.getItem('previousGames')) || [];
    setGameDetails(storedGames[id]);
  }, [id]);

  return (
    <div>
      <NavigationBar1/>
      <h4>Game #{Number(id) + 1} : {gameDetails.stats}</h4>
      <div className="board">
        {gameDetails.boardData?.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell === 1 ? 'black' : cell === 2 ? 'white' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>
      <Link to="/games">Back to Games History</Link>
    </div>
  );
};

export default GameLogPage;
