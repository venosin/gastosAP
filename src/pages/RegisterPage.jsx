import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Divider,
  IconButton,
  Fade,
  Slide,
  useTheme,
  LinearProgress
} from '@mui/material';
import {
  Google as GoogleIcon,
  AccountBalance as AccountBalanceIcon,
  Visibility,
  VisibilityOff,
  CheckCircle,
  Cancel,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth.jsx';
import { motion } from 'framer-motion';
import ParticlesBackground from '../components/ParticlesBackground.jsx';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, loginWithGoogle } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  // Validaciones de contraseña
  const passwordValidations = {
    length: password.length >= 6,
    match: password === confirmPassword && password.length > 0,
  };

  const getPasswordStrength = () => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.match(/[a-z]/)) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    const result = await register(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    const result = await loginWithGoogle();
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #0A0A0A 0%, #121212 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255, 77, 77, 0.15) 0%, transparent 50%)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 80% 80%, rgba(0, 206, 209, 0.15) 0%, transparent 50%)',
        },
      }}
    >
      <ParticlesBackground />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 500,
          px: 2,
        }}
      >
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper
            elevation={24}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              padding: 4,
              background: 'rgba(18, 18, 18, 0.8)',
              backdropFilter: 'blur(20px)',
              border: `1px solid rgba(255, 77, 77, 0.2)`,
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(255, 77, 77, 0.2)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AccountBalanceIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h4" component="h1" fontWeight="bold">
                  FinanzasAP
                </Typography>
              </Box>
            </Box>

            <Typography variant="h5" align="center" gutterBottom color="text.secondary">
              Crea tu cuenta
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4 }} color="text.secondary">
              Únete y toma control de tus finanzas personales
            </Typography>
            
            {error && (
              <Fade in={!!error}>
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              </Fade>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                sx={{ mb: 1 }}
              />

              {password && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Seguridad de la contraseña:
                    </Typography>
                    <Typography variant="body2" color={getPasswordStrength() >= 75 ? 'success.main' : getPasswordStrength() >= 50 ? 'warning.main' : 'error.main'}>
                      {getPasswordStrength() >= 75 ? 'Fuerte' : getPasswordStrength() >= 50 ? 'Media' : 'Débil'}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={getPasswordStrength()} 
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      backgroundColor: theme.palette.grey[300],
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getPasswordStrength() >= 75 ? theme.palette.success.main : getPasswordStrength() >= 50 ? theme.palette.warning.main : theme.palette.error.main,
                      }
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    {passwordValidations.length ? <CheckCircle color="success" sx={{ fontSize: 16 }} /> : <Cancel color="error" sx={{ fontSize: 16 }} />}
                    <Typography variant="body2" color={passwordValidations.length ? 'success.main' : 'error.main'}>
                      Mínimo 6 caracteres
                    </Typography>
                  </Box>
                </Box>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar Contraseña"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                sx={{ mb: 1 }}
              />

              {confirmPassword && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  {passwordValidations.match ? <CheckCircle color="success" sx={{ fontSize: 16 }} /> : <Cancel color="error" sx={{ fontSize: 16 }} />}
                  <Typography variant="body2" color={passwordValidations.match ? 'success.main' : 'error.main'}>
                    Las contraseñas coinciden
                  </Typography>
                </Box>
              )}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                startIcon={<PersonAddIcon />}
                disabled={loading || !passwordValidations.length || !passwordValidations.match}
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                sx={{
                  mb: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #FF4D4D 0%, #00CED1 100%)',
                  boxShadow: '0 4px 16px rgba(255, 77, 77, 0.3)',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(255, 77, 77, 0.5)',
                  },
                }}
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  O continúa con
                </Typography>
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                disabled={loading}
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                sx={{
                  mb: 3,
                  py: 1.5,
                  borderWidth: 2,
                  borderColor: '#FF4D4D',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: '#FF4D4D',
                    background: 'rgba(255, 77, 77, 0.1)',
                  }
                }}
              >
                Google
              </Button>

              <Box textAlign="center">
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Typography variant="body1" color="primary" sx={{ fontWeight: 500 }}>
                    ¿Ya tienes cuenta? <strong>Inicia sesión aquí</strong>
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Paper>
        </Slide>
      </Box>
    </Box>
  );
};

export default RegisterPage;
