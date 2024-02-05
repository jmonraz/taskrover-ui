import styles from "./SearchBar.module.css";
import searchIcon from "../assets/icons/search_icon.svg";
const SearchBar = ({inputProps}) => {
    return(
        <>
            <div className={styles['search-bar']}>
                <input type="text" placeholder="Search..." onChange={inputProps.onChange} value={inputProps.value} />
                <img src={searchIcon} alt="maginifier-glass" />
            </div>
        </>
    );
};

export default SearchBar;