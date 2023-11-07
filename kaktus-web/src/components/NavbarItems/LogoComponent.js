import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonBase } from '@mui/material';

import config from 'config';
import Logo from '../UI/logos/Logo';
import { MENU_OPEN } from 'redux/actions';

const LogoComponent = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
      <Logo />
    </ButtonBase>
  );
};

export default LogoComponent;
