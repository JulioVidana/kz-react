import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#373c4a',
      light: '#C1C1C4'
    },
    secondary: {
      main: colors.indigo[500]
    },
    errors: {
      main: "#f50057"
    },
    warning: {
      main: "#f50057"
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
      errors: colors.white
    }
  },
  shadows,
  typography
});

export default theme;
