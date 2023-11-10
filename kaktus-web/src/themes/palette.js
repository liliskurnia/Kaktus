export default function themePalette(theme) {
  return {
    mode: theme?.customization?.navType,
    common: {
      black: theme.colors?.darkPaper
    },
    primary: {
      light: theme.colors?.primaryLight,
      main: theme.colors?.primaryMain,
      dark: theme.colors?.primaryDark,
      100: theme.colors?.primary100,
      200: theme.colors?.primary200,
      400: theme.colors?.primary400,
      500: theme.colors?.primary500,
      600: theme.colors?.primary600,
      800: theme.colors?.primary800,
      900: theme.colors?.primary900,
      accent: {
        100: theme.colors?.primaryA100,
        200: theme.colors?.primaryA200,
        400: theme.colors?.primaryA400,
        700: theme.colors?.primaryA700
      }
    },
    secondary: {
      light: theme.colors?.secondaryLight,
      main: theme.colors?.secondaryMain,
      dark: theme.colors?.secondaryDark,
      200: theme.colors?.secondary200,
      400: theme.colors?.secondary400,
      500: theme.colors?.secondary500,
      700: theme.colors?.secondary600,
      800: theme.colors?.secondary800,
      accent: {
        100: theme.colors?.secondaryA100,
        200: theme.colors?.secondaaryA200,
        400: theme.colors?.secondaryA400,
        700: theme.colors?.secondaryA700
      },
      variant: {
        light: theme.colors?.secondaryVLight,
        main: theme.colors?.secondaryVmMain,
        dark: theme.colors?.secondaryVDark,
        100: theme.colors?.secondaryV100,
        200: theme.colors?.secondaryV200,
        400: theme.colors?.secondaryV400,
        500: theme.colors?.secondaryV500,
        600: theme.colors?.secondaryV600,
        700: theme.colors?.secondaryV700,
        900: theme.colors?.secondaryV900,
        accent: {
          100: theme.colors?.secondaryVA100,
          200: theme.colors?.secondaryVA200,
          400: theme.colors?.secondaryVA400,
          700: theme.colors?.secondaryVA700
        }
      }
    },
    tertiary: {
      light: theme.colors?.tertiaryLight,
      main: theme.colors?.tertiaryMain,
      dark: theme.colors?.tertiaryDark,
      100: theme.colors?.tertiary100,
      300: theme.colors?.tertiary300,
      400: theme.colors?.tertiary400,
      500: theme.colors?.tertiary500,
      700: theme.colors?.tertiary700,
      800: theme.colors?.tertiary800,
      accent: {
        100: theme.colors?.tertiaryA100,
        200: theme.colors?.tertiaryA200,
        400: theme.colors?.tertiaryA400,
        700: theme.colors?.tertiaryA700
      },
      variant: {
        light: theme.colors?.tertiaryVLight,
        main: theme.colors?.tertiaryVMain,
        dark: theme.colors?.tertiaryVDark,
        50: theme.colors?.tertiaryV50,
        200: theme.colors?.tertiaryV200,
        300: theme.colors?.tertiaryV300,
        400: theme.colors?.tertiaryV400,
        600: theme.colors?.tertiaryV600,
        700: theme.colors?.tertiaryV700,
        800: theme.colors?.tertiaryV800
      }
    },
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain,
      dark: theme.colors?.errorDark,
      100: theme.colors?.error100,
      300: theme.colors?.error300,
      400: theme.colors?.error400,
      500: theme.colors?.error500,
      700: theme.colors?.error700,
      800: theme.colors?.error800
    },
    orange: {
      light: theme.colors?.cautionLight,
      main: theme.colors?.cautionMain,
      dark: theme.colors?.cautionDark,
      100: theme.colors?.caution100,
      300: theme.colors?.caution300,
      400: theme.colors?.caution400,
      500: theme.colors?.caution500,
      700: theme.colors?.caution700,
      800: theme.colors?.caution800
    },
    warning: {
      light: theme.colors?.warningLight,
      main: theme.colors?.warningMain,
      dark: theme.colors?.warningDark,
      200: theme.colors?.warning200,
      400: theme.colors?.warning400,
      500: theme.colors?.warning500,
      700: theme.colors?.warning700,
      800: theme.colors?.warning800,
      900: theme.colors?.warning900
    },
    success: {
      light: theme.colors?.successLight,
      main: theme.colors?.successMain,
      dark: theme.colors?.successDark,
      50: theme.colors?.success50,
      100: theme.colors?.success100,
      300: theme.colors?.success300,
      500: theme.colors?.success500,
      600: theme.colors?.success600,
      700: theme.colors?.success700,
      800: theme.colors?.success800
    },
    grey: {
      50: theme.colors?.grey50,
      100: theme.colors?.grey100,
      200: theme.colors?.grey200,
      300: theme.colors?.grey300,
      500: theme.colors?.grey500,
      600: theme.colors?.grey600,
      700: theme.colors?.grey700,
      900: theme.colors?.grey900
    },
    neutral: {
      light: theme.colors?.neutralW300,
      main: theme.colors?.neutralW700,
      dark: theme.colors?.neutralW900,
      50: theme.colors?.neutralW50,
      100: theme.colors?.neutralW100,
      200: theme.colors?.neutralW200,
      400: theme.colors?.neutralW400,
      500: theme.colors?.neutralW500,
      600: theme.colors?.neutral600,
      800: theme.colors?.neutral800
    },
    neutral_variant: {
      light: theme.colors?.neutralA200,
      main: theme.colors?.neutralA400,
      dark: theme.colors?.neutralA800,
      50: theme.colors?.neutralA50,
      100: theme.colors?.neutralA100,
      300: theme.colors?.neutralA300,
      500: theme.colors?.neutralA500,
      600: theme.colors?.neutralA600,
      700: theme.colors?.neutralA700,
      900: theme.colors?.neutralA900
    },
    neutral_retro: {
      light: theme.colors?.neutralR300,
      main: theme.colors?.neutralR500,
      dark: theme.colors?.neutralR800,
      50: theme.colors?.neutralR50,
      100: theme.colors?.neutralR100,
      200: theme.colors?.neutralR200,
      400: theme.colors?.neutralR400,
      600: theme.colors?.neutralR600,
      700: theme.colors?.neutralR700,
      900: theme.colors?.neutralR900
    },
    dark: {
      light: theme.colors?.darkTextPrimary,
      main: theme.colors?.darkLevel1,
      dark: theme.colors?.darkLevel2,
      800: theme.colors?.darkBackground,
      900: theme.colors?.darkPaper
    },
    text: {
      primary: theme.darkTextPrimary,
      secondary: theme.darkTextSecondary,
      dark: theme.textDark,
      hint: theme.colors?.grey100
    },
    background: {
      paper: theme.paper,
      default: theme.backgroundDefault
    }
  };
}
