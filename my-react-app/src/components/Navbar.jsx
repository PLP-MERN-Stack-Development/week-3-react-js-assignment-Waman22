import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Task Manager
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/tasks" className="navbar-link">
            Tasks
          </Link>
          <Button onClick={toggleTheme}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </div>
      </div>
    </nav>
  );
}