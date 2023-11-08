import { useRoutes } from 'react-router-dom';

import Mainlinks from './Mainlinks';
import Authlinks from './Authlinks';
import NFlinks from './NFlinks';

export default function ThemeRoutes() {
  return useRoutes([Mainlinks, Authlinks, NFlinks]);
}
