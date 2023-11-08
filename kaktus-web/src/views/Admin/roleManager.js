// import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { gridSpacing } from 'redux/constant';

const roleManager = () => {
  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(false);
  // }, []);
  return (
    <Grid container spacing={gridSpacing}>
      <h2>role manager</h2>
    </Grid>
  );
};

export default roleManager;
