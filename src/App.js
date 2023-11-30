import {useState} from 'react';

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {UserProvider} from "./context/UserContext"; // importing UserProvider
import './App.css';

// screens
import LoginPage from './pages/loginpage/LoginPage';

const App = () => {

    const [userLogged, setUserLogged] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const handleLogin = (username, password) => {
        if (username === 'admin@gmail.com' && password === 'admin') {
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
          <UserProvider> {/* Wrap the entire app in the provider component */}
              <Router>
                  <Routes>
                      <Route
                          path="/"
                          element={<LoginPage handleLogin={handleLogin} loginError={loginError} />} />
                  </Routes>
              </Router>
          </UserProvider>
      </>
  )
};

export default App;