import { useState, useEffect } from 'react';
import { useAuth } from './useAuth.jsx';
import ExpenseService from '../services/expenseService.js';

export const useExpenses = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  // Cargar gastos al montar el componente
  useEffect(() => {
    if (!user) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    // Configurar suscripción en tiempo real
    const unsubscribe = ExpenseService.subscribeToUserExpenses(
      user.uid,
      (expensesList, subscriptionError) => {
        if (subscriptionError) {
          setError(subscriptionError.message);
          setLoading(false);
          return;
        }

        setExpenses(expensesList || []);
        setLoading(false);
        setError(null);
      }
    );

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  // Calcular estadísticas cuando cambien los gastos
  useEffect(() => {
    const calculateStats = async () => {
      try {
        if (!user) return;
        const expenseStats = await ExpenseService.getExpenseStats(user.uid);
        setStats(expenseStats);
      } catch (err) {
        console.error('Error calculating stats:', err);
      }
    };

    if (expenses.length > 0) {
      calculateStats();
    } else {
      setStats(null);
    }
  }, [expenses, user]);


  // Crear nuevo gasto
  const createExpense = async (expenseData) => {
    try {
      if (!user) throw new Error('Usuario no autenticado');
      
      setError(null);
      const newExpense = await ExpenseService.createExpense(user.uid, expenseData);
      return { success: true, expense: newExpense };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Actualizar gasto
  const updateExpense = async (expenseId, updateData) => {
    try {
      if (!user) throw new Error('Usuario no autenticado');
      
      setError(null);
      const updatedExpense = await ExpenseService.updateExpense(expenseId, updateData);
      return { success: true, expense: updatedExpense };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Eliminar gasto
  const deleteExpense = async (expenseId) => {
    try {
      if (!user) throw new Error('Usuario no autenticado');
      
      setError(null);
      await ExpenseService.deleteExpense(expenseId);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Obtener gastos por categoría
  const getExpensesByCategory = async (category) => {
    try {
      if (!user) throw new Error('Usuario no autenticado');
      
      const categoryExpenses = await ExpenseService.getExpensesByCategory(user.uid, category);
      return { success: true, expenses: categoryExpenses };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Obtener gastos por rango de fechas
  const getExpensesByDateRange = async (startDate, endDate) => {
    try {
      if (!user) throw new Error('Usuario no autenticado');
      
      const rangeExpenses = await ExpenseService.getExpensesByDateRange(user.uid, startDate, endDate);
      return { success: true, expenses: rangeExpenses };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Refrescar datos
  const refreshExpenses = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const userExpenses = await ExpenseService.getUserExpenses(user.uid);
      setExpenses(userExpenses);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    expenses,
    loading,
    error,
    stats,
    createExpense,
    updateExpense,
    deleteExpense,
    getExpensesByCategory,
    getExpensesByDateRange,
    refreshExpenses,
  };
};

export default useExpenses;
