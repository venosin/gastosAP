import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ExpenseList from '../components/ExpenseList.jsx';
import { useExpenses } from '../hooks/useExpenses.jsx';

const ExpensesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const {
    expenses,
    loading,
    error,
    stats,
    createExpense,
    updateExpense,
    deleteExpense,
  } = useExpenses();

  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [formMode, setFormMode] = useState('create');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpenForm = (mode = 'create', expense = null) => {
    setFormMode(mode);
    setSelectedExpense(expense);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedExpense(null);
  };

  const handleSubmitForm = async (expenseData) => {
    try {
      let result;
      
      if (formMode === 'create') {
        result = await createExpense(expenseData);
        if (result.success) {
          showSnackbar('💰 Gasto creado exitosamente');
        }
      } else {
        result = await updateExpense(selectedExpense.id, expenseData);
        if (result.success) {
          showSnackbar('✏️ Gasto actualizado exitosamente');
        }
      }

      if (!result.success) {
        showSnackbar(result.error, 'error');
      }
    } catch (error) {
      showSnackbar('Error inesperado: ' + error.message, 'error');
    }
  };

  const handleEdit = (expense) => {
    handleOpenForm('edit', expense);
  };

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const result = await deleteExpense(selectedExpense.id);
      if (result.success) {
        showSnackbar('🗑️ Gasto eliminado exitosamente');
      } else {
        showSnackbar(result.error, 'error');
      }
    } catch (error) {
      showSnackbar('Error al eliminar: ' + error.message, 'error');
    } finally {
      setDeleteDialogOpen(false);
      setSelectedExpense(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedExpense(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
          💰 Mis Gastos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gestiona y controla todos tus gastos de forma inteligente
        </Typography>
      </Box>

      {/* Estadísticas rápidas */}
      {stats && (
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="error.main" fontWeight={700}>
                  {formatCurrency(stats.total)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total gastado
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="primary.main" fontWeight={700}>
                  {stats.count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gastos registrados
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="warning.main" fontWeight={700}>
                  {formatCurrency(stats.monthlyTotal)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Este mes
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="info.main" fontWeight={700}>
                  {formatCurrency(stats.dailyAverage)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Promedio diario
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Lista de gastos */}
      <ExpenseList
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        loading={loading}
      />

      {/* Botón flotante para agregar */}
      <Fab
        color="primary"
        aria-label="add expense"
        onClick={() => handleOpenForm('create')}
        sx={{
          position: 'fixed',
          bottom: isMobile ? 16 : 32,
          right: isMobile ? 16 : 32,
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>

      {/* Formulario de gastos */}
      <ExpenseForm
        open={formOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        expense={selectedExpense}
        mode={formMode}
      />

      {/* Diálogo de confirmación de eliminación */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <DeleteIcon color="error" />
            <Typography variant="h6">Confirmar eliminación</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que quieres eliminar este gasto?
          </Typography>
          {selectedExpense && (
            <Box mt={2} p={2} bgcolor="grey.100" borderRadius={2}>
              <Typography variant="body2" color="text.secondary">
                <strong>Descripción:</strong> {selectedExpense.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Monto:</strong> {formatCurrency(selectedExpense.amount)}
              </Typography>
            </Box>
          )}
          <Typography variant="body2" color="text.secondary" mt={2}>
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ExpensesPage;
