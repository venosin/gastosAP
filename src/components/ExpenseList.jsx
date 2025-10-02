import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Grid,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import {
  UtensilsCrossed,
  Car,
  Gamepad2,
  Heart,
  GraduationCap,
  ShoppingBag,
  Wrench,
  Package,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const categories = {
  alimentacion: { name: 'Alimentación', color: '#e74c3c', Icon: UtensilsCrossed },
  transporte: { name: 'Transporte', color: '#3498db', Icon: Car },
  entretenimiento: { name: 'Entretenimiento', color: '#9b59b6', Icon: Gamepad2 },
  salud: { name: 'Salud', color: '#27ae60', Icon: Heart },
  educacion: { name: 'Educación', color: '#f39c12', Icon: GraduationCap },
  compras: { name: 'Compras', color: '#e67e22', Icon: ShoppingBag },
  servicios: { name: 'Servicios', color: '#34495e', Icon: Wrench },
  otros: { name: 'Otros', color: '#95a5a6', Icon: Package },
};

const ExpenseList = ({ expenses = [], onEdit, onDelete, loading = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleMenuOpen = (event, expense) => {
    setAnchorEl(event.currentTarget);
    setSelectedExpense(expense);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedExpense(null);
  };

  const handleEdit = () => {
    onEdit(selectedExpense);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(selectedExpense);
    handleMenuClose();
  };

  // Filtrar y ordenar gastos
  const filteredAndSortedExpenses = expenses
    .filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           categories[expense.category]?.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !filterCategory || expense.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'category':
          comparison = categories[a.category]?.name.localeCompare(categories[b.category]?.name);
          break;
        case 'description':
          comparison = a.description.localeCompare(b.description);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date) => {
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return format(dateObj, 'dd MMM yyyy', { locale: es });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography>Cargando gastos...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Filtros y búsqueda */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar gastos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Categoría</InputLabel>
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                label="Categoría"
                startAdornment={
                  <InputAdornment position="start">
                    <FilterIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="">Todas las categorías</MenuItem>
                {Object.entries(categories).map(([key, category]) => {
                  const Icon = category.Icon;
                  return (
                    <MenuItem key={key} value={key}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Icon size={18} color={category.color} />
                        {category.name}
                      </Box>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Ordenar por</InputLabel>
              <Select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                label="Ordenar por"
                startAdornment={
                  <InputAdornment position="start">
                    <SortIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="date-desc">
                  <Box display="flex" alignItems="center" gap={1}>
                    <TrendingDownIcon fontSize="small" />
                    Fecha (más reciente)
                  </Box>
                </MenuItem>
                <MenuItem value="date-asc">
                  <Box display="flex" alignItems="center" gap={1}>
                    <TrendingUpIcon fontSize="small" />
                    Fecha (más antigua)
                  </Box>
                </MenuItem>
                <MenuItem value="amount-desc">Monto (mayor a menor)</MenuItem>
                <MenuItem value="amount-asc">Monto (menor a mayor)</MenuItem>
                <MenuItem value="category-asc">Categoría (A-Z)</MenuItem>
                <MenuItem value="description-asc">Descripción (A-Z)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {filteredAndSortedExpenses.length} gasto{filteredAndSortedExpenses.length !== 1 ? 's' : ''}
            </Typography>
          </Grid>
        </Grid>
      </Card>

      {/* Lista de gastos */}
      {filteredAndSortedExpenses.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No se encontraron gastos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm || filterCategory
              ? 'Intenta cambiar los filtros de búsqueda'
              : 'Comienza agregando tu primer gasto'
            }
          </Typography>
        </Card>
      ) : (
        <Stack spacing={2}>
          {filteredAndSortedExpenses.map((expense) => {
            const category = categories[expense.category] || categories.otros;
            const CategoryIcon = category.Icon;

            return (
              <Card
                key={expense.id}
                sx={{
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[8],
                  }
                }}
              >
                <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                  <Grid container spacing={2} alignItems="center">
                    {/* Icono de categoría */}
                    <Grid item>
                      <Avatar
                        sx={{
                          backgroundColor: category.color + '20',
                          width: isMobile ? 40 : 48,
                          height: isMobile ? 40 : 48,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CategoryIcon size={isMobile ? 20 : 24} color={category.color} />
                      </Avatar>
                    </Grid>

                    {/* Información principal */}
                    <Grid item xs>
                      <Box>
                        <Typography 
                          variant={isMobile ? "body1" : "h6"} 
                          fontWeight={600}
                          gutterBottom
                        >
                          {expense.description}
                        </Typography>
                        
                        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                          <Chip
                            size="small"
                            label={category.name}
                            sx={{
                              backgroundColor: category.color + '20',
                              color: category.color,
                              fontWeight: 500,
                            }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(expense.date)}
                          </Typography>
                        </Box>

                        {expense.notes && (
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ mt: 1, fontStyle: 'italic' }}
                          >
                            {expense.notes}
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    {/* Monto */}
                    <Grid item>
                      <Box textAlign="right">
                        <Typography 
                          variant={isMobile ? "h6" : "h5"}
                          fontWeight={700}
                          color="error.main"
                        >
                          -{formatCurrency(expense.amount)}
                        </Typography>
                        
                        {!isMobile && (
                          <Typography variant="caption" color="text.secondary">
                            {format(expense.createdAt?.toDate?.() || new Date(expense.createdAt), 'HH:mm')}
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    {/* Menú de acciones */}
                    <Grid item>
                      <IconButton
                        onClick={(e) => handleMenuOpen(e, expense)}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}

      {/* Menú contextual */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { minWidth: 150 }
        }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ExpenseList;
