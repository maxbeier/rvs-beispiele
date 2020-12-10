import { Route } from 'react-router-dom';
import Login from './Login';
import { useUser } from './UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useUser();
  return (
    <Route
      {...rest}
      render={(props) => (isLoggedIn ? <Component {...props} /> : <Login />)}
    />
  );
};

export default PrivateRoute;
