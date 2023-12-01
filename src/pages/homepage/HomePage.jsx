import React from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// components
import MainLayout from "../../components/MainLayout";

// screens
import AgentDashboard from "../agent_dashboard/AgentDashboard";

const HomeScreen = ({userType}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const dashboardPath = userType === 'agent' ? '/home/agent/dashboard' : '/home/user/dashboard';
        navigate(dashboardPath);
    }, [userType, navigate]);
    return(
        <>
                <Routes>
                    <Route path="/" element={<MainLayout />} >
                        <Route path="agent/dashboard" element={<AgentDashboard />} />
                    </Route>
                </Routes>
        </>
    );
};

export default HomeScreen;