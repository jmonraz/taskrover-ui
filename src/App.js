import {useState} from 'react';

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css';

// screens
import LoginPage from './pages/loginpage/LoginPage';
const App = () => {

    const [userLogged, setUserLogged] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const handleLogin = (username, password) => {
        if (username === 'admin' && password === 'admin') {
            setUserLogged(true);
            setLoginError(false);
        } else {
            setLoginError(true);
        }
    };

    const handleLogout = () => {
        setUserLogged(false);
    };

  return (
      <>
          <div className="app-container">
              <Router>
                  <Routes>
                      <Route
                          path="/"
                          element={<LoginPage handleLogin={handleLogin} loginError={loginError} />} />
                  </Routes>
              </Router>
          </div>
      </>
  )
};

export default App;