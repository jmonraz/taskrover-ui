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
    const [lowestDepartmentOpenTickets, setLowestDepartmentOpenTickets] = useState(0);

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

        const calculateLowestDepartmentWithOpenTickets = () => {
            const openTickets = tickets.filter(ticket => ticket.ticketStatus === 'Open');

            const departmentCounts = openTickets.reduce((acc, ticket) => {
                acc[ticket.ticketDepartment] = (acc[ticket.ticketDepartment] || 0) + 1;
                return acc;
            }, {});

            const minDept = Object.keys(departmentCounts).reduce((min, dept) =>
                departmentCounts[dept] < departmentCounts[min] ? dept : min, Object.keys(departmentCounts)[0]);

            const ticketsForMinDept = openTickets.filter(ticket => ticket.ticketDepartment === minDept);

            setLowestDepartment(minDept);
            setLowestDepartmentOpenTickets(ticketsForMinDept.length);
        }

        if(tickets.length === 0) {
            fetchTickets().then(r => console.log("Tickets fetched"));
        }
        if(tickets.length > 0)
        {
            calculateOpenTickets();
            calculateHighestDepartmentWithOpenTickets();
            calculateLowestDepartmentWithOpenTickets();
        }

    },[tickets]);

    return(
        <>
            <h1 className={styles['page-title']}>Analytics</h1>
            <div className={styles['col']}>
                <div className={styles['row']}>
                    <div className={styles['card']}>
                        <p className={styles['card-header']}>Open Tickets</p>
                        <p className={styles['card-content']}>{openTickets.length}</p>
                    </div>
                    <div className={styles['card']}>
                        <p className={styles['card-header']}>Department with Highest Open Tickets</p>
                        <p className={styles['card-content']}>{highestDepartment} <span className={styles['card-content-inline']}>({highestDepartmentOpenTickets})</span></p>
                        {/*<p className={styles['card-content']}>{highestDepartmentOpenTickets}</p>*/}
                    </div>
                    <div className={styles['card']}>
                        <p className={styles['card-header']}>Department with Lowest Open Tickets</p>
                        <p className={styles['card-content']}>{lowestDepartment} <span className={styles['card-content-inline']}>({lowestDepartmentOpenTickets})</span></p>
                        {/*<p className={styles['card-content']}>{lowestDepartmentOpenTickets}</p>*/}
                    </div>
                </div>


            </div>
        </>
    );
};

export default AnalyticsPage;