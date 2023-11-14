import { Typography, Grid, Stack, Divider, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AuthWrapper from './Authentication/AuthWrapper';
import AuthCardWrapper from './Authentication/AuthCardWrapper';
import AuthFooter from 'components/UI/Cards/AuthFooter';

const NotFound = () => {
  const theme = useTheme();
  return (
    <div className="not-found">
      <AuthWrapper>
        <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                      <Grid container direction="row" alignItems="center" justifyContent="center">
                        <Grid item>
                          <Stack alignItems="center" justifyContent="center" spacing={1}>
                            <Typography color={theme.palette.error.main} gutterBottom variant={'h2'}>
                              Page Not Found
                            </Typography>
                            <Typography variant="caption" fontSize="16px" textAlign={'center'}>
                              The page you&apos;re trying to find is not availible
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container direction="column" alignItems="center" xs={12}>
                        <Typography
                          component={Link}
                          href="/dashboard"
                          variant="subtitle1"
                          sx={{ textDecoration: 'none', ':hover': { color: theme.palette.primary.main, cursor: 'pointer' } }}
                        >
                          &gt;&emsp; Return to the main page? &emsp;&lt;
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
            <AuthFooter />
          </Grid>
        </Grid>
      </AuthWrapper>
    </div>
  );
};

export default NotFound;
