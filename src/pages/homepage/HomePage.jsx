import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

// components
import MainLayout from "../../components/MainLayout";

const HomeScreen = ({userType}) => {
    return(
        <>
            <MainLayout>
                <Routes>
                    {userType === 'agent' ? (
                        <>
                            <Route path="/" element={<Navigate replace to="/home/agent/dashboard" />} />
                            {/*<Route path="agent/dashboard" element={<AgentDashboard />} />*/}
                        </>
                    ): (
                        <>
                            <Route path="/" element={<Navigate replace to="/home/user/dashboard" />} />
                            {/*<Route path="admin/dashboard" element={<UserDashboard />} />*/}
                        </>
                    )}
                </Routes>
            </MainLayout>
        </>
    );
};

export default HomeScreen;