import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Home from './pages/Home';
import TaskManager from './components/TaskManager';

function ThemeWrapper({ children }) {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return children;
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <div className="app" id="app">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<TaskManager />} />
            </Routes>
          </Router>
        </div>
      </ThemeWrapper>
    </ThemeProvider>
  );
}