import { Button, Link, Box } from "@mui/material";
import { Route, Link as RouterLink, Routes } from "react-router-dom";
import Episodes from "./Episodes";
import Episode from "./Episode";
import Characters from "./Characters";
import Character from "./Character";
import Home from "./Home";

export default function Layout() {
  return (
    <div className="App">
      <Box component="nav" sx={{ mx: 'auto', display: 'flex', justifyContent: 'center', backgroundColor: 'Field' }}>
        <Link component={RouterLink} to="/">
          <Button color="primary">Home</Button>
        </Link>
        <Link component={RouterLink} to="/episodes">
          <Button color="primary">Episodes</Button>
        </Link>
        <Link component={RouterLink} to="/characters">
          <Button color="primary">Characters</Button>
        </Link>
      </Box>
      <Box component="main" sx={{ mx: 'auto', p: '16px' }}>
        <Routes>
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episodes/:episodeId" element={<Episode />} />
          <Route path="/characters" element={<Characters />} />
          <Route
            path="/characters/:characterId"
            element={<Character />}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </Box>
    </div>
  );
}
