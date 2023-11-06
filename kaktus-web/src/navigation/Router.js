import { useRoutes } from 'react-router-dom';

import Mainlinks from './Mainlinks';
import Authlinks from './Authlinks.js';

export default function ThemeRoutes() {
  return useRoutes([Mainlinks, Authlinks]);
}
