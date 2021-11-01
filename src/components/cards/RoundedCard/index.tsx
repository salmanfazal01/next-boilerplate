import { Card } from "@mui/material";
import React from "react";

const RoundedCard = ({ children, ...other }) => {
  return (
    <Card sx={{ px: 4, py: 3, borderRadius: "16px" }} elevation={3} {...other}>
      {children}
    </Card>
  );
};

export default RoundedCard;
