import { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import { gridSpacing } from 'redux/constant';

import AllTimeOnDemandRequestCard from './cards/AllTimeOnDemandRequestCard';
import OnGoingOnDemandRequestCard from './cards/OnGoingOnDemandRequestCard';
import CompletedOnDemandRequestCard from './cards/CompletedOnDemandRequestCard';
import OnDemandStatisticsCard from './cards/OnDemandStatisticsCard';
import AllTimeScheduledCard from './cards/AllTimeScheduledCard';
import OnGoingScheduledCard from './cards/OnGoingScheduledCard';
import CompletedScheduledCard from './cards/CompletedScheduledCard';
import ScheduledStatisticsCard from './cards/ScheduledStatisticsCard';

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Grid container spacing={gridSpacing}>
      {/* <h2>Dashboard</h2> */}
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <AllTimeOnDemandRequestCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <OnGoingOnDemandRequestCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <CompletedOnDemandRequestCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <OnDemandStatisticsCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <AllTimeScheduledCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <OnGoingScheduledCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <CompletedScheduledCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <ScheduledStatisticsCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
