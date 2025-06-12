import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import Card from './Card';
import Layout from './Layout';
import { useTasks } from '../hooks/useTasks';
import { en } from '../utils/language'; // Optional: for English text

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
    <Layout>
      <div className="task-manager">
        <h1 className="task-manager-title">{en.taskManager.title}</h1>
        <Card>
          <form onSubmit={handleSubmit} className="task-form">
            <div className="form-group">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder={en.taskManager.addTaskPlaceholder}
                className="task-input"
              />
              <Button type="submit">{en.taskManager.addButton}</Button>
            </div>
          </form>
          <div className="form-group">
            <input
              type="text"
              placeholder={en.taskManager.searchPlaceholder}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="task-input"
            />
          </div>
          <div className="filter-buttons">
            <Button onClick={() => setFilter('all')} variant="secondary">
              {en.taskManager.filters.all}
            </Button>
            <Button onClick={() => setFilter('active')} variant="secondary">
              {en.taskManager.filters.active}
            </Button>
            <Button onClick={() => setFilter('completed')} variant="secondary">
              {en.taskManager.filters.completed}
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
                    {task.completed ? en.taskManager.undoButton : en.taskManager.completeButton}
                  </Button>
                  <Button onClick={() => deleteTask(task.id)} variant="danger">
                    {en.taskManager.deleteButton}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="load-more">
            <Button onClick={loadMore} variant="secondary">
              {en.taskManager.loadMore}
            </Button>
          </div>
          <div className="back-home">
            <Link to="/" className="back-home-link">
              {en.taskManager.backToHome}
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
}