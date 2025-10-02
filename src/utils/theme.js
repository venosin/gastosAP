import { createTheme } from '@mui/material/styles';

// Paleta de colores moderna - Tema Cyber/Neon
const colors = {
  primary: {
    50: '#f0e6ff',
    100: '#d4bfff',
    200: '#b794ff',
    300: '#9a69ff',
    400: '#8347ff',
    500: '#6c2fff',
    600: '#5a1fff',
    700: '#4810ff',
    800: '#3600ff',
    900: '#2400cc',
  },
  secondary: {
    50: '#e6f9ff',
    100: '#b3ecff',
    200: '#80dfff',
    300: '#4dd2ff',
    400: '#1ac5ff',
    500: '#00b8ff',
    600: '#0099e6',
    700: '#007acc',
    800: '#005cb3',
    900: '#003d99',
  },
  success: {
    50: '#e6fff9',
    100: '#b3ffe6',
    200: '#80ffd4',
    300: '#4dffc1',
    400: '#1affae',
    500: '#00e69c',
    600: '#00cc8a',
    700: '#00b378',
    800: '#009966',
    900: '#008054',
  },
  error: {
    50: '#ffe6f0',
    100: '#ffb3d1',
    200: '#ff80b3',
    300: '#ff4d94',
    400: '#ff1a75',
    500: '#e60057',
    600: '#cc004d',
    700: '#b30042',
    800: '#990038',
    900: '#80002e',
  },
  warning: {
    50: '#fff9e6',
    100: '#ffecb3',
    200: '#ffe080',
    300: '#ffd34d',
    400: '#ffc61a',
    500: '#ffb900',
    600: '#e6a700',
    700: '#cc9400',
    800: '#b38200',
    900: '#996f00',
  },
  info: {
    50: '#e6f7ff',
    100: '#b3e6ff',
    200: '#80d5ff',
    300: '#4dc4ff',
    400: '#1ab3ff',
    500: '#00a2ff',
    600: '#0091e6',
    700: '#0080cc',
    800: '#006fb3',
    900: '#005e99',
  },
  gradient: {
    primary: 'linear-gradient(135deg, #6c2fff 0%, #00b8ff 100%)',
    secondary: 'linear-gradient(135deg, #00b8ff 0%, #00e69c 100%)',
    accent: 'linear-gradient(135deg, #ff1a75 0%, #ffc61a 100%)',
    dark: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
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

// Tema oscuro moderno con efectos cyber
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary[500],
      light: colors.primary[300],
      dark: colors.primary[700],
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.secondary[500],
      light: colors.secondary[300],
      dark: colors.secondary[700],
      contrastText: '#ffffff',
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
      default: '#0a0e27',
      paper: '#12172e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b8db',
    },
    divider: 'rgba(108, 47, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01071em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(108, 47, 255, 0.1)',
    '0px 4px 8px rgba(108, 47, 255, 0.12)',
    '0px 8px 16px rgba(108, 47, 255, 0.14)',
    '0px 12px 24px rgba(108, 47, 255, 0.16)',
    '0px 16px 32px rgba(108, 47, 255, 0.18)',
    '0px 20px 40px rgba(108, 47, 255, 0.20)',
    '0px 24px 48px rgba(108, 47, 255, 0.22)',
    '0px 0px 40px rgba(108, 47, 255, 0.3)',
    '0px 0px 60px rgba(108, 47, 255, 0.35)',
    '0px 0px 80px rgba(108, 47, 255, 0.4)',
    ...Array(14).fill('none'),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#6c2fff #12172e',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#12172e',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(180deg, #6c2fff 0%, #00b8ff 100%)',
            borderRadius: '4px',
            '&:hover': {
              background: 'linear-gradient(180deg, #8347ff 0%, #1ac5ff 100%)',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '10px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          background: colors.gradient.primary,
          boxShadow: '0 4px 16px rgba(108, 47, 255, 0.3)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(108, 47, 255, 0.5)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: colors.primary[500],
          '&:hover': {
            borderWidth: '2px',
            background: 'rgba(108, 47, 255, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(18, 23, 46, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(108, 47, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          borderRadius: 20,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: 'rgba(108, 47, 255, 0.3)',
            boxShadow: '0 12px 48px rgba(108, 47, 255, 0.2)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(18, 23, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: 'rgba(108, 47, 255, 0.3)',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(108, 47, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary[500],
              boxShadow: '0 0 0 3px rgba(108, 47, 255, 0.1)',
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(10, 14, 39, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(108, 47, 255, 0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 14, 39, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(108, 47, 255, 0.2)',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: colors.gradient.primary,
          boxShadow: '0 8px 24px rgba(108, 47, 255, 0.4)',
          '&:hover': {
            boxShadow: '0 12px 32px rgba(108, 47, 255, 0.6)',
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 600,
        },
        outlined: {
          borderWidth: '2px',
        },
      },
    },
  },
});

// Exportar colores para uso directo
export { colors };
