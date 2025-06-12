import { useState } from 'react';
import Button from './Button';
import Card from './Card';
import { useTasks } from '../hooks/useTasks';

export default function TaskManager() {
  const {
    tasks,
    loading,
    error,
    addTask,
    updateTaskStatus,
    deleteTask,
    setFilter,
    setSearchQuery,
    loadMore,
  } = useTasks();
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask({ title: newTask, completed: false });
      setNewTask('');
    }
  };

  return (
    <div className="task-manager">
      <h1 className="task-manager-title">Task Manager</h1>
      <Card>
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="task-input"
            />
            <Button type="submit">Add Task</Button>
          </div>
        </form>
        <div className="form-group">
          <input
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="task-input"
          />
        </div>
        <div className="filter-buttons">
          <Button onClick={() => setFilter('all')} variant="secondary">
            All
          </Button>
          <Button onClick={() => setFilter('active')} variant="secondary">
            Active
          </Button>
          <Button onClick={() => setFilter('completed')} variant="secondary">
            Completed
          </Button>
        </div>
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        <div className="task-list">
          {tasks.map((task) => (
            <Card key={task.id} className="task-card">
              <div>
                <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
                  {task.title}
                </h3>
              </div>
              <div className="task-actions">
                <Button
                  onClick={() => updateTaskStatus(task.id, !task.completed)}
                  variant={task.completed ? 'secondary' : 'primary'}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </Button>
                <Button onClick={() => deleteTask(task.id)} variant="danger">
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="load-more">
          <Button onClick={loadMore} variant="secondary">
            Load More
          </Button>
        </div>
      </Card>
    </div>
  );
}