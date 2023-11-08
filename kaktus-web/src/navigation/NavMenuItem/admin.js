import { IconUsers, IconUserCog, IconKey } from '@tabler/icons-react';

const icons = { IconUsers, IconUserCog, IconKey };

const admin = {
  id: 'admin',
  title: 'Admin Tools',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'Manage Users',
      type: 'item',
      url: '/admin/manage-users',
      icon: icons.IconUserCog,
      breadcrumbs: false
    },
    {
      id: 'roles',
      title: 'Manage Roles',
      type: 'item',
      url: '/admin/manage-roles',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'access',
      title: 'Manage Access',
      type: 'item',
      url: '/admin/manage-access',
      icon: icons.IconKey,
      breadcrumbs: false
    }
  ]
};

export default admin;
