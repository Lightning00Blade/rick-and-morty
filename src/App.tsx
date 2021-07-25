import { Button } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect, Link, RouteProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { logout, selectLoggedIn, selectUser } from './features/user/userSlice';
import { LoginPage } from './views/Login.view';
import { Episodes } from './views/Episodes.view';
import { Episode } from './views/Episode.view';
import { Location } from './views/Location.view';

export function ProtectedRoute({ ...routeProps }: RouteProps) {
  const isLoggedIn = useAppSelector(selectLoggedIn);

  if (isLoggedIn) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: '/login' }} />;
  }
}

export function GuestRoute({ ...routeProps }: RouteProps) {
  const isLoggedIn = useAppSelector(selectLoggedIn);

  if (!isLoggedIn) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: '/' }} />;
  }
}

// Can Use create a routes file then map over 2 filtered arrays - Guest and Protected
function App() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const user = useAppSelector(selectUser);

  const logoutFuction = () => {
    dispatch(logout());
  };

  return (
    <Router>
      {isLoggedIn && (
        <nav>
          <p>Your name is {user}!</p>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Button variant='contained' color='primary' onClick={logoutFuction}>
                Logout
              </Button>
            </li>
          </ul>
        </nav>
      )}
      <div className='App'>
        <section>
          <Switch>
            <GuestRoute exact path='/login'>
              <LoginPage />
            </GuestRoute>
            <ProtectedRoute exact path='/'>
              <Episodes />
            </ProtectedRoute>
            <ProtectedRoute path='/episode/:id'>
              <Episode />
            </ProtectedRoute>
            <ProtectedRoute path='/location/:id'>
              <Location />
            </ProtectedRoute>
          </Switch>
        </section>

        <footer></footer>
      </div>
    </Router>
  );
}

export default App;
