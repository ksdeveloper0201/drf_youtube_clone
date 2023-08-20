import * as React from "react";
import { useReducer } from "react";
import axios from "axios";
import { withCookies } from "react-cookie";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import {
    START_FETCH,
    FETCH_SUCCESS,
    ERROR_CATCHED,
    INPUT_EDIT,
    TOGGLE_MODE,
} from "./actionTypes";

const defaultTheme = createTheme();

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const initialState = {
    isLoading: false,
    isLoginView: true,
    error: "",
    credentialsLog: {
        email: "",
        password: "",
    },
};

const loginReducer = (state, action) => {
    switch (action.type) {
        case START_FETCH: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case FETCH_SUCCESS: {
            return {
                ...state,
                isLoading: false,
            };
        }
        case ERROR_CATCHED: {
            return {
                ...state,
                error: "Email or password is not correct !",
                isLoading: false,
            };
        }
        case INPUT_EDIT: {
            return {
                ...state,
                //[action.inputName]: action.payload,
                credentialsLog: {
                    ...state.credentialsLog,
                    [action.inputName]: action.payload,
                },
                error: "",
            };
        }
        case TOGGLE_MODE: {
            return {
                ...state,
                isLoginView: !state.isLoginView,
            };
        }
        default:
            return state;
    }
};

const Login = (props) => {
    const [state, dispatch] = useReducer(loginReducer, initialState);

    const inputChangedLog = () => (event) => {
        const cred = state.credentialsLog;
        cred[event.target.name] = event.target.value;
        dispatch({
            type: INPUT_EDIT,
            inputName: "state.credentialLog",
            payload: cred,
        });
    };

    const login = async (event) => {
        event.preventDefault();
        if (state.isLoginView) {
            try {
                dispatch({ type: START_FETCH });
                const res = await axios.post(
                    `http://127.0.0.1:8000/authen/jwt/create/`,
                    state.credentialsLog,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                props.cookies.set("jwt_token", res.data.access);
                res.data.access
                    ? (window.location.href = "/youtube")
                    : (window.location.href = "/");
                dispatch({ type: FETCH_SUCCESS });
            } catch {
                dispatch({ type: ERROR_CATCHED });
            }
        } else {
            try {
                dispatch({ type: START_FETCH });
                await axios.post(
                    `http://127.0.0.1:8000/api/create/`,
                    state.credentialsLog,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                const res = await axios.post(
                    `http://127.0.0.1:8000/authen/jwt/create/`,
                    state.credentialsLog,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                props.cookies.set("jwt-token", res.data.access);
                res.data.access
                    ? (window.location.href = "/youtube")
                    : (window.location.href = "/");
                dispatch({ type: FETCH_SUCCESS });
            } catch {
                dispatch({ type: ERROR_CATCHED });
            }
        }
    };

    const toggleView = () => {
        dispatch({ type: TOGGLE_MODE });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {state.isLoading && <CircularProgress />}
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={login}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        {state.isLoading && <CircularProgress />}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={state.credentialsLog.email}
                            onChange={inputChangedLog()}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={state.credentialsLog.password}
                            onChange={inputChangedLog()}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <span
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                color: "fuchsia",
                                marginTop: 10,
                            }}
                        >
                            {state.error}
                        </span>

                        <Button
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                color: "teal",
                            }}
                            type="submit"
                            fullWidth
                            disabled={
                                !state.credentialsLog.password ||
                                !state.credentialsLogs.email
                            }
                            variant="contained"
                            color="primary"
                        >
                            {state.isLoginView ? "Login" : "Register"}
                        </Button>

                        <span
                            onClick={() => toggleView()}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                color: "teal",
                            }}
                        >
                            {state.isLoginView
                                ? "Create Account"
                                : "Back to login"}
                        </span>

                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
};

export default withCookies(Login);
