import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { withProtected } from "src/hoc/routes";
import DashboardCounter from "@components/cards/DashboardCounter";
import { useFirestore } from "src/hooks/firebase";
import { getDailyReg, getMonthlyReg, getTotalUsers } from "src/api/dashboard";

const Dashboard = ({ user }) => {
  const [dailyRegs, setDailyRegs] = useState(0);
  const [monthlyRegs, setMonthlyRegs] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  const db = useFirestore();

  useEffect(() => {
    const _dailyRegs = getDailyReg(db, setDailyRegs);
    const _monthlyRegs = getMonthlyReg(db, setMonthlyRegs);
    const _usersCount = getTotalUsers(db, setUsersCount);

    return () => {
      _dailyRegs();
      _monthlyRegs();
      _usersCount();
    };
  }, []);

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Welcome back, {user?.firstName}!
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCounter count={dailyRegs} text="Registrations Today" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCounter
            count={monthlyRegs}
            text="Registrations this month"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCounter count={usersCount} text="Total Users" />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCounter count={0} text="Temp" />
        </Grid>
      </Grid>
    </div>
  );
};

export default withProtected(Dashboard);
