import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar1 from '../component/NavigationBar1';

const GamesHistoryPage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const previousGames = JSON.parse(localStorage.getItem('previousGames')) || [];
    setGames(previousGames);
  }, []);

  return (
    <div>
      <NavigationBar1/>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
          Game #{index + 1} - @{game.date} . {game.stats } - 
          <Link to={`/gamelog/${index}`}>View Detail</Link>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default GamesHistoryPage;
