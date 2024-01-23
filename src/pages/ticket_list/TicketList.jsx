import React from "react";

const SearchResultsPage = ({ matchingTickets }) => {
    if (!matchingTickets) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Search Results</h2>
            <ul>
                {matchingTickets.map((ticket) => (
                    <li key={ticket.id}>{ticket.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResultsPage;