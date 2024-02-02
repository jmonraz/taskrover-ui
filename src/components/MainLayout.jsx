import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {

    return(
        <>
                <Navbar/>
                <div className="main-layout-container">
                    <Outlet />
                </div>
            {/*footer*/}
        </>
    );
};

export default MainLayout;