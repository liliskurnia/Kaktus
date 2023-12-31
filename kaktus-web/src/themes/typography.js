export default function themeTypography(theme) {
  return {
    fontFamily: theme?.customization?.fontFamily,

    h6: {
      fontWeight: 600,
      color: theme.heading,
      fontSize: '0.875rem'
    },
    h5: {
      fontSize: '1rem',
      color: theme.heading,
      fontWeight: 600
    },
    h4: {
      fontSize: '1.25rem',
      color: theme.heading,
      fontWeight: 600
    },
    h3: {
      fontSize: '1.5rem',
      color: theme.heading,
      fontWeight: 600
    },
    h2: {
      fontSize: '2.125rem',
      color: theme.heading,
      fontWeight: 700,
      letterSpacing: '-2%'
    },
    h1: {
      fontSize: '3rem',
      color: theme.heading,
      fontWeight: 700,
      letterSpacing: '-2%'
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: theme.subtitleTextDark
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 500,
      letterSpacing: '2%',
      color: theme.subtitleTextLight
    },
    caption: {
      fontSize: '0.75rem',
      color: theme.captionText,
      letterSpacing: '2%',
      lineHeight: '140%',
      fontWeight: 400
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '140%'
    },
    body2: {
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '140%',
      color: theme.darkTextPrimary
    },
    button: {
      textTransform: 'capitalize',
      fontWeight: 600
    },
    overline: {
      fontSize: '0.625rem',
      fontWeight: 600,
      lineHeight: '140%',
      letterSpacing: '10%',
      textTransform: 'uppercase'
    },
    customInput: {
      marginTop: 1,
      marginBottom: 1,
      '& > label': {
        top: 23,
        left: 0,
        color: theme.grey500,
        '&[data-shrink="false"]': {
          top: 5
        }
      },
      '& > div > input': {
        padding: '30.5px 14px 11.5px !important'
      },
      '& > div > div[role=combobox]': {
        padding: '30.5px 14px 11.5px !important'
      },
      '& > div > textarea': {
        padding: '30.5px 14px 11.5px !important'
      },
      '& legend': {
        display: 'none'
      },
      '& fieldset': {
        top: 0
      }
    },
    mainContent: {
      backgroundColor: theme.background,
      width: '100%',
      minHeight: 'calc(100vh - 88px)',
      flexGrow: 1,
      padding: '20px',
      marginTop: '88px',
      marginRight: '20px',
      borderRadius: `${theme?.customization?.borderRadius}px`
    },
    menuCaption: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.heading,
      padding: '6px',
      textTransform: 'capitalize',
      marginTop: '10px'
    },
    subMenuCaption: {
      fontSize: '0.6875rem',
      fontWeight: 500,
      color: theme.darkTextSecondary,
      textTransform: 'capitalize'
    },
    commonAvatar: {
      cursor: 'pointer',
      borderRadius: '8px'
    },
    smallAvatar: {
      width: '22px',
      height: '22px',
      fontSize: '1rem'
    },
    mediumAvatar: {
      width: '34px',
      height: '34px',
      fontSize: '1.2rem'
    },
    largeAvatar: {
      width: '44px',
      height: '44px',
      fontSize: '1.5rem'
    }
  };
}
