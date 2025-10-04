import React, { useState, useMemo } from 'react';
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
  TextField,
  MenuItem,
  InputAdornment,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Download as DownloadIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ExpenseList from '../components/ExpenseList.jsx';
import { useExpenses } from '../hooks/useExpenses.jsx';
import { motion } from 'framer-motion';

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

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

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
          showSnackbar('Gasto creado exitosamente');
        }
      } else {
        result = await updateExpense(selectedExpense.id, expenseData);
        if (result.success) {
          showSnackbar('Gasto actualizado exitosamente');
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
        showSnackbar('Gasto eliminado exitosamente');
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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const cats = [...new Set(expenses.map(exp => exp.category))];
    return cats.sort();
  }, [expenses]);

  // Filtrar y ordenar gastos
  const filteredExpenses = useMemo(() => {
    let filtered = expenses.filter(exp => {
      const matchesSearch = exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exp.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || exp.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return b.date.toDate() - a.date.toDate();
        case 'date-asc':
          return a.date.toDate() - b.date.toDate();
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [expenses, searchTerm, categoryFilter, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setSortBy('date-desc');
  };

  const hasActiveFilters = searchTerm !== '' || categoryFilter !== 'all' || sortBy !== 'date-desc';

  // Exportar a CSV
  const handleExportCSV = () => {
    const csvContent = [
      ['Fecha', 'Descripción', 'Categoría', 'Monto'].join(','),
      ...filteredExpenses.map(exp =>
        [
          exp.date.toDate().toLocaleDateString(),
          `"${exp.description}"`,
          exp.category,
          exp.amount
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `gastos_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    showSnackbar('Datos exportados exitosamente');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mb={4}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                <ReceiptIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              </motion.div>
              <Typography variant="h4" component="h1" fontWeight={700}>
                Mis Gastos
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Gestiona y controla todos tus gastos de forma inteligente
            </Typography>
          </Box>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExportCSV}
            disabled={filteredExpenses.length === 0}
          >
            Exportar CSV
          </Button>
        </Box>
      </Box>

      {/* Filtros */}
      <Card
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        sx={{
          mb: 3,
          p: 2,
          border: `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 4px 16px ${theme.palette.primary.main}20`,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <motion.div whileHover={{ scale: 1.2, rotate: 180 }}>
            <FilterIcon color="primary" />
          </motion.div>
          <Typography variant="h6" fontWeight="600">
            Filtros
          </Typography>
          {hasActiveFilters && (
            <Chip
              label="Filtros activos"
              size="small"
              color="primary"
              onDelete={handleClearFilters}
              deleteIcon={<ClearIcon />}
            />
          )}
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Descripción o categoría..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm('')}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              select
              label="Categoría"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="all">Todas las categorías</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              select
              label="Ordenar por"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="date-desc">Fecha (más reciente)</MenuItem>
              <MenuItem value="date-asc">Fecha (más antigua)</MenuItem>
              <MenuItem value="amount-desc">Monto (mayor a menor)</MenuItem>
              <MenuItem value="amount-asc">Monto (menor a mayor)</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {hasActiveFilters && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Mostrando {filteredExpenses.length} de {expenses.length} gasto{expenses.length !== 1 ? 's' : ''}
            </Typography>
          </Box>
        )}
      </Card>

      {/* Estadísticas rápidas */}
      {stats && (
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{
                border: `1px solid ${theme.palette.error.main}30`,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: theme.palette.error.main,
                  boxShadow: `0 8px 24px ${theme.palette.error.main}30`,
                },
              }}
            >
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
            <Card
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              sx={{
                border: `1px solid ${theme.palette.primary.main}30`,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 8px 24px ${theme.palette.primary.main}30`,
                },
              }}
            >
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
            <Card
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              sx={{
                border: `1px solid ${theme.palette.warning.main}30`,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: theme.palette.warning.main,
                  boxShadow: `0 8px 24px ${theme.palette.warning.main}30`,
                },
              }}
            >
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
            <Card
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              sx={{
                border: `1px solid ${theme.palette.info.main}30`,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: theme.palette.info.main,
                  boxShadow: `0 8px 24px ${theme.palette.info.main}30`,
                },
              }}
            >
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
        expenses={filteredExpenses}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        loading={loading}
      />

      {/* Botón flotante para agregar */}
      <Fab
        component={motion.button}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        color="primary"
        aria-label="add expense"
        onClick={() => handleOpenForm('create')}
        sx={{
          position: 'fixed',
          bottom: isMobile ? 16 : 32,
          right: isMobile ? 16 : 32,
          zIndex: 1000,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          boxShadow: `0 4px 20px ${theme.palette.primary.main}50`,
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
