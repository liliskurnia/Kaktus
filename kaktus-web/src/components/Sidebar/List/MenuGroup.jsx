import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import MenuItems from './MenuItems';
import MenuCollapse from './MenuCollapse';

const MenuGroup = ({ item }) => {
  const theme = useTheme();

  const items = item.children?.map((menu) => {
    switch (menu.type) {
      case 'collapse':
        return <MenuCollapse key={menu.id} menu={menu} level={1} />;
      case 'item':
        return <MenuItems key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
              {item.title}
              {item.caption && (
                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

MenuGroup.propTypes = {
  item: PropTypes.object
};

export default MenuGroup;
