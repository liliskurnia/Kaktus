import { IconUsers, IconUserCog, IconKey } from '@tabler/icons-react';

const icons = { IconUsers, IconUserCog, IconKey };

const customer = {
  id: 'customer',
  title: 'Customer Tools',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'Manage Users',
      type: 'item',
      url: '/customer/manage-users',
      icon: icons.IconUserCog,
      breadcrumbs: false
    }
  ]
};

export default customer;
