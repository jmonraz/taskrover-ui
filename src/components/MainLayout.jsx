import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const MainLayout = () => {
    return(
        <>
            <div className="main-layout">
                <Navbar />
                <Outlet />
            </div>

        </>
    );
};

export default MainLayout;