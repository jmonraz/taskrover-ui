import styles from "./AddDropdownButton.module.css";
import addIcon from "../assets/icons/add_icon.svg";
import dropdownArrow from "../assets/icons/dropdown_arrow.svg";
import {useContext} from "react";
import {UserContext} from "../context/UserContext";

const AppDropdownButton = ({onClick}) => {
    const { authState } = useContext(UserContext);

    const AgentButton = (
        <div className={styles['button-container']}>
        <div className={styles['btn-box']}>
        <img src={addIcon} alt="add" />
        </div>
    <div className={styles['vertical-line']}>
    </div>
    <div className={styles['btn-box']} onClick={onClick}>
        <img src={dropdownArrow} alt="dropdown"  />
    </div>
</div>
    );

    const UserButton =(
        <div className={styles['button-container']} style={{marginLeft: '10px',}} onClick={onClick}>
        <div className={styles['btn-box']}>
        <p style={{color:'#ffff'}}>Create A Ticket</p>
        </div>
</div>
    );
    return(
        <>
            {authState.userType === 'user' ? UserButton : AgentButton}
        </>
    );
};

export default AppDropdownButton;