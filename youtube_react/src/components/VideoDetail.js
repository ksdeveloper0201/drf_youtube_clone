import React, { useContext, useRef } from "react";
import { ApiContext } from "../context/ApiContext";
import { Grid } from "@mui/material";
//import Container from "@material-ui/core/Container";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactPlayer from "react-player";

import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { IoLogoYoutube } from "react-icons/io";

const VideoDetail = () => {
    const player = useRef(null);
    const { selectedVideo, deleteVideo, incrementLike, incrementDislike } =
        useContext(ApiContext);

    if (!selectedVideo)
        return (
            <div className="container">
                <button className="wait">
                    <IoLogoYoutube />
                </button>
            </div>
        );

    return (
        <>
            <div className="wrapper">
                <ReactPlayer
                    className="player"
                    url={selectedVideo.video}
                    ref={player}
                    width="100%"
                    height="100%"
                    playing
                    controls
                    disablePictureInPicture
                    config={{
                        file: {
                            controlsList: "nodownload",
                            disablePictureInPicture: true,
                        },
                    }}
                />
            </div>
            <Grid container alignItems="center">
                <Grid item xs={10}>
                    <Typography
                        sx={{ paddingLeft: (theme) => theme.spacing(2) }}
                        variant="h6"
                    >
                        {selectedVideo.like}
                    </Typography>
                </Grid>
                <Grid item sx={1}>
                    <button className="like" onClick={() => incrementLike()}>
                        <AiFillLike />
                        <Typography>{selectedVideo.like}</Typography>
                    </button>
                </Grid>
                <Grid item xs={1}>
                    <button className="like" onClick={() => incrementDislike()}>
                        <AiFillDislike />
                    </button>
                    <Typography>{selectedVideo.dislike}</Typography>
                </Grid>
            </Grid>
            <Fab
                sx={{ margin: (theme) => theme.spacing(2) }}
                color="primary"
                aria-label="delete"
                onClick={() => deleteVideo()}
            >
                <DeleteIcon />
            </Fab>
        </>
    );
};

export default VideoDetail;
