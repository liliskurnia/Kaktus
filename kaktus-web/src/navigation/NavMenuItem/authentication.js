import { IconLogin2, IconUserPlus } from '@tabler/icons-react';

const icons = { IconLogin2, IconUserPlus };

const authentication = {
  id: 'authentication',
  title: 'Auth',
  type: 'group',
  children: [
    {
      id: 'login',
      title: 'Login',
      type: 'item',
      url: '/auth/login',
      icon: icons.IconLogin2,
      breadcrumbs: false
    },
    {
      id: 'register',
      title: 'Register',
      type: 'item',
      url: '/auth/register',
      icon: icons.IconUserPlus,
      breadcrumbs: false
    }
  ]
};

export default authentication;
