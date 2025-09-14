import { createTheme } from '@mui/material/styles';

// Paleta de colores oscura y moderna
const colors = {
  primary: {
    50: '#ecf0f1',
    100: '#d5dbdb',
    200: '#bdc3c7',
    300: '#a4acb3',
    400: '#85929e',
    500: '#2c3e50',
    600: '#34495e',
    700: '#2c3e50',
    800: '#1a252f',
    900: '#17202a',
  },
  secondary: {
    50: '#fdedec',
    100: '#fadbd8',
    200: '#f5b7b1',
    300: '#f1948a',
    400: '#ec7063',
    500: '#e74c3c',
    600: '#cb4335',
    700: '#b03a2e',
    800: '#943126',
    900: '#78281f',
  },
  success: {
    50: '#eafaf1',
    100: '#d5f4e6',
    200: '#abebc6',
    300: '#82e0aa',
    400: '#58d68d',
    500: '#27ae60',
    600: '#229954',
    700: '#1e8449',
    800: '#196f3d',
    900: '#145a32',
  },
  error: {
    50: '#fdedec',
    100: '#fadbd8',
    200: '#f5b7b1',
    300: '#f1948a',
    400: '#ec7063',
    500: '#e74c3c',
    600: '#cb4335',
    700: '#b03a2e',
    800: '#943126',
    900: '#78281f',
  },
  warning: {
    50: '#fef9e7',
    100: '#fcf3cf',
    200: '#f9e79f',
    300: '#f7dc6f',
    400: '#f4d03f',
    500: '#f39c12',
    600: '#d68910',
    700: '#b9770e',
    800: '#9c640c',
    900: '#7e5109',
  },
  info: {
    50: '#ebf5fb',
    100: '#d6eaf8',
    200: '#aed6f1',
    300: '#85c1e9',
    400: '#5dade2',
    500: '#3498db',
    600: '#2e86c1',
    700: '#2874a6',
    800: '#21618c',
    900: '#1b4f72',
  },
};

// Tema claro con colores oscuros
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary[600],
      light: colors.primary[400],
      dark: colors.primary[800],
    },
    secondary: {
      main: colors.secondary[500],
      light: colors.secondary[300],
      dark: colors.secondary[700],
    },
    success: {
      main: colors.success[500],
      light: colors.success[300],
      dark: colors.success[700],
    },
    error: {
      main: colors.error[500],
      light: colors.error[300],
      dark: colors.error[700],
    },
    warning: {
      main: colors.warning[500],
      light: colors.warning[300],
      dark: colors.warning[700],
    },
    info: {
      main: colors.info[500],
      light: colors.info[300],
      dark: colors.info[700],
    },
    background: {
      default: '#ecf0f1',
      paper: '#ffffff',
    },
    text: {
      primary: colors.primary[800],
      secondary: colors.primary[600],
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          borderRadius: 16,
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

// Tema oscuro
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary[400],
      light: colors.primary[300],
      dark: colors.primary[600],
    },
    secondary: {
      main: colors.secondary[400],
      light: colors.secondary[300],
      dark: colors.secondary[600],
    },
    success: {
      main: colors.success[400],
      light: colors.success[300],
      dark: colors.success[600],
    },
    error: {
      main: colors.error[400],
      light: colors.error[300],
      dark: colors.error[600],
    },
    warning: {
      main: colors.warning[400],
      light: colors.warning[300],
      dark: colors.warning[600],
    },
    info: {
      main: colors.info[400],
      light: colors.info[300],
      dark: colors.info[600],
    },
    background: {
      default: '#17202a',
      paper: '#1a252f',
    },
    text: {
      primary: colors.primary[50],
      secondary: colors.primary[200],
    },
  },
  typography: lightTheme.typography,
  shape: lightTheme.shape,
  components: {
    ...lightTheme.components,
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
          borderRadius: 16,
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          },
        },
      },
    },
  },
});
