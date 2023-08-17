import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../component/AuthContext';
import NavigationBar1 from '../component/NavigationBar1';

const LoginPage = ({ onLogin }) => {
  const { isAuthenticated, login, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate(); 

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin'){
    //   store the login authentication on isauthenticated
      navigate('/');
      login()
    } else {        
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <NavigationBar1/>
      <h3>Login</h3>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
