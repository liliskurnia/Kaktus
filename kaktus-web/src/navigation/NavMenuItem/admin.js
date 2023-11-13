import { IconUsers, IconUserCog, IconKey } from '@tabler/icons-react';

const icons = { IconUsers, IconUserCog, IconKey };

const admin = {
  id: 'admin',
  title: 'Admin Tools',
  previllages: ['System Admin', 'User Admin'],
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
    },
    {
      id: 'menus',
      title: 'Manage Menus',
      type: 'item',
      url: '/admin/manage-menus',
      previllage: 'System Admin',
      icon: icons.IconKey,
      breadcrumbs: false
    },
    {
      id: 'role-menus',
      title: 'Manage Role Menus',
      type: 'item',
      url: '/admin/manage-role-menu',
      icon: icons.IconKey,
      breadcrumbs: false
    }
  ]
};

export default admin;
