// styles
import styles from "./TicketDetails.module.css";

import {useEffect} from "react";

const TicketDetails = () => {

    useEffect(() => {
        console.log('ticket details');
    }, []);
    return (
        <>
            <div className={styles['left-container']}>
                <p>Hello</p>
            </div>
            <div className={styles['right-container']}>

            </div>
        </>
    );
};

export default TicketDetails;