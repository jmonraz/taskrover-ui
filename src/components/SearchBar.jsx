import { useState} from "react";
import styles from "./SearchBar.module.css";
import searchIcon from "../assets/icons/search_icon.svg";
import FirebaseDBService from "../services/firebaseDbService";
import { useNavigate } from "react-router-dom";

const handleSearch = (query, navigate) => {
    const firebaseDBService = new FirebaseDBService();
    firebaseDBService
        .searchTickets(query)
        .then((matchingTickets) => {
            console.log("Matching Tickets:", matchingTickets);
            navigate("/search-results", { state: { matchingTickets } });
        })
        .catch((error) => {
            console.error("Search error:", error);
        });
};

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        handleSearch(searchQuery, navigate);
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