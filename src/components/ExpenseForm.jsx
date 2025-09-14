import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
  IconButton,
  Chip,
  InputAdornment,
} from '@mui/material';
import {
  Close as CloseIcon,
  AttachMoney as MoneyIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const categories = [
  { id: 'alimentacion', name: 'Alimentación', color: '#e74c3c', icon: '🍽️' },
  { id: 'transporte', name: 'Transporte', color: '#3498db', icon: '🚗' },
  { id: 'entretenimiento', name: 'Entretenimiento', color: '#9b59b6', icon: '🎬' },
  { id: 'salud', name: 'Salud', color: '#27ae60', icon: '🏥' },
  { id: 'educacion', name: 'Educación', color: '#f39c12', icon: '📚' },
  { id: 'compras', name: 'Compras', color: '#e67e22', icon: '🛍️' },
  { id: 'servicios', name: 'Servicios', color: '#34495e', icon: '🔧' },
  { id: 'otros', name: 'Otros', color: '#95a5a6', icon: '📦' },
];

const ExpenseForm = ({ open, onClose, onSubmit, expense = null, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: new Date(),
    notes: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (expense && mode === 'edit') {
      setFormData({
        amount: expense.amount.toString(),
        description: expense.description,
        category: expense.category,
        date: expense.date.toDate ? expense.date.toDate() : new Date(expense.date),
        notes: expense.notes || '',
      });
    } else {
      setFormData({
        amount: '',
        description: '',
        category: '',
        date: new Date(),
        notes: '',
      });
    }
    setErrors({});
  }, [expense, mode, open]);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDateChange = (newDate) => {
    setFormData(prev => ({ ...prev, date: newDate }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'El monto debe ser mayor a 0';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!formData.category) {
      newErrors.category = 'La categoría es requerida';
    }

    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount),
        date: formData.date,
        createdAt: expense?.createdAt || new Date(),
        updatedAt: new Date(),
      };

      onSubmit(expenseData);
      onClose();
    }
  };

  const selectedCategory = categories.find(cat => cat.id === formData.category);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" component="div" fontWeight={600}>
              {mode === 'create' ? '💰 Nuevo Gasto' : '✏️ Editar Gasto'}
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            {/* Monto */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Monto"
                type="number"
                value={formData.amount}
                onChange={handleChange('amount')}
                error={!!errors.amount}
                helperText={errors.amount}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  min: 0,
                  step: 0.01,
                }}
              />
            </Grid>

            {/* Fecha */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Fecha"
                value={formData.date}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!errors.date}
                    helperText={errors.date}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            {/* Descripción */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                value={formData.description}
                onChange={handleChange('description')}
                error={!!errors.description}
                helperText={errors.description}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Categoría */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={formData.category}
                  onChange={handleChange('category')}
                  label="Categoría"
                  startAdornment={
                    <InputAdornment position="start">
                      <CategoryIcon color="primary" />
                    </InputAdornment>
                  }
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <span style={{ fontSize: '1.2em' }}>{category.icon}</span>
                        <Typography>{category.name}</Typography>
                        <Chip
                          size="small"
                          sx={{
                            backgroundColor: category.color,
                            color: 'white',
                            ml: 'auto',
                            minWidth: 20,
                            height: 20,
                          }}
                          label=""
                        />
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                    {errors.category}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Vista previa de categoría seleccionada */}
            {selectedCategory && (
              <Grid item xs={12}>
                <Box 
                  display="flex" 
                  alignItems="center" 
                  gap={1} 
                  p={2} 
                  borderRadius={2}
                  sx={{ 
                    backgroundColor: selectedCategory.color + '20',
                    border: `1px solid ${selectedCategory.color}40`,
                  }}
                >
                  <span style={{ fontSize: '1.5em' }}>{selectedCategory.icon}</span>
                  <Typography variant="body2" color="text.secondary">
                    Categoría seleccionada: <strong>{selectedCategory.name}</strong>
                  </Typography>
                </Box>
              </Grid>
            )}

            {/* Notas */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notas (opcional)"
                multiline
                rows={3}
                value={formData.notes}
                onChange={handleChange('notes')}
                placeholder="Agrega detalles adicionales sobre este gasto..."
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={onClose}
            variant="outlined"
            size="large"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            size="large"
            sx={{ minWidth: 120 }}
          >
            {mode === 'create' ? 'Crear Gasto' : 'Guardar Cambios'}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ExpenseForm;
