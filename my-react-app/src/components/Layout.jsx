import Navbar from './Navbar';
import Footer from './Footer';
import PropTypes from 'prop-types';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};