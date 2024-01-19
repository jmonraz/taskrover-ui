import {useContext} from 'react';

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {UserContext, } from "./context/UserContext"; // importing UserProvider
import './App.css';

// screens
import LoginPage from './pages/loginpage/LoginPage';
import HomePage from "./pages/homepage/HomePage";
import Navbar from "./components/Navbar";
import AddDropdownButton from "./components/AddDropdownButton";

const ProtectedRoute = () => {
    const {authState} = useContext(UserContext);
    console.log('authState', authState);
    const {userType, userState} = authState;
    console.log('userType', userType);

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
                      <Route path="/home/*" element={<ProtectedRoute />} />
                  </Routes>
              </Router>
      </>
  )
};

export default App;