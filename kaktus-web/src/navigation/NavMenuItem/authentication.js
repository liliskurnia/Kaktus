import { IconLogin2, IconUserPlus } from '@tabler/icons-react';

const icons = { IconLogin2, IconUserPlus };

const authentication = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'login',
      title: 'Login',
      type: 'item',
      url: '/auth/login',
      icon: icons.IconLogin2
    },
    {
      id: 'register',
      title: 'Register',
      type: 'item',
      url: '/auth/register',
      icon: icons.IconUserPlus
    }
  ]
};

export default authentication;
