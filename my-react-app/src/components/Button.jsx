import PropTypes from 'prop-types';

export default function Button({ variant = 'primary', children, ...props }) {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  children: PropTypes.node.isRequired,
};