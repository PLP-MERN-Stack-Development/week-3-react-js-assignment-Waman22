import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/taskApi';

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const data = await fetchTasks(page);
        setTasks([...tasks, ...data]);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [page]);

  const addTask = async (task) => {
    try {
      const newTask = await createTask({ ...task, userId: 1 });
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const updateTaskStatus = async (id, completed) => {
    try {
      const updatedTask = tasks.find((task) => task.id === id);
      await updateTask(id, { ...updatedTask, completed });
      setTasks(tasks.map((task) => (task.id === id ? { ...task, completed } : task)));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return {
    tasks: filteredTasks,
    loading,
    error,
    addTask,
    updateTaskStatus,
    deleteTask,
    setFilter,
    setSearchQuery,
    loadMore: () => setPage(page + 1),
  };
};