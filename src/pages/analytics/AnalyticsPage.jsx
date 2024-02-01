import styles from './AnalyticsPage.module.css';

const AnalyticsPage = () => {
    return(
        <>
            <div>
                <h1>Analytics Page</h1>
                <div>
                    <p>Open Tickets</p>
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
                </div>
                <div>
                    <p>Department with Lowest Tickets</p>
                </div>
            </div>
        </>
    );
};

export default AnalyticsPage;