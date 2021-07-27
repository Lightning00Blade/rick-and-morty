import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout, selectUser } from '../features/user/userSlice';

export const NavigationComponent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Grid container alignItems='center' justifyContent='center' spacing={10}>
          <Grid item>
            <Typography variant='h6'>Your name is {user}!</Typography>
          </Grid>
          <Grid item>
            <Button variant='contained' color='secondary' type='button'>
              <Link to='/'>Episodes List</Link>
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained' color='secondary' type='button'>
              <Link to='/character'>Character Search</Link>
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained' color='secondary' onClick={logoutHandler}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
