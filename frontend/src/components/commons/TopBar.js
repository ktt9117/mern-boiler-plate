import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();

  return (
    <Box
      px={2}
      sx={{
        display: "flex",
        height: "46px",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#dedede",
      }}
    >
      <IconButton>
        <MenuIcon aria-label="Menu" />
      </IconButton>
      Title
      <IconButton aria-label="My Page" onClick={() => navigate("/exam")}>
        <PersonIcon />
      </IconButton>
    </Box>
  );
}
