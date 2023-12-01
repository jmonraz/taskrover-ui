import styles from "./AddDropdownButton.module.css";
import addIcon from "../assets/icons/add_icon.svg";
import dropdownArrow from "../assets/icons/dropdown_arrow.svg";

const AppDropdownButton = ({onClick}) => {
    return(
        <>
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
        </>
    );
};

export default AppDropdownButton;