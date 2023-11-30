import React from "react";
import {Routes, Routes} from "react-router-dom";

// import agent-dashboard
// import other modules from the app, tickets, customers, analytics, chat, etc

const HomeScreen = ({handleLogout}) => {
    return(
        <>
            <Routes>
                <Route path="/" element={<MainLayout handleLogout={handleLogout} />} >
                    <Route
                        path='Dashboard'
                        index element={<Dashboard handleLogout={handleLogout} />} />
                    </Route>
            </Routes>
        </>
    )
}