import {useState, useEffect } from 'react';

import styles from './AnalyticsPage.module.css';

// utils
import {getTickets} from "../../utils/firebaseUtils";
const AnalyticsPage = () => {
    const [tickets, setTickets] = useState([]);
    const [openTickets, setOpenTickets] = useState([]);
    const [highestDepartment, setHighestDepartment] = useState("");
    const [highestDepartmentOpenTickets, setDepartmentOpenTickets] = useState(0);
    const [lowestDepartment, setLowestDepartment] = useState("");

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const fetchedTickets = await getTickets();
                setTickets(fetchedTickets);
                console.log("Tickets fetched: ", fetchedTickets);
            } catch (error) {
                console.log("Error fetching tickets: ", error);
            }
        }
        const calculateOpenTickets = () => {
            const openTickets = tickets.filter(ticket => ticket.ticketStatus === "Open");
            console.log("Open tickets: ", openTickets);
            setOpenTickets(openTickets);
        }
        const calculateHighestDepartmentWithOpenTickets = () => {
            const openTickets = tickets.filter(ticket => ticket.ticketStatus === 'Open');

            const departmentCounts = openTickets.reduce((acc, ticket) => {
                acc[ticket.ticketDepartment] = (acc[ticket.ticketDepartment] || 0) + 1;
                return acc;
            }, {});

            const maxDept = Object.keys(departmentCounts).reduce((max, dept) =>
                departmentCounts[dept] > departmentCounts[max] ? dept : max, Object.keys(departmentCounts)[0]);

            const ticketsForMaxDept = openTickets.filter(ticket => ticket.ticketDepartment === maxDept);

            setHighestDepartment(maxDept);
            setDepartmentOpenTickets(ticketsForMaxDept.length);
        }
        if(tickets.length === 0) {
            fetchTickets().then(r => console.log("Tickets fetched"));
        }
        if(tickets.length > 0)
        {
            calculateOpenTickets();
            calculateHighestDepartmentWithOpenTickets();
        }

    },[tickets]);

    return(
        <>
            <div>
                <h1>Analytics Page</h1>
                <div>
                    <p>Open Tickets</p>
                    <p>{openTickets.length}</p>
                </div>
                <div>
                    <p>On Hold Tickets</p>
                </div>
                <div>
                    <p>Total Users</p>
                </div>
                <div>
                    <p>Active Agents</p>
                </div>
                <div>
                    <p>Department with Highest Tickets</p>
                    <p>{highestDepartment}</p>
                    <p>{highestDepartmentOpenTickets}</p>
                </div>
                <div>
                    <p>Department with Lowest Tickets</p>
                </div>
            </div>
        </>
    );
};

export default AnalyticsPage;