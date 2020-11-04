import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
//import data from './data';

import axios from 'axios'
// function report(){
//   return axios({
//     method: 'get', 
//     url: 'http://3.15.126.206/api/report',
//     //data: {id: varID},
//     headers: {"Access-Control-Allow-Origin": "*"}
//   }).then(response => response.data)
// }
// const data=report()
// console.log(data)
// async function dd (){
// const data = await axios({
//   method: 'get', 
//   url: 'http://3.15.126.206/api/report',
//   //data: {id: varID},
//   headers: {"Access-Control-Allow-Origin": "*"}
// })
// // .then((res)=>
// // console.log (res)
// // )
// console.log(data)
// return data
// }
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [customers,setCustomers] = useState([]);

  useEffect(async () => {
    const result = await axios({
      method: 'get', 
      url: 'http://3.15.126.206/api/report',
      //data: {id: varID},
      headers: {"Access-Control-Allow-Origin": "*"}
    })
    setCustomers(result.data)
    //setData(result);
  }, []);

  // axios({
  //   method: 'get', 
  //   url: 'http://3.15.126.206/api/report',
  //   //data: {id: varID},
  //   headers: {"Access-Control-Allow-Origin": "*"}
  // }).then(response => setCustomers(response.data))
  //     .catch(err => console.log(err))

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
        <Box mt={3}>
          <Results customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
