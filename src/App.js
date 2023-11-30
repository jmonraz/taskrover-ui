import {useState} from 'react';

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {UserContext, UserProvider} from "./context/UserContext"; // importing UserProvider
import './App.css';

// screens
import LoginPage from './pages/loginpage/LoginPage';
import HomePage from "./pages/homepage/HomePage";

const ProtectedRoute = () => {
    const {authState} = useState(UserContext);
    const {userType, userState} = authState;

    if (!userState) {
        return <Navigate to="/" />;
    }

    return <Route path="*" element={<HomePage userType={userType} />} />;
}

const App = () => {
  return (
      <>
          <UserProvider> {/* Wrap the entire app in the provider component */}
              <Router>
                  <Routes>
                      <Route path="/" element={<LoginPage />} />
                        <Route path="/home/*" element={<ProtectedRoute />} />
                  </Routes>
              </Router>
          </UserProvider>
      </>
  )
};

export default App;