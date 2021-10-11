import { Typography } from "@mui/material";
import React from "react";

const Home: React.FC = (props) => {
  return (
    <div>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
        Home Page
      </Typography>

      <Typography variant="h3" sx={{ fontWeight: 500, mb: 2 }}>
        NextJS Boilerplate by Salman Fazal
      </Typography>

      <Typography sx={{ fontSize: 26 }}>
        1. Email password authentication
        <br />
        2. Google Sign in
        <br />
        3. Forgot passwors
        <br />
        4. Protected Routes
        <br />
      </Typography>
    </div>
  );
};

export default Home;
