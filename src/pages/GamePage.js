import React, {useEffect} from 'react'
import GomokuGame from '../component/GomokuGame'
import { useAuth } from '../component/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavigationBar1 from '../component/NavigationBar1';

function GamePage() {
  const { isAuthenticated, login, logout } = useAuth();

  let navigate = useNavigate();
  useEffect(() => {
    if(!isAuthenticated){
      navigate("/")
    }
    },[])
  return (
    <div>
      <NavigationBar1/>
      <GomokuGame/>
    </div>
  )
}

export default GamePage
