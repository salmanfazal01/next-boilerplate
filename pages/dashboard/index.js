import React from "react";
import { withProtected } from "src/hoc/routes";

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default withProtected(Dashboard);
