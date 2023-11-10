import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { useAuth } from 'hooks/useAuth';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';
// import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
// import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

// import PerfectScrollbar from 'react-perfect-scrollbar';

import MainCard from 'components/UI/Cards/MainCard';
import Transitions from 'components/UI/Extended/Transitions';

import { IconLogout, IconSettings } from '@tabler/icons-react';
// import axios from 'axios'
import AuthService from 'utils/AuthService';

const ProfileComponent = () => {
  const theme = useTheme();
  const { logout } = useAuth();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);
  const handleLogout = async () => {
    //remove token and access data tokens
    //from the local storage here

    AuthService.logout();
    logout();
    console.log('logout');
    navigate('/auth/login');
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  // const handleListItemClick = (event, index, route = '') => {
  //   setSelectedIndex(index);
  //   handleClose(event);

  //   if (route && route !== '') {
  //     navigate(route);
  //   }
  // };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.neutral[50],
          backgroundColor: theme.palette.neutral[50],
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.background.paper
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            variant="round"
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
              backgroundColor: theme.palette.neutral.main,
              color: '#fff'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ px: 2, pt: 2, pb: 1 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Good Morning,</Typography>
                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                          User Name
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">User Role</Typography>
                    </Stack>
                    <Divider />
                    <List
                      component="nav"
                      sx={{
                        width: '100%',
                        maxWidth: 350,
                        minWidth: 300,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '10px',
                        [theme.breakpoints.down('md')]: {
                          minWidth: '100%'
                        },
                        '& .MuiListItemButton-root': {
                          mt: 1
                        }
                      }}
                    >
                      <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px` }} onClick={handleLogout}>
                        <ListItemIcon>
                          <IconLogout stroke={2} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                      </ListItemButton>
                    </List>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileComponent;
