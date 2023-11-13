import PropTypes from 'prop-types';

import { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';

import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import MainCard from 'components/UI/Cards/MainCard';
import SkeletonCompletedCard from 'components/UI/Cards/Skeleton/EarningCard';

import { IconChecklist } from '@tabler/icons-react';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
    position: 'relative',
    zIndex: 5
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.primary.dark,
    borderRadius: '50%',
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.primary.dark,
    borderRadius: '50%',
    zIndex: 1,
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

const CompletedScheduledCard = ({ isLoading }) => {
  const theme = useTheme();

  const [timeValue, setTimeValue] = useState('Today');

  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };
  return (
    <>
      {isLoading ? (
        <SkeletonCompletedCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary.dark,
                        mt: 1
                      }}
                    >
                      <IconChecklist stroke={2} color={theme.palette.background.paper} />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Button
                      disableElevation
                      variant={timeValue === 'Today' ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit', '&:hover': { backgroundColor: theme.palette.primary[600] } }}
                      color="primary"
                      onClick={(e) => handleChangeTime(e, 'Today')}
                    >
                      Today
                    </Button>
                    <Button
                      disableElevation
                      variant={timeValue === 'Month' ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit', '&:hover': { backgroundColor: theme.palette.primary[600] } }}
                      color="primary"
                      onClick={(e) => handleChangeTime(e, 'Month')}
                    >
                      Month
                    </Button>
                    <Button
                      disableElevation
                      variant={timeValue === 'Year' ? 'contained' : 'text'}
                      size="small"
                      color="primary"
                      sx={{ color: 'inherit', '&:hover': { backgroundColor: theme.palette.primary[600] } }}
                      onClick={(e) => handleChangeTime(e, 'Year')}
                    >
                      Year
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>total data here</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: theme.palette.primary[100]
                  }}
                >
                  Completed Scheduled Pickups
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

CompletedScheduledCard.propTypes = {
  isLoading: PropTypes.bool
};

export default CompletedScheduledCard;
