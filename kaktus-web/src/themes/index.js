import { createTheme } from '@mui/material/styles';

import colors from 'assets/styles/themes.scss';

import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

export const theme = (customization) => {
  const color = colors;

  const themeOption = {
    colors: color,
    heading: color.tertiaryMain,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.neutralW100,
    darkTextPrimary: color.neutralW700,
    darkTextSecondary: color.neutralA400,
    textDark: color.neutralW900,
    subtitleTextDark: color.neutralW700,
    subtitleTextLight: color.neutralA400,
    captionText: color.neutralW800,
    overlineText: color.neutralA300,
    menuSelected: color.tertiaryDark,
    menuSelectedBack: color.secondaryVLight,
    divider: color.neutralA100,
    customization
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    typography: themeTypography(themeOption)
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
