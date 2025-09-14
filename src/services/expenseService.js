import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../../services/firebase.js';

const EXPENSES_COLLECTION = 'expenses';

export class ExpenseService {
  // Crear un nuevo gasto
  static async createExpense(userId, expenseData) {
    try {
      const expense = {
        ...expenseData,
        userId,
        amount: Number(expenseData.amount),
        date: Timestamp.fromDate(new Date(expenseData.date)),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, EXPENSES_COLLECTION), expense);
      return { id: docRef.id, ...expense };
    } catch (error) {
      console.error('Error creating expense:', error);
      throw new Error('Error al crear el gasto: ' + error.message);
    }
  }

  // Obtener todos los gastos del usuario
  static async getUserExpenses(userId) {
    try {
      const q = query(
        collection(db, EXPENSES_COLLECTION),
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const expenses = [];
      
      querySnapshot.forEach((doc) => {
        expenses.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return expenses;
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw new Error('Error al obtener los gastos: ' + error.message);
    }
  }

  // Escuchar cambios en tiempo real
  static subscribeToUserExpenses(userId, callback) {
    try {
      const q = query(
        collection(db, EXPENSES_COLLECTION),
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );

      return onSnapshot(q, (querySnapshot) => {
        const expenses = [];
        querySnapshot.forEach((doc) => {
          expenses.push({
            id: doc.id,
            ...doc.data()
          });
        });
        callback(expenses);
      }, (error) => {
        console.error('Error in expenses subscription:', error);
        callback(null, error);
      });
    } catch (error) {
      console.error('Error setting up expenses subscription:', error);
      throw new Error('Error al configurar la suscripción: ' + error.message);
    }
  }

  // Actualizar un gasto
  static async updateExpense(expenseId, updateData) {
    try {
      const expenseRef = doc(db, EXPENSES_COLLECTION, expenseId);
      
      const updatedData = {
        ...updateData,
        amount: Number(updateData.amount),
        date: updateData.date instanceof Date 
          ? Timestamp.fromDate(updateData.date)
          : updateData.date,
        updatedAt: Timestamp.now(),
      };

      await updateDoc(expenseRef, updatedData);
      return { id: expenseId, ...updatedData };
    } catch (error) {
      console.error('Error updating expense:', error);
      throw new Error('Error al actualizar el gasto: ' + error.message);
    }
  }

  // Eliminar un gasto
  static async deleteExpense(expenseId) {
    try {
      await deleteDoc(doc(db, EXPENSES_COLLECTION, expenseId));
      return expenseId;
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw new Error('Error al eliminar el gasto: ' + error.message);
    }
  }

  // Obtener gastos por categoría
  static async getExpensesByCategory(userId, category) {
    try {
      const q = query(
        collection(db, EXPENSES_COLLECTION),
        where('userId', '==', userId),
        where('category', '==', category),
        orderBy('date', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const expenses = [];
      
      querySnapshot.forEach((doc) => {
        expenses.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return expenses;
    } catch (error) {
      console.error('Error fetching expenses by category:', error);
      throw new Error('Error al obtener gastos por categoría: ' + error.message);
    }
  }

  // Obtener gastos por rango de fechas
  static async getExpensesByDateRange(userId, startDate, endDate) {
    try {
      const q = query(
        collection(db, EXPENSES_COLLECTION),
        where('userId', '==', userId),
        where('date', '>=', Timestamp.fromDate(startDate)),
        where('date', '<=', Timestamp.fromDate(endDate)),
        orderBy('date', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const expenses = [];
      
      querySnapshot.forEach((doc) => {
        expenses.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return expenses;
    } catch (error) {
      console.error('Error fetching expenses by date range:', error);
      throw new Error('Error al obtener gastos por rango de fechas: ' + error.message);
    }
  }

  // Obtener estadísticas de gastos
  static async getExpenseStats(userId) {
    try {
      const expenses = await this.getUserExpenses(userId);
      
      const stats = {
        total: 0,
        count: expenses.length,
        categories: {},
        monthlyTotal: 0,
        weeklyTotal: 0,
        dailyAverage: 0,
      };

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      
      expenses.forEach(expense => {
        const amount = expense.amount;
        const expenseDate = expense.date.toDate();
        
        stats.total += amount;
        
        // Estadísticas por categoría
        if (!stats.categories[expense.category]) {
          stats.categories[expense.category] = {
            total: 0,
            count: 0,
            percentage: 0,
          };
        }
        stats.categories[expense.category].total += amount;
        stats.categories[expense.category].count += 1;
        
        // Gastos del mes actual
        if (expenseDate >= startOfMonth) {
          stats.monthlyTotal += amount;
        }
        
        // Gastos de la semana actual
        if (expenseDate >= startOfWeek) {
          stats.weeklyTotal += amount;
        }
      });

      // Calcular porcentajes por categoría
      Object.keys(stats.categories).forEach(category => {
        stats.categories[category].percentage = 
          (stats.categories[category].total / stats.total) * 100;
      });

      // Promedio diario (últimos 30 días)
      stats.dailyAverage = stats.monthlyTotal / 30;

      return stats;
    } catch (error) {
      console.error('Error calculating expense stats:', error);
      throw new Error('Error al calcular estadísticas: ' + error.message);
    }
  }
}

export default ExpenseService;
