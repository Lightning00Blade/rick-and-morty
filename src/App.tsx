import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { selectLoggedIn } from './features/user/userSlice';
import { LoginPage } from './views/Login.view';
import { Episodes } from './views/Episodes.view';
import { Episode } from './views/Episode.view';
import { Location } from './views/Location.view';
import { NavigationComponent } from './components/Navigation.component';
import { Container } from '@material-ui/core';
import { CharacterSearch } from './views/CharacterSearch.view';

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
  const isLoggedIn = useAppSelector(selectLoggedIn);

  return (
    <Router>
      {isLoggedIn && <NavigationComponent />}
      <div className='App'>
        <section>
          <Container maxWidth='md'>
            <Switch>
              <GuestRoute exact path='/login'>
                <LoginPage />
              </GuestRoute>
              <ProtectedRoute exact path='/'>
                <Episodes />
              </ProtectedRoute>
              <ProtectedRoute path='/character/:name?'>
                <CharacterSearch />
              </ProtectedRoute>
              <ProtectedRoute path='/episode/:id'>
                <Episode />
              </ProtectedRoute>
              <ProtectedRoute path='/location/:id'>
                <Location />
              </ProtectedRoute>
            </Switch>
          </Container>
        </section>

        {isLoggedIn && <footer></footer>}
      </div>
    </Router>
  );
}

export default App;
