import React, {useContext} from 'react';

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {UserContext, } from "./context/UserContext"; // importing UserProvider
import './App.css';

// screens
import LoginPage from './pages/loginpage/LoginPage';
import HomePage from "./pages/homepage/HomePage";
import Navbar from "./components/Navbar";
import AddDropdownButton from "./components/AddDropdownButton";
import PasswordChange from "./pages/password_change/Password_Change";

const ProtectedRoute = () => {
    const {authState} = useContext(UserContext);
    const {userType, userState} = authState;

    if (!userState) {
        return <Navigate to="/" />;
    }

    return (
        <Routes>
            <Route path="*" element={<HomePage userType={userType} />} />
            <Route path="*" element={<Navbar userType={userType.toString()} />} />
            <Route path="*" element={<AddDropdownButton userType={userType.toString()} />} />
        </Routes>
        );
}

const App = () => {
  return (
      <>
              <Router>
                  <Routes>
                      <Route path="/" element={<LoginPage />} />
                      <Route path="/change-password" element={<PasswordChange />}/>
                      <Route path="/home/*" element={<ProtectedRoute />} />
                  </Routes>
              </Router>
      </>
  )
};

export default App;