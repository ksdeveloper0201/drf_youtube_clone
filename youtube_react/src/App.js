import "./App.css";
import { indigo } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "./components/NavBar";

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
        <ThemeProvider theme={theme}>
            <NavBar />
        </ThemeProvider>
    );
}

export default App;
