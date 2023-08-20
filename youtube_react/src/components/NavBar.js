import React from "react";
// import { withCookies } from "react-cookie";
import { Toolbar, Typography, AppBar } from "@mui/material";

import { FiLogOut } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";

const NavBar = (props) => {
    const Logout = () => {
        props.cookies.remove("jwt-token");
        window.location.href = "/";
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <button className="logo">
                    <FaYoutube />
                </button>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                    Youtube App
                </Typography>

                <button className="logout">
                    <FiLogOut onClick={() => Logout()} />
                </button>
            </Toolbar>
        </AppBar>
    );
};

// export default withCookies(NavBar);
export default NavBar;
