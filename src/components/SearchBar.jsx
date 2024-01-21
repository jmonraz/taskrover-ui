import { useState} from "react";
import styles from "./SearchBar.module.css";
import searchIcon from "../assets/icons/search_icon.svg";
import FirebaseDBService from "../services/firebaseDbService";
const handleSearch = (query) => {
    const firebaseDBService = new FirebaseDBService();
    firebaseDBService.searchTickets(query)
        .then((matchingTickets) => {
            console.log("Matching Tickets:", matchingTickets);
            // Handle the matching tickets as needed
        })
        .catch((error) => {
            console.error("Search error:", error);
        });
}

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        handleSearch(searchQuery);
    };

    return(
        <>
            <div className={styles['search-bar']}>
                <input type="text" placeholder="Search..." value={searchQuery} onChange={handleInputChange}/>
                <img src={searchIcon} alt="maginifier-glass" onClick={handleSearchClick}/>
            </div>
        </>
    );
};

export default SearchBar;