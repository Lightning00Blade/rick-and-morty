import React from 'react';

import { useForm } from 'react-hook-form';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch } from '../app/hooks';
import { loggin } from '../features/user/userSlice';

interface FormData {
  name: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

// This one matched only English should find a inverse to match non letter characters
const nameRegEx = /^[A-Za-z]+$/;

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    dispatch(loggin(data.name));
  });

  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth='xs'>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {errors.name && <Alert severity='error'>You name must only have Alphabetic characters!</Alert>}
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  {...register('name', {
                    pattern: nameRegEx,
                    required: true,
                  })}
                  label='Name'
                  size='small'
                  variant='outlined'
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color='secondary' fullWidth type='submit' variant='contained'>
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
