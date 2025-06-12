import Button from './Button';

export default function TaskCard({ task, onUpdateTask, onDeleteTask }) {
  return (
    <div className="flex justify-between items-center animate-fade-in">
      <div>
        <h3
          className={`text-lg ${
            task.completed
              ? 'line-through text-gray-500 dark:text-gray-400'
              : 'text-gray-800 dark:text-white'
          }`}
        >
          {task.title}
        </h3>
      </div>
      <div className="space-x-2">
        <Button
          onClick={() => onUpdateTask(task.id, !task.completed)}
          variant={task.completed ? 'secondary' : 'primary'}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </Button>
        <Button onClick={() => onDeleteTask(task.id)} variant="danger">
          Delete
        </Button>
      </div>
    </div>
  );
}