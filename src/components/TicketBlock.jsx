import styles from './TicketBlock.module.css';

const TicketBlock = () => {
    return (
        <>
            <div className={styles['ticket-block']}>
                <div className={styles['ticket-row']}>
                    <p>[]</p>
                    <p>circular image</p>
                    <div className={styles['ticket-col']}>
                        <div className={styles['ticket-row']}>
                            <p>Orders have not been picked up by Fedex</p>
                            <p>#123345</p>
                        </div>
                        <div className={styles['ticket-row']}>
                            <p>1/10/2023</p>
                            <p>Agent responded to ticket 18hrs ago</p>
                        </div>
                    </div>
                </div>
                <div className={styles['ticket-row']}>
                    <div className={styles['ticket-col']}>
                        <p>Low v</p>
                        <p>Orders v</p>
                        <p>Open v</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TicketBlock;