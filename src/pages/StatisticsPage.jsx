import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Paper,
  Tabs,
  Tab,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useExpenses } from '../hooks/useExpenses.jsx';
import { startOfMonth, endOfMonth, startOfYear, format } from 'date-fns';
import { colors } from '../utils/theme.js';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

const StatisticsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { expenses, stats } = useExpenses();
  const [tabValue, setTabValue] = useState(0);
  const [periodFilter, setPeriodFilter] = useState('month');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Calcular datos por categoría
  const categoryData = stats?.categories
    ? Object.entries(stats.categories).map(([name, data]) => ({
        name,
        value: data.total,
        count: data.count,
        percentage: data.percentage,
      }))
    : [];

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
  ];

  // Calcular gastos por mes del año actual
  const monthlyData = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(new Date().getFullYear(), i, 1);
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);

    const monthTotal = expenses.filter(exp => {
      const expDate = exp.date.toDate();
      return expDate >= monthStart && expDate <= monthEnd;
    }).reduce((sum, exp) => sum + exp.amount, 0);

    monthlyData.push({
      name: format(date, 'MMM'),
      total: monthTotal,
    });
  }

  // Calcular promedio diario por día de la semana
  const dayOfWeekData = [
    { name: 'Dom', total: 0, count: 0 },
    { name: 'Lun', total: 0, count: 0 },
    { name: 'Mar', total: 0, count: 0 },
    { name: 'Mié', total: 0, count: 0 },
    { name: 'Jue', total: 0, count: 0 },
    { name: 'Vie', total: 0, count: 0 },
    { name: 'Sáb', total: 0, count: 0 },
  ];

  expenses.forEach(exp => {
    const day = exp.date.toDate().getDay();
    dayOfWeekData[day].total += exp.amount;
    dayOfWeekData[day].count += 1;
  });

  // Calcular promedio
  dayOfWeekData.forEach(day => {
    if (day.count > 0) {
      day.average = day.total / day.count;
    }
  });

  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mb={4}
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
          <Typography variant="h4" component="h1" fontWeight={700}>
            Estadísticas
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Análisis detallado de tus gastos
        </Typography>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isMobile ? "fullWidth" : "standard"}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="General" />
          <Tab label="Por Categoría" />
          <Tab label="Por Periodo" />
        </Tabs>
      </Paper>

      {/* Tab Panel: General */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {/* Resumen de estadísticas */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
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
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total de Gastos
                </Typography>
                <Typography variant="h5" fontWeight="700" color="primary.main">
                  {formatCurrency(stats?.total || 0)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{
                border: `1px solid ${theme.palette.secondary.main}30`,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: theme.palette.secondary.main,
                  boxShadow: `0 8px 24px ${theme.palette.secondary.main}30`,
                },
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Cantidad de Gastos
                </Typography>
                <Typography variant="h5" fontWeight="700" color="secondary.main">
                  {stats?.count || 0}
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
                border: `1px solid ${theme.palette.warning.main}30`,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: theme.palette.warning.main,
                  boxShadow: `0 8px 24px ${theme.palette.warning.main}30`,
                },
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Promedio por Gasto
                </Typography>
                <Typography variant="h5" fontWeight="700" color="warning.main">
                  {formatCurrency((stats?.total || 0) / (stats?.count || 1))}
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
                border: `1px solid ${theme.palette.error.main}30`,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: theme.palette.error.main,
                  boxShadow: `0 8px 24px ${theme.palette.error.main}30`,
                },
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Gasto Mensual
                </Typography>
                <Typography variant="h5" fontWeight="700" color="error.main">
                  {formatCurrency(stats?.monthlyTotal || 0)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Gráfica de gastos mensuales */}
          <Grid item xs={12} lg={8}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              sx={{
                p: 2,
                height: 400,
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 8px 24px ${theme.palette.primary.main}20`,
                },
              }}
            >
              <Typography variant="h6" gutterBottom fontWeight="600">
                Gastos Mensuales (Año Actual)
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis
                    dataKey="name"
                    stroke={theme.palette.text.secondary}
                    style={{ fontSize: '0.875rem' }}
                  />
                  <YAxis
                    stroke={theme.palette.text.secondary}
                    style={{ fontSize: '0.875rem' }}
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 8,
                    }}
                    formatter={(value) => [formatCurrency(value), 'Total']}
                  />
                  <Bar dataKey="total" fill={theme.palette.primary.main} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* Gráfica de gastos por día de la semana */}
          <Grid item xs={12} lg={4}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              sx={{
                p: 2,
                height: 400,
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: theme.palette.secondary.main,
                  boxShadow: `0 8px 24px ${theme.palette.secondary.main}20`,
                },
              }}
            >
              <Typography variant="h6" gutterBottom fontWeight="600">
                Promedio por Día
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={dayOfWeekData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis
                    type="number"
                    stroke={theme.palette.text.secondary}
                    style={{ fontSize: '0.75rem' }}
                    tickFormatter={formatCurrency}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke={theme.palette.text.secondary}
                    style={{ fontSize: '0.75rem' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 8,
                    }}
                    formatter={(value) => [formatCurrency(value), 'Promedio']}
                  />
                  <Bar dataKey="average" fill={theme.palette.secondary.main} radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Tab Panel: Por Categoría */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          {/* Gráfica de pastel */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Distribución por Categoría
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage?.toFixed(1)}%`}
                    outerRadius={100}
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
                    formatter={(value) => formatCurrency(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* Lista de categorías */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, height: 400, overflowY: 'auto' }}>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Detalle por Categoría
              </Typography>
              <Box sx={{ mt: 2 }}>
                {categoryData.map((category, index) => (
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    key={category.name}
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: theme.palette.action.hover,
                      borderLeft: `4px solid ${COLORS[index % COLORS.length]}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        backgroundColor: theme.palette.action.selected,
                        boxShadow: `0 4px 12px ${COLORS[index % COLORS.length]}30`,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="600">
                        {category.name}
                      </Typography>
                      <Typography variant="h6" fontWeight="700" color={COLORS[index % COLORS.length]}>
                        {formatCurrency(category.value)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {category.count} gasto{category.count !== 1 ? 's' : ''}
                      </Typography>
                      <Typography variant="body2" fontWeight="600" color="text.secondary">
                        {category.percentage?.toFixed(1)}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
                {categoryData.length === 0 && (
                  <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
                    No hay datos de categorías
                  </Typography>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Tab Panel: Por Periodo */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Comparación de Periodos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Funcionalidad en desarrollo...
              </Typography>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default StatisticsPage;
