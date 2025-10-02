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
  X as CloseIcon,
  DollarSign as MoneyIcon,
  Tag as CategoryIcon,
  FileText as DescriptionIcon,
  Calendar as CalendarIcon,
  UtensilsCrossed,
  Car,
  Gamepad2,
  Heart,
  GraduationCap,
  ShoppingBag,
  Wrench,
  Package,
} from 'lucide-react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const categories = [
  { id: 'alimentacion', name: 'Alimentación', color: '#e74c3c', Icon: UtensilsCrossed },
  { id: 'transporte', name: 'Transporte', color: '#3498db', Icon: Car },
  { id: 'entretenimiento', name: 'Entretenimiento', color: '#9b59b6', Icon: Gamepad2 },
  { id: 'salud', name: 'Salud', color: '#27ae60', Icon: Heart },
  { id: 'educacion', name: 'Educación', color: '#f39c12', Icon: GraduationCap },
  { id: 'compras', name: 'Compras', color: '#e67e22', Icon: ShoppingBag },
  { id: 'servicios', name: 'Servicios', color: '#34495e', Icon: Wrench },
  { id: 'otros', name: 'Otros', color: '#95a5a6', Icon: Package },
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
            <Box display="flex" alignItems="center" gap={1.5}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #2196F3, #21CBF3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MoneyIcon size={22} color="white" />
              </Box>
              <Typography variant="h5" component="div" fontWeight={600}>
                {mode === 'create' ? 'Nuevo Gasto' : 'Editar Gasto'}
              </Typography>
            </Box>
            <IconButton onClick={onClose} size="small">
              <CloseIcon size={20} />
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
                      <MoneyIcon size={20} color="#2196F3" />
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
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.date,
                    helperText: errors.date,
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarIcon size={20} color="#2196F3" />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
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
                      <DescriptionIcon size={20} color="#2196F3" />
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
                      <CategoryIcon size={20} color="#2196F3" />
                    </InputAdornment>
                  }
                >
                  {categories.map((category) => {
                    const Icon = category.Icon;
                    return (
                      <MenuItem key={category.id} value={category.id}>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 1.5,
                              backgroundColor: category.color + '20',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Icon size={18} color={category.color} />
                          </Box>
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
                    );
                  })}
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
