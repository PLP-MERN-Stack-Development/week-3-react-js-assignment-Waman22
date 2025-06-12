import { useState } from 'react';
import Button from './Button';

export default function TaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTask({ title: newTask, completed: false });
      setNewTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex space-x-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit">Add Task</Button>
      </div>
    </form>
  );
}