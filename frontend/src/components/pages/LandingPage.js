import React from "react";
import TopBar from "../commons/TopBar";
import { Container, Box, CssBaseline } from "@mui/material";

function LandingPage() {
  return (
    <Container disableGutters>
      <CssBaseline />
      <TopBar />
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>Content Area</Box>
    </Container>
  );
}

export default LandingPage;
