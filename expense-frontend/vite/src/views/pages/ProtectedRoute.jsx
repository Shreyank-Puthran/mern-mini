import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('token'); // Or use a user context or auth hook

  if (!user) {
    return <Navigate to="/pages/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
