import React from "react";
import TopBar from "../commons/TopBar";

function LandingPage() {
  return (
    <div>
      <TopBar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        Content Area
      </div>
    </div>
  );
}

export default LandingPage;
