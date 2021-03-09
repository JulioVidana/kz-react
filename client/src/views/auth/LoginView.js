import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux'
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { login } from 'src/redux/authDucks';
import { clearErrors } from 'src/redux/erroresDucks';
import Notificacion from 'src/components/Notification'



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const initialFValues = {
  email: '',
  password: '',
  msg: null
}

const LoginView = (props) => {
  const { isAuthenticated, error } = props;
  const dispatch = useDispatch()
  const classes = useStyles();
  const navigate = useNavigate();
  //const [values, setValues] = useState(initialFValues);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })


  useEffect(() => {
    // Check for register error
    if (error.id === 'LOGIN_FAIL') {
      setNotify({ isOpen: true, message: error.msg.msg, type: 'error' })
      console.log(error.msg.msg)
    } else {
      if (isAuthenticated) {
        dispatch(clearErrors());
        navigate('/app/home', { replace: true });
      }
    }
  }, [error, isAuthenticated, dispatch, setNotify, navigate])


  return (
    <Page
      className={classes.root}
      title="Login"
    >

      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={initialFValues}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values) => {
              //e.preventDefault();
              //console.log(values.password)
              dispatch(login(values))
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>

                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Iniciar Sesión
                  </Typography>
                </Box>

                <Box
                  mt={3}
                  mb={1}
                >
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Escribe tu usuario y contraseña para acceder al sistema
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Enviar
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
      <Notificacion
        notify={notify}
        setNotify={setNotify}
      />
    </Page>
  );
};
const mapStateToProps = state => ({
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(LoginView);
