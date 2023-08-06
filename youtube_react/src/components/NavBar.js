import React from "react";

import { Toolbar, Typography, AppBar } from "@mui/material";
import { styled } from "@mui/material/styles";

// import LogoutIcon from "@mui/icons-material/Logout";
import { FiLogOut } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
// import YouTubIcon from "@mui/icons-material/YouTube";

const useStyles = styled(AppBar)(({ theme }) => ({
    title: {
        flexGrow: 1,
    },
    logoutIcon: {
        position: "absolute",
        right: 0,
    },
}));

const NavBar = () => {
    const classes = useStyles;

    return (
        <AppBar position="static">
            <Toolbar>
                <button className="logo">
                    <FaYoutube />
                </button>
                <Typography variant="h5" className={classes.title}>
                    Youtube App
                </Typography>

                <button className="logout">
                    <FiLogOut />
                </button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
