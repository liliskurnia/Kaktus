import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { gridSpacing } from 'redux/constant';
import UserTable from './UserTable';

const UserManager = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <UserTable isLoading={isLoading} />
      </Grid>
    </Grid>
  );
};

export default UserManager;
