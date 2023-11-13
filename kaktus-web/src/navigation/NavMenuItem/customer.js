import { IconFileDescription, IconHistory, IconMapPins, IconLayoutDashboard, IconTicket } from '@tabler/icons-react';

const icons = { IconFileDescription, IconHistory, IconMapPins, IconLayoutDashboard, IconTicket };

const customer = {
  id: 'customer',
  previllage: 'customer',
  title: 'Customer Menu',
  type: 'group',
  children: [
    {
      id: 'customer-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/customer/dashboard',
      icon: icons.IconLayoutDashboard
    },
    {
      id: 'pickup-request',
      title: 'Request Pick-Up',
      type: 'item',
      url: '/customer/request',
      icon: icons.IconFileDescription,
      breadcrumbs: false
    },
    {
      id: 'customer-history',
      title: 'Request History',
      type: 'item',
      url: '/customer/history',
      icon: icons.IconHistory,
      breadcrumbs: false
    },
    {
      id: 'track-request',
      title: 'Track Request',
      type: 'item',
      url: '/customer/track',
      icon: icons.IconMapPins,
      breadcrumbs: false
    },
    {
      id: 'customer-voucher',
      title: 'Vouchers',
      type: 'item',
      url: '/customer/vouchers',
      icon: icons.IconTicket,
      breadcrumbs: false
    }
  ]
};

export default customer;
