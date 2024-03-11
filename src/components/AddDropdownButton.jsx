import styles from "./AddDropdownButton.module.css";
import addIcon from "../assets/icons/add_icon.svg";
import dropdownArrow from "../assets/icons/dropdown_arrow.svg";
import {useContext} from "react";
import {UserContext} from "../context/UserContext";
import Button from "./Button";

const AppDropdownButton = ({onClick}) => {
    const { authState } = useContext(UserContext);

    const AgentButton = (
        <div className={styles['button-container']}>
        <div className={styles['btn-box']} onClick={onClick}>
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
        <Button onClick={onClick}>Create Ticket</Button>
    );
    return(
        <>
            {authState.userType === 'user' ? UserButton : AgentButton}
        </>
    );
};

export default AppDropdownButton;