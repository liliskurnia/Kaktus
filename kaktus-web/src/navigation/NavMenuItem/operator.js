import {
  IconLogin2,
  IconLayoutDashboard,
  IconTool,
  IconUserCog,
  IconHomeCog,
  IconTrash,
  IconCalendarEvent,
  IconFileDescription,
  IconMapPins,
  IconHistory
} from '@tabler/icons-react';

const icons = {
  IconMapPins,
  IconLogin2,
  IconLayoutDashboard,
  IconTool,
  IconUserCog,
  IconHomeCog,
  IconTrash,
  IconCalendarEvent,
  IconFileDescription,
  IconHistory
};

const operator = {
  id: 'operator',
  title: 'Operator Menu',
  previllage: 'Operator',
  type: 'group',
  children: [
    {
      id: 'operator-admin',
      title: 'Admin Tools',
      previllage: 'Operator Admin',
      type: 'collapse',
      icon: icons.IconTool,

      children: [
        {
          id: 'operator-overview',
          title: 'Overview',
          type: 'item',
          url: '/operator/admin/overview',
          icon: icons.IconLayoutDashboard,
          breadcrumbs: false
        },
        {
          id: 'manage-operator',
          title: 'Manage Operators',
          type: 'item',
          url: '/operator/admin/manage-operator',
          icon: icons.IconUserCog,
          breadcrumbs: false
        },
        {
          id: 'manage-tps',
          title: 'Manage TPS',
          type: 'item',
          url: '/operator/admin/manage-tps',
          icon: icons.IconHomeCog,
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'operator-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/operator/dashboard',
      icon: icons.IconLayoutDashboard
    },
    {
      id: 'manage-sampah',
      title: 'Manage Tempat Sampah',
      type: 'item',
      url: '/operator/manage-sampah',
      icon: icons.IconTrash
    },
    {
      id: 'manage-schedule',
      title: 'Manage Schedule',
      type: 'item',
      url: '/operator/manage-schedule',
      icon: icons.IconCalendarEvent
    },
    {
      id: 'manage-request',
      title: 'Manage Request',
      type: 'collapse',
      icon: icons.IconFileDescription,
      children: [
        {
          id: 'request-overview',
          title: 'Overview',
          type: 'item',
          url: '/operator/manage-request/overview',
          icon: icons.IconLayoutDashboard,
          breadcrumbs: false
        },
        {
          id: 'request-tracker',
          title: 'Tracking',
          type: 'item',
          url: '/operator/manage-request/tracking',
          icon: icons.IconMapPins,
          breadcrumbs: false
        },
        {
          id: 'request-history',
          title: 'History',
          type: 'item',
          url: '/operator/manage-request/history',
          icon: icons.IconHistory,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default operator;
