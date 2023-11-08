import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { AuthProvider } from 'hooks/useAuth';

import Routes from 'navigation/Router';
import NavigationScroll from 'layout/NavigationScroll';

import themes from 'themes';

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <AuthProvider>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
