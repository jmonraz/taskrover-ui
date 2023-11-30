import styles from './TicketBlock.module.css';
import {useState} from "react";
import personImage from '../assets/img/person1.webp';
import downArrowIcon from '../assets/icons/dropdown_arrow.svg';

const TicketBlock = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () =>
        setIsChecked(!isChecked);
    return (
        <>
            <div className={styles['ticket-block']}>
                <div className={styles['ticket-row']}>
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className={styles['custom-checkbox']} />
                    <img src={personImage} alt='person' className={styles['circular-image']} />
                    <div className={styles['ticket-col']}>
                        <div className={styles['ticket-row']}>
                            <p className={styles['ticket-title']}>Orders have not been picked up by Fedex</p>
                            <p className={styles['ticket-number']}>#123345</p>
                        </div>
                        <div className={styles['ticket-row']}>
                            <p className={styles['ticket-date']}>1/10/2023</p>
                            <p className={styles['respond-wrapper']}>Agent responded to ticket 18hrs ago</p>
                        </div>
                    </div>
                </div>
                <div className={styles['ticket-row']}>
                    <div className={`${styles['ticket-col']} ${styles['ticket-menu']}`}>
                        <div className={styles['ticket-row']}>
                            <p>Low</p>
                            <img src={downArrowIcon} alt='drop-arrow' className={styles['icon']} />
                        </div>
                        <div className={styles['ticket-row']}>
                            <p>Orders</p>
                            <img src={downArrowIcon} alt='drop-arrow' className={styles['icon']} />
                        </div>
                        <div className={styles['ticket-row']}>
                            <p>Open</p>
                            <img src={downArrowIcon} alt='drop-arrow' className={styles['icon']} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default TicketBlock;