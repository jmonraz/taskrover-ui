import styles from "./AgentDashboard.module.css";

// components
import TicketBlock from "../../components/TicketBlock";
const AgentDashboard = () => {
    return (
        <>
            <p>FILTER TITLE (number of tickets) v</p>
            <div>
                <input type="checkbox" />
                <p>1 - 30 of 110</p>
                <button>prev</button>
                <button>next</button>
                <hr />
            </div>
            <div className={styles['ticket-blocks-col']}>
                <TicketBlock />
                <TicketBlock />
                <TicketBlock />
                <TicketBlock />
                <TicketBlock />
                <TicketBlock />

            </div>
        </>
    );
};

export default AgentDashboard;