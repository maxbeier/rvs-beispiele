import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Login from './Login';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => (isLoggedIn ? <Component {...props} /> : <Login />)}
    />
  );
};

export default PrivateRoute;
