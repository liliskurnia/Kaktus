import { Typography } from '@mui/material';

import MenuGroup from './MenuGroup';
import navMenuItem from 'navigation/NavMenuItem/';

//need to add previllage check here
const MenuList = () => {
  const navItems = navMenuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <MenuGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });
  return <>{navItems}</>;
};

export default MenuList;
