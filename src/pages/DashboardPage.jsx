import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Fab,
  Chip,
  Button,
  Skeleton,
  Snackbar,
  Alert,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  Plus,
  TrendingUp,
  Tag,
  Receipt,
  Calendar,
  DollarSign,
  BarChart3,
  PiggyBank,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../hooks/useExpenses.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import ExpenseForm from '../components/ExpenseForm.jsx';
import AnimatedNumber from '../components/AnimatedNumber.jsx';
import { startOfToday, startOfMonth, endOfMonth, format } from 'date-fns';
import { db } from '../../services/firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formOpen, setFormOpen] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });
  const [budget, setBudget] = React.useState(0);
  const { user } = useAuth();

  const {
    expenses,
    loading,
    stats,
    createExpense,
  } = useExpenses();

  // Cargar presupuesto
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
      }
    };
    loadBudget();
  }, [user]);

  const handleOpenForm = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  const handleSubmitForm = async (expenseData) => {
    try {
      const result = await createExpense(expenseData);
      if (result.success) {
        setSnackbar({ open: true, message: 'Gasto creado exitosamente', severity: 'success' });
        handleCloseForm();
      } else {
        setSnackbar({ open: true, message: result.error, severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Error inesperado: ' + error.message, severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Calcular estadísticas en tiempo real
  const todayExpenses = expenses.filter(exp => {
    const expDate = exp.date.toDate();
    const today = startOfToday();
    return expDate >= today;
  }).reduce((sum, exp) => sum + exp.amount, 0);

  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());

  const monthExpenses = expenses.filter(exp => {
    const expDate = exp.date.toDate();
    return expDate >= monthStart && expDate <= monthEnd;
  }).reduce((sum, exp) => sum + exp.amount, 0);

  // Calcular categoría top
  const categoryTotals = {};
  expenses.forEach(exp => {
    if (!categoryTotals[exp.category]) {
      categoryTotals[exp.category] = 0;
    }
    categoryTotals[exp.category] += exp.amount;
  });

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  // Datos para gráficas
  const last6Months = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);

    const monthTotal = expenses.filter(exp => {
      const expDate = exp.date.toDate();
      return expDate >= monthStart && expDate <= monthEnd;
    }).reduce((sum, exp) => sum + exp.amount, 0);

    last6Months.push({
      name: format(date, 'MMM'),
      total: monthTotal
    });
  }

  // Gastos recientes
  const recentExpenses = expenses.slice(0, 8);

  // Datos para gráfica de categorías (pie chart)
  const categoryData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));

  // Colores para categorías
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
  ];

  // Calcular presupuesto
  const budgetPercentage = budget > 0 ? ((monthExpenses / budget) * 100) : 0;
  const budgetRemaining = budget - monthExpenses;

  const getBudgetColor = () => {
    if (budgetPercentage >= 100) return 'error';
    if (budgetPercentage >= 80) return 'warning';
    return 'success';
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: { xs: 2, md: 4 },
        mb: { xs: 10, md: 4 },
        px: { xs: 2, md: 3, lg: 4 },
        width: '100%'
      }}
    >
      {/* Header */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        sx={{ mb: 4 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Box
            component={motion.div}
            whileHover={{ scale: 1.1, rotate: 5 }}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BarChart3 size={28} color="white" />
          </Box>
          <Typography variant="h4" fontWeight="bold">
            Dashboard
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Vista general de tus finanzas
        </Typography>
      </Box>

          {/* Tarjetas de estadísticas - Responsive */}
          <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
            <Grid item xs={6} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.primary.main}10)`,
                    border: `1px solid ${theme.palette.primary.main}30`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    }
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
                        <AnimatedNumber
                          value={stats?.total || 0}
                          fontSize={isMobile ? '1.1rem' : '1.5rem'}
                          fontWeight="bold"
                        />
                      </Box>
                      <TrendingUp
                        size={isMobile ? 24 : 32}
                        color={theme.palette.primary.main}
                        style={{ opacity: 0.7 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: `linear-gradient(135deg, ${theme.palette.success.main}20, ${theme.palette.success.main}10)`,
                    border: `1px solid ${theme.palette.success.main}30`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    }
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
                        <AnimatedNumber
                          value={todayExpenses}
                          fontSize={isMobile ? '1.1rem' : '1.5rem'}
                          fontWeight="bold"
                        />
                      </Box>
                      <Calendar
                        size={isMobile ? 24 : 32}
                        color={theme.palette.success.main}
                        style={{ opacity: 0.7 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: `linear-gradient(135deg, ${theme.palette.warning.main}20, ${theme.palette.warning.main}10)`,
                    border: `1px solid ${theme.palette.warning.main}30`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    }
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
                        <AnimatedNumber
                          value={monthExpenses}
                          fontSize={isMobile ? '1.1rem' : '1.5rem'}
                          fontWeight="bold"
                        />
                      </Box>
                      <DollarSign
                        size={isMobile ? 24 : 32}
                        color={theme.palette.warning.main}
                        style={{ opacity: 0.7 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: `linear-gradient(135deg, ${theme.palette.secondary.main}20, ${theme.palette.secondary.main}10)`,
                    border: `1px solid ${theme.palette.secondary.main}30`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    }
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
                          {topCategory ? topCategory[0] : 'N/A'}
                        </Typography>
                      </Box>
                      <Tag
                        size={isMobile ? 24 : 32}
                        color={theme.palette.secondary.main}
                        style={{ opacity: 0.7 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {/* Presupuesto (si está configurado) */}
          {budget > 0 && (
            <Card
              component={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              sx={{
                mb: { xs: 3, md: 4 },
                p: 3,
                border: `1px solid ${theme.palette.primary.main}20`,
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: `${theme.palette.primary.main}50`,
                  boxShadow: `0 8px 24px ${theme.palette.primary.main}30`,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                  <PiggyBank size={28} color={theme.palette.primary.main} />
                </motion.div>
                <Typography variant="h6" fontWeight="600">
                  Presupuesto Mensual
                </Typography>
              </Box>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Gastado: ${monthExpenses.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Presupuesto: ${budget.toFixed(2)}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(budgetPercentage, 100)}
                      color={getBudgetColor()}
                      sx={{
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: theme.palette.grey[800],
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box>
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
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Utilizado
                      </Typography>
                      <Typography variant="h6" fontWeight="700">
                        {budgetPercentage.toFixed(1)}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  {budgetPercentage >= 100 ? (
                    <Alert
                      severity="error"
                      icon={<AlertCircle size={20} />}
                      sx={{ borderRadius: 2 }}
                    >
                      Has excedido tu presupuesto
                    </Alert>
                  ) : budgetPercentage >= 80 ? (
                    <Alert
                      severity="warning"
                      icon={<AlertTriangle size={20} />}
                      sx={{ borderRadius: 2 }}
                    >
                      Cerca del límite de presupuesto
                    </Alert>
                  ) : (
                    <Alert
                      severity="success"
                      icon={<CheckCircle size={20} />}
                      sx={{ borderRadius: 2 }}
                    >
                      Dentro del presupuesto
                    </Alert>
                  )}
                </Grid>
              </Grid>
            </Card>
          )}

          {/* Gráficas y contenido - Layout responsive */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Gráfica principal */}
            <Grid item xs={12} lg={7}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                sx={{
                  p: { xs: 2, md: 3 },
                  height: { xs: 300, md: 400 },
                  display: 'flex',
                  flexDirection: 'column',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 8px 24px ${theme.palette.primary.main}20`,
                  },
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Gastos por Mes (Últimos 6 meses)
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={last6Months}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis
                      dataKey="name"
                      stroke={theme.palette.text.secondary}
                      style={{ fontSize: '0.875rem' }}
                    />
                    <YAxis
                      stroke={theme.palette.text.secondary}
                      style={{ fontSize: '0.875rem' }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 8,
                      }}
                      formatter={(value) => [`$${value.toFixed(2)}`, 'Total']}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke={theme.palette.primary.main}
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorTotal)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </Grid>

            {/* Gráfica de categorías */}
            <Grid item xs={12} lg={5}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                sx={{
                  p: { xs: 2, md: 3 },
                  height: { xs: 300, md: 400 },
                  display: 'flex',
                  flexDirection: 'column',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: theme.palette.secondary.main,
                    boxShadow: `0 8px 24px ${theme.palette.secondary.main}20`,
                  },
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Distribución por Categorías
                </Typography>
                {categoryData.length === 0 ? (
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    flexDirection: 'column',
                    gap: 2
                  }}>
                    <Tag size={48} color={theme.palette.text.secondary} />
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      No hay categorías para mostrar
                    </Typography>
                  </Box>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: theme.palette.background.paper,
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: 8,
                        }}
                        formatter={(value) => `$${value.toFixed(2)}`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </Card>
            </Grid>

            {/* Lista de gastos recientes */}
            <Grid item xs={12}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                sx={{
                  p: { xs: 2, md: 3 },
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 8px 24px ${theme.palette.primary.main}20`,
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                      <Receipt size={28} color={theme.palette.primary.main} />
                    </motion.div>
                    <Typography variant="h6" fontWeight="600">
                      Gastos Recientes
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    onClick={() => navigate('/expenses')}
                    sx={{ textTransform: 'none' }}
                  >
                    Ver todos
                  </Button>
                </Box>
                {loading ? (
                  <Grid container spacing={2}>
                    {[1, 2, 3, 4].map((i) => (
                      <Grid item xs={12} sm={6} md={3} key={i}>
                        <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
                      </Grid>
                    ))}
                  </Grid>
                ) : recentExpenses.length === 0 ? (
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 6,
                    flexDirection: 'column',
                    gap: 2
                  }}>
                    <Receipt size={48} color={theme.palette.text.secondary} />
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      No hay gastos registrados
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Plus size={18} />}
                      onClick={handleOpenForm}
                    >
                      Agregar Gasto
                    </Button>
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    {recentExpenses.map((expense, index) => (
                      <Grid item xs={12} sm={6} md={3} key={expense.id}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Card
                            sx={{
                              p: 2,
                              border: `1px solid ${theme.palette.divider}`,
                              transition: 'all 0.2s',
                              '&:hover': {
                                borderColor: theme.palette.primary.main,
                                transform: 'translateY(-4px)',
                                boxShadow: theme.shadows[6],
                              }
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                              <Chip
                                label={expense.category}
                                size="small"
                                color="primary"
                                sx={{ fontSize: '0.7rem' }}
                              />
                              <TrendingDown size={20} color={theme.palette.error.main} />
                            </Box>
                            <Typography variant="body2" fontWeight="600" noWrap sx={{ mb: 0.5 }}>
                              {expense.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                              {format(expense.date.toDate(), 'dd/MM/yyyy')}
                            </Typography>
                            <AnimatedNumber
                              value={expense.amount}
                              fontSize="1.25rem"
                              fontWeight="700"
                              color={theme.palette.error.main}
                            />
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Card>
            </Grid>
          </Grid>

      {/* FAB para móvil */}
      {isMobile && (
        <Fab
          component={motion.button}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          color="primary"
          aria-label="add"
          onClick={handleOpenForm}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            boxShadow: `0 4px 20px ${theme.palette.primary.main}50`,
          }}
        >
          <Plus size={24} />
        </Fab>
      )}

      {/* Botón agregar para desktop */}
      {!isMobile && (
        <Box sx={{ position: 'fixed', bottom: 24, right: 24 }}>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            startIcon={<Plus size={20} />}
            size="large"
            onClick={handleOpenForm}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.5,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: `0 4px 20px ${theme.palette.primary.main}50`,
              '&:hover': {
                boxShadow: `0 8px 30px ${theme.palette.primary.main}60`,
              }
            }}
          >
            Agregar Gasto
          </Button>
        </Box>
      )}

      {/* Formulario de gastos */}
      <ExpenseForm
        open={formOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        expense={null}
        mode="create"
      />

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

export default DashboardPage;
