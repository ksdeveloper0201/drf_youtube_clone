import React, { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import Modal from "react-modal";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { IoMdClose } from "react-icons/io";
import { RiUploadCloud2Line } from "react-icons/ri";
import { FaVideo } from "react-icons/fa";
import { BsImages } from "react-icons/bs";

import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

const Main = () => {
    Modal.setAppElement("#root");
    const {
        title,
        setTitle,
        video,
        setVideo,
        thum,
        setThum,
        modalIsOpen,
        setModalIsOpen,
        newVideo,
    } = useContext(ApiContext);

    const customStyles = {
        content: {
            top: "30%",
            left: "43%",
            right: "auto",
            bottom: "auto",
        },
    };

    const handleEditMovie = () => {
        const fileInput = document.getElementById("mp4Input");
        fileInput.click();
    };

    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    return (
        <>
            <Grid
                container
                sx={{
                    justifyContent: "center",
                }}
            >
                <Grid item xs={11}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}></Grid>

                        <Grid item xs={1}>
                            <Fab
                                color="primary"
                                aria-label="add"
                                onClick={() => setModalIsOpen(true)}
                            >
                                <AddIcon />
                            </Fab>
                        </Grid>

                        <Grid item xs={8}>
                            <VideoDetail />
                        </Grid>

                        <Grid item xs={3}>
                            <VideoList />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
            >
                <Typography>Movie title</Typography>
                <br />
                <TextField
                    type="text"
                    onChange={(event) => setTitle(event.target.value)}
                />
                <br />
                <br />
                <Container
                    sx={{
                        textAlign: "center",
                    }}
                >
                    <input
                        type="file"
                        id="mp4Input"
                        hidden="hidden"
                        onChange={(event) => setVideo(event.target.files[0])}
                    />

                    <IconButton onClick={handleEditMovie}>
                        <FaVideo className="photo" />
                    </IconButton>
                    <br />

                    <input
                        type="file"
                        id="imageInput"
                        hidden="hidden"
                        onChange={(event) => setThum(event.target.files[0])}
                    />

                    <IconButton onClick={handleEditPicture}>
                        <BsImages className="photo" />
                    </IconButton>
                    <br />

                    {title && video && thum && (
                        <button
                            className="btn-modal"
                            onClick={() => newVideo()}
                        >
                            <RiUploadCloud2Line />
                        </button>
                    )}
                    <button
                        className="btn-modal"
                        onClick={() => setModalIsOpen(false)}
                    >
                        <IoMdClose />
                    </button>
                </Container>
            </Modal>
        </>
    );
};

export default Main;
