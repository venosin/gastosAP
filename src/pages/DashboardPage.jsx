import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Fab,
  Slide,
  Fade,
  Paper,
  Chip,
  Button,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Logout as LogoutIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  Category as CategoryIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Receipt as ReceiptIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  DarkMode,
  LightMode,
  Today as TodayIcon,
  CalendarMonth as CalendarMonthIcon
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth.jsx';
import { useTheme as useCustomTheme } from '../hooks/useTheme.jsx';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Datos de ejemplo (más adelante conectaremos con Firebase)
  const stats = {
    totalGastos: 1250.50,
    gastosHoy: 45.30,
    gastosEsteMes: 890.75,
    categoriaTop: 'Alimentación'
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, active: true },
    { text: 'Gastos', icon: <ReceiptIcon />, active: false },
    { text: 'Estadísticas', icon: <BarChartIcon />, active: false },
    { text: 'Configuración', icon: <SettingsIcon />, active: false },
  ];

  const drawer = (
    <Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <AccountBalanceIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h6" fontWeight="bold">
          FinanzasAP
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            sx={{ 
              mx: 1, 
              borderRadius: 2,
              backgroundColor: item.active ? theme.palette.primary.main + '20' : 'transparent',
              '&:hover': {
                backgroundColor: theme.palette.primary.main + '10'
              }
            }}
          >
            <ListItemButton onClick={() => navigate(item.text.toLowerCase())}>
              <ListItemIcon sx={{ color: item.active ? theme.palette.primary.main : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  '& .MuiListItemText-primary': {
                    fontWeight: item.active ? 600 : 400,
                    color: item.active ? theme.palette.primary.main : 'inherit'
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar para desktop */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: 280,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Sidebar móvil */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* AppBar responsive */}
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            backgroundColor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.primary
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            {isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                <AccountBalanceIcon color="primary" />
                <Typography variant="h6" fontWeight="bold" color="primary">
                  FinanzasAP
                </Typography>
              </Box>
            )}

            {!isMobile && (
              <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                Dashboard
              </Typography>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={toggleTheme} color="inherit">
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
              
              {!isMobile && (
                <Chip 
                  avatar={<Avatar sx={{ width: 24, height: 24 }}>{user?.email?.charAt(0).toUpperCase()}</Avatar>}
                  label={user?.email?.split('@')[0]}
                  variant="outlined"
                  sx={{ ml: 1 }}
                />
              )}
              
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Contenido del dashboard */}
        <Container 
          maxWidth="xl" 
          sx={{ 
            mt: { xs: 2, md: 4 }, 
            mb: { xs: 2, md: 4 },
            px: { xs: 2, md: 3 },
            flexGrow: 1
          }}
        >
          {/* Header móvil */}
          {isMobile && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Hola, {user?.email?.split('@')[0]} 👋
              </Typography>
            </Box>
          )}

          {/* Tarjetas de estadísticas - Responsive */}
          <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
            <Grid item xs={6} sm={6} md={3}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.primary.main}10)`,
                  border: `1px solid ${theme.palette.primary.main}30`
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography 
                        color="text.secondary" 
                        gutterBottom 
                        variant={isMobile ? "body2" : "body1"}
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                      >
                        Total Gastos
                      </Typography>
                      <Typography 
                        variant={isMobile ? "h6" : "h5"} 
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' } }}
                      >
                        ${stats.totalGastos.toFixed(2)}
                      </Typography>
                    </Box>
                    <TrendingUpIcon 
                      color="primary" 
                      sx={{ fontSize: { xs: 24, md: 32 }, opacity: 0.7 }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: `linear-gradient(135deg, ${theme.palette.success.main}20, ${theme.palette.success.main}10)`,
                  border: `1px solid ${theme.palette.success.main}30`
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography 
                        color="text.secondary" 
                        gutterBottom 
                        variant={isMobile ? "body2" : "body1"}
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                      >
                        Gastos Hoy
                      </Typography>
                      <Typography 
                        variant={isMobile ? "h6" : "h5"} 
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' } }}
                      >
                        ${stats.gastosHoy.toFixed(2)}
                      </Typography>
                    </Box>
                    <TodayIcon 
                      color="success" 
                      sx={{ fontSize: { xs: 24, md: 32 }, opacity: 0.7 }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: `linear-gradient(135deg, ${theme.palette.warning.main}20, ${theme.palette.warning.main}10)`,
                  border: `1px solid ${theme.palette.warning.main}30`
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography 
                        color="text.secondary" 
                        gutterBottom 
                        variant={isMobile ? "body2" : "body1"}
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                      >
                        Este Mes
                      </Typography>
                      <Typography 
                        variant={isMobile ? "h6" : "h5"} 
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' } }}
                      >
                        ${stats.gastosEsteMes.toFixed(2)}
                      </Typography>
                    </Box>
                    <CalendarMonthIcon 
                      color="warning" 
                      sx={{ fontSize: { xs: 24, md: 32 }, opacity: 0.7 }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main}20, ${theme.palette.secondary.main}10)`,
                  border: `1px solid ${theme.palette.secondary.main}30`
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography 
                        color="text.secondary" 
                        gutterBottom 
                        variant={isMobile ? "body2" : "body1"}
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                      >
                        Categoría Top
                      </Typography>
                      <Typography 
                        variant={isMobile ? "body1" : "h6"} 
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '0.9rem', md: '1.25rem' } }}
                      >
                        {stats.categoriaTop}
                      </Typography>
                    </Box>
                    <CategoryIcon 
                      color="secondary" 
                      sx={{ fontSize: { xs: 24, md: 32 }, opacity: 0.7 }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Gráficas y contenido - Layout responsive */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Gráfica principal */}
            <Grid item xs={12} lg={8}>
              <Card 
                sx={{ 
                  p: { xs: 2, md: 3 }, 
                  height: { xs: 300, md: 400 },
                  display: 'flex', 
                  flexDirection: 'column'
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Gastos por Mes
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '100%',
                  backgroundColor: theme.palette.action.hover,
                  borderRadius: 2,
                  border: `2px dashed ${theme.palette.divider}`
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <BarChartIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      Gráfica de gastos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      (próximamente)
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>

            {/* Lista de gastos recientes */}
            <Grid item xs={12} lg={4}>
              <Card 
                sx={{ 
                  p: { xs: 2, md: 3 }, 
                  height: { xs: 300, md: 400 },
                  display: 'flex', 
                  flexDirection: 'column'
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Gastos Recientes
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '100%',
                  backgroundColor: theme.palette.action.hover,
                  borderRadius: 2,
                  border: `2px dashed ${theme.palette.divider}`
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <ReceiptIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      Lista de gastos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      (próximamente)
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* FAB para móvil */}
        {isMobile && (
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            }}
          >
            <AddIcon />
          </Fab>
        )}

        {/* Botón agregar para desktop */}
        {!isMobile && (
          <Box sx={{ position: 'fixed', bottom: 24, right: 24 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              size="large"
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1.5,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                boxShadow: theme.shadows[8],
                '&:hover': {
                  boxShadow: theme.shadows[12],
                }
              }}
            >
              Agregar Gasto
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DashboardPage;
