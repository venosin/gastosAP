import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  LayoutDashboard,
  Receipt,
  BarChart3,
  Settings,
  Search,
  Bell,
  LogOut,
  User,
  CreditCard,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground.jsx';

const DRAWER_WIDTH = 280;

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = async () => {
    handleUserMenuClose();
    await logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { text: 'Gastos', icon: <Receipt size={20} />, path: '/expenses' },
    { text: 'Estadísticas', icon: <BarChart3 size={20} />, path: '/statistics' },
    { text: 'Configuración', icon: <Settings size={20} />, path: '/settings' },
  ];

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.text : '';
  };

  const getPageIcon = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.icon : null;
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Wallet size={24} color="white" />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ lineHeight: 1.2 }}>
            FinanzasAP
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Control Total
          </Typography>
        </Box>
      </Box>
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              key={item.text}
              sx={{
                mx: 1,
                borderRadius: 2,
                backgroundColor: isActive ? theme.palette.primary.main + '20' : 'transparent',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main + '10'
                }
              }}
            >
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
              >
                <ListItemIcon sx={{ color: isActive ? theme.palette.primary.main : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? theme.palette.primary.main : 'inherit'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%', position: 'relative' }}>
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Sidebar para desktop */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
      >
        {drawer}
      </Drawer>

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%', overflow: 'hidden' }}>
        {/* AppBar responsive */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.primary,
            width: '100%',
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              px: { xs: 2, sm: 3, md: 4 },
              minHeight: 70,
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Left Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Mobile Menu */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 1 }}
                >
                  <MenuIcon size={24} />
                </IconButton>
              )}

              {/* Page Title con Icon */}
              {!isMobile && (
                <>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.primary.main}10)`,
                      border: `1px solid ${theme.palette.primary.main}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {getPageIcon()}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                      {getPageTitle()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {location.pathname === '/dashboard' && 'Vista general de tus finanzas'}
                      {location.pathname === '/expenses' && 'Administra tus gastos'}
                      {location.pathname === '/statistics' && 'Analiza tus datos'}
                      {location.pathname === '/settings' && 'Configuración de la app'}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>

            {/* Center Section - Search */}
            {!isMobile && (
              <Box sx={{ flex: 1, maxWidth: 600, px: 4 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Buscar gastos, categorías..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={18} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: theme.palette.background.default,
                      borderRadius: 2,
                    }
                  }}
                />
              </Box>
            )}

            {/* Right Section - Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Quick Stats - Desktop */}
              {!isMobile && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <TrendingUp size={18} color={theme.palette.success.main} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', display: 'block' }}>
                      Mes actual
                    </Typography>
                    <Typography variant="body2" fontWeight="600" sx={{ lineHeight: 1 }}>
                      $0.00
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Quick Action - Agregar Gasto */}
              {!isMobile && (
                <Tooltip title="Agregar Gasto">
                  <IconButton
                    sx={{
                      backgroundColor: theme.palette.primary.main + '15',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main + '25',
                      }
                    }}
                  >
                    <CreditCard size={20} />
                  </IconButton>
                </Tooltip>
              )}

              {/* Notifications */}
              <Tooltip title="Notificaciones">
                <IconButton>
                  <Badge badgeContent={0} color="error">
                    <Bell size={20} />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* User Menu */}
              <Tooltip title="Mi cuenta">
                <IconButton onClick={handleUserMenuOpen}>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    }}
                  >
                    {user?.email?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>

        {/* User Menu */}
        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 220,
              borderRadius: 2,
            }
          }}
        >
          <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="subtitle2" fontWeight="600">
              {user?.email?.split('@')[0]}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          <MenuItem onClick={() => { handleUserMenuClose(); navigate('/settings'); }}>
            <ListItemIcon>
              <User size={18} />
            </ListItemIcon>
            <ListItemText>Mi Perfil</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { handleUserMenuClose(); navigate('/settings'); }}>
            <ListItemIcon>
              <Settings size={18} />
            </ListItemIcon>
            <ListItemText>Configuración</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogOut size={18} />
            </ListItemIcon>
            <ListItemText>Cerrar Sesión</ListItemText>
          </MenuItem>
        </Menu>

        {/* Contenido de la página */}
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
