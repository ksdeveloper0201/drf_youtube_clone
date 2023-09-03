import "./App.css";
import { indigo } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "./components/NavBar";

import ApiCOntextProvider from "./context/ApiContext";
import Main from "./components/Main";

const theme = createTheme({
    palette: {
        primary: indigo,
        secondary: {
            main: "#f44336",
        },
    },
    typography: {
        fontFamily: '"Roboto", sans-serif',
    },
});

function App() {
    return (
        <ApiCOntextProvider>
            <ThemeProvider theme={theme}>
                <NavBar />
                <Main />
            </ThemeProvider>
        </ApiCOntextProvider>
    );
}

export default App;
