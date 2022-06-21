import './App.css';
import { Grid } from "@mui/material";
import Welcome from "./components/Welcome";
import UserInput from "./components/UserInput";
import MintNFT from './components/MintNFT';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh', marginTop: 10 }}
      >
        <Welcome />
        <Routes>
          <Route exact path="/" element={<UserInput />} />
          <Route path="/mintnft" element={<MintNFT />} />
        </Routes>
      </Grid>
    </Router>
  );
}

export default App;
