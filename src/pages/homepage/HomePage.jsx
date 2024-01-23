import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import MainLayout from "../../components/MainLayout";

// screens
import AgentDashboard from "../agent_dashboard/AgentDashboard";
import TicketDetails from "../ticket_details/TicketDetails";
import CreateTicket from "../create_ticket/CreateTicket"
import UserDashboard from "../user_dashboard/UserDashboard";
import UserWelcomePage from "../user_welcome_page/UserWelcomePage";

const HomeScreen = ({userType}) => {
    const navigate = useNavigate();
    const [initialLoad, setInitialLoad] = useState(false);
    useEffect(() => {
        if (!initialLoad) {
            const dashboardPath = userType === 'agent' ? '/home/agent/dashboard' : '/home/user/welcome';
            setInitialLoad(true);
            navigate(dashboardPath);
        }

    }, [userType, navigate, initialLoad]);
    return(
        <>
                <Routes>
                    <Route path="/" element={<MainLayout />} >
                        <Route path="agent/dashboard" element={<AgentDashboard />} />
                        <Route path="agent/dashboard/:ticketId/ticket-details" element={<TicketDetails />} />
                        <Route path="agent/dashboard/create-a-ticket" element={<CreateTicket />}/>
                        <Route path="user/welcome" element={<UserWelcomePage />} />
                        <Route path="user/dashboard" element={<UserDashboard/>} />
                        <Route path="user/dashboard/:ticketId/ticket-details" element={<TicketDetails />} />
                        <Route path="user/dashboard/create-a-ticket" element={<CreateTicket />}/>
                    </Route>
                </Routes>
        </>
    );
};

export default HomeScreen;