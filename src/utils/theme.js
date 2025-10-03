import { createTheme } from '@mui/material/styles';

// Paleta de colores moderna - Tema Oscuro Profesional
const colors = {
  primary: {
    50: '#ffe6e6',
    100: '#ffb3b3',
    200: '#ff8080',
    300: '#ff4d4d',
    400: '#ff2626',
    500: '#FF4D4D', // Rojo principal
    600: '#e63939',
    700: '#cc2626',
    800: '#b31919',
    900: '#990000',
  },
  secondary: {
    50: '#e6ffff',
    100: '#b3f5f5',
    200: '#80ebeb',
    300: '#4de0e0',
    400: '#1ad6d6',
    500: '#00CED1', // Cyan
    600: '#00b8bb',
    700: '#00a3a6',
    800: '#008e91',
    900: '#007a7c',
  },
  success: {
    50: '#e6fff9',
    100: '#b3ffe6',
    200: '#80ffd4',
    300: '#4dffc1',
    400: '#1affae',
    500: '#00FFB2', // Accent del portafolio
    600: '#00e69c',
    700: '#00cc8a',
    800: '#00b378',
    900: '#009966',
  },
  error: {
    50: '#ffe6e6',
    100: '#ffb3b3',
    200: '#ff8080',
    300: '#ff4d4d',
    400: '#ff1a1a',
    500: '#FF0000',
    600: '#e60000',
    700: '#cc0000',
    800: '#b30000',
    900: '#990000',
  },
  warning: {
    50: '#fffae6',
    100: '#fff0b3',
    200: '#ffe680',
    300: '#ffdd4d',
    400: '#ffd31a',
    500: '#FFC107',
    600: '#e6ad00',
    700: '#cc9900',
    800: '#b38600',
    900: '#997200',
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
    primary: 'linear-gradient(135deg, #FF4D4D 0%, #00CED1 100%)',
    secondary: 'linear-gradient(135deg, #00CED1 0%, #00FFB2 100%)',
    accent: 'linear-gradient(135deg, #FF4D4D 0%, #FFC107 100%)',
    dark: 'linear-gradient(135deg, #0A0A0A 0%, #121212 100%)',
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
      default: '#0A0A0A',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
    },
    divider: 'rgba(255, 77, 77, 0.12)',
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
    '0px 2px 4px rgba(255, 77, 77, 0.1)',
    '0px 4px 8px rgba(255, 77, 77, 0.12)',
    '0px 8px 16px rgba(255, 77, 77, 0.14)',
    '0px 12px 24px rgba(255, 77, 77, 0.16)',
    '0px 16px 32px rgba(255, 77, 77, 0.18)',
    '0px 20px 40px rgba(255, 77, 77, 0.20)',
    '0px 24px 48px rgba(255, 77, 77, 0.22)',
    '0px 0px 40px rgba(255, 77, 77, 0.3)',
    '0px 0px 60px rgba(255, 77, 77, 0.35)',
    '0px 0px 80px rgba(255, 77, 77, 0.4)',
    ...Array(14).fill('none'),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#FF4D4D #121212',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#121212',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(180deg, #FF4D4D 0%, #00CED1 100%)',
            borderRadius: '4px',
            '&:hover': {
              background: 'linear-gradient(180deg, #ff2626 0%, #00FFB2 100%)',
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
          boxShadow: '0 4px 16px rgba(255, 77, 77, 0.3)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(255, 77, 77, 0.5)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: colors.primary[500],
          '&:hover': {
            borderWidth: '2px',
            background: 'rgba(255, 77, 77, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(18, 18, 18, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 77, 77, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          borderRadius: 20,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: 'rgba(255, 77, 77, 0.3)',
            boxShadow: '0 12px 48px rgba(255, 77, 77, 0.2)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(18, 18, 18, 0.9)',
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
              borderColor: 'rgba(255, 77, 77, 0.3)',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 77, 77, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary[500],
              boxShadow: '0 0 0 3px rgba(255, 77, 77, 0.1)',
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 77, 77, 0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 77, 77, 0.2)',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: colors.gradient.primary,
          boxShadow: '0 8px 24px rgba(255, 77, 77, 0.4)',
          '&:hover': {
            boxShadow: '0 12px 32px rgba(255, 77, 77, 0.6)',
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
