import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

import AuthService from "./services/auth.service";


const App = () => {
  
  var user =  JSON.parse(localStorage.getItem("user"));
  if(user != null && (user.campusIDs===undefined || user.roleId===undefined) ){
    localStorage.removeItem("user");
  }
  const routing = useRoutes(routes(AuthService.getCurrentUser()));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
