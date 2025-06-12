import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';

export default function Home() {
  return (
    <Layout>
      <div className="home">
        <h1 className="home-title">Welcome to  Wamis Task Manager</h1>
        <p className="home-description">
          Manage your tasks efficiently with our responsive and modern application.
        </p>
        <Link to="/tasks">
          <Button>lets Go to Tasks</Button>
        </Link>
      </div>
    </Layout>
  );
}