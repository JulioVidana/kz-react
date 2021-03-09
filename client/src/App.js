import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsuerAccion } from 'src/redux/authDucks'



const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsuerAccion());

  }, [dispatch])
  const auth = useSelector(store => store.auth);
  const routing = useRoutes(routes(auth));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
