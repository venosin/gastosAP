import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from '@mui/material';
import {
  Savings as SavingsIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth.jsx';
import { useExpenses } from '../hooks/useExpenses.jsx';
import { db } from '../../services/firebase.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const SettingsPage = () => {
  const { user } = useAuth();
  const { stats } = useExpenses();

  const [budget, setBudget] = useState(0);
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);
  const [tempBudget, setTempBudget] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);

  // Cargar presupuesto del usuario
  useEffect(() => {
    const loadBudget = async () => {
      if (!user) return;
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setBudget(data.monthlyBudget || 0);
        }
      } catch (error) {
        console.error('Error loading budget:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBudget();
  }, [user]);

  const handleSaveBudget = async () => {
    try {
      if (!user) return;
      await setDoc(
        doc(db, 'users', user.uid),
        { monthlyBudget: parseFloat(tempBudget) },
        { merge: true }
      );
      setBudget(parseFloat(tempBudget));
      setBudgetDialogOpen(false);
      setSnackbar({ open: true, message: 'Presupuesto actualizado exitosamente', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error al guardar presupuesto', severity: 'error' });
    }
  };

  const handleOpenBudgetDialog = () => {
    setTempBudget(budget);
    setBudgetDialogOpen(true);
  };

  const budgetPercentage = budget > 0 ? ((stats?.monthlyTotal || 0) / budget) * 100 : 0;
  const budgetRemaining = budget - (stats?.monthlyTotal || 0);

  const getBudgetColor = () => {
    if (budgetPercentage >= 100) return 'error';
    if (budgetPercentage >= 80) return 'warning';
    return 'success';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
          Configuración
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Personaliza tu experiencia y gestiona tu presupuesto
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Presupuesto Mensual */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SavingsIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h6" fontWeight="600">
                  Presupuesto Mensual
                </Typography>
              </Box>

              {loading ? (
                <LinearProgress />
              ) : (
                <>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Presupuesto
                      </Typography>
                      <Typography variant="h6" fontWeight="700" color="primary.main">
                        ${budget.toFixed(2)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Gastado este mes
                      </Typography>
                      <Typography variant="h6" fontWeight="700" color="error.main">
                        ${(stats?.monthlyTotal || 0).toFixed(2)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Disponible
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="700"
                        color={budgetRemaining >= 0 ? 'success.main' : 'error.main'}
                      >
                        ${budgetRemaining.toFixed(2)}
                      </Typography>
                    </Box>

                    {budget > 0 && (
                      <>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(budgetPercentage, 100)}
                          color={getBudgetColor()}
                          sx={{ height: 10, borderRadius: 5, mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary" textAlign="center">
                          {budgetPercentage.toFixed(1)}% del presupuesto utilizado
                        </Typography>
                      </>
                    )}
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={budget > 0 ? <EditIcon /> : <AddIcon />}
                    onClick={handleOpenBudgetDialog}
                  >
                    {budget > 0 ? 'Modificar Presupuesto' : 'Establecer Presupuesto'}
                  </Button>

                  {budget > 0 && budgetPercentage >= 80 && (
                    <Alert severity={budgetPercentage >= 100 ? 'error' : 'warning'} sx={{ mt: 2 }}>
                      {budgetPercentage >= 100
                        ? 'Has excedido tu presupuesto mensual'
                        : 'Estás cerca de alcanzar tu presupuesto mensual'}
                    </Alert>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Apariencia */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaletteIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h6" fontWeight="600">
                  Apariencia
                </Typography>
              </Box>

              <Alert severity="info" sx={{ mt: 2 }}>
                La aplicación está configurada con tema oscuro permanente para una mejor experiencia visual.
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* Perfil de Usuario */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h6" fontWeight="600">
                  Perfil de Usuario
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={user?.email || ''}
                    disabled
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Usuario desde"
                    value={user?.metadata?.creationTime
                      ? new Date(user.metadata.creationTime).toLocaleDateString()
                      : 'N/A'}
                    disabled
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Tu información personal está protegida y segura con Firebase Authentication.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Notificaciones (Próximamente) */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h6" fontWeight="600">
                  Notificaciones
                </Typography>
              </Box>

              <Alert severity="info">
                La funcionalidad de notificaciones estará disponible próximamente
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog para editar presupuesto */}
      <Dialog
        open={budgetDialogOpen}
        onClose={() => setBudgetDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SavingsIcon color="primary" />
            <Typography variant="h6">
              {budget > 0 ? 'Modificar' : 'Establecer'} Presupuesto Mensual
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Presupuesto Mensual"
            type="number"
            value={tempBudget}
            onChange={(e) => setTempBudget(e.target.value)}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
            }}
            sx={{ mt: 2 }}
            autoFocus
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Define un presupuesto mensual para ayudarte a controlar tus gastos.
            Recibirás alertas cuando te acerques al límite.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBudgetDialogOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSaveBudget}
            variant="contained"
            disabled={!tempBudget || tempBudget <= 0}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SettingsPage;
