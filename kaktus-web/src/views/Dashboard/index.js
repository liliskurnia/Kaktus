// import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { gridSpacing } from 'redux/constant';

const Dashboard = () => {
  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(false);
  // }, []);
  return (
    <Grid container spacing={gridSpacing}>
      <h2>Dashboard</h2>
    </Grid>
  );
};

export default Dashboard;
