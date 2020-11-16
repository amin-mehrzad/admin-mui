import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
//import Toolbar from './Toolbar';
//import data from './data';

import axios from 'axios'
//import dotenv from 'dotenv/config'

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
    paddingTop: theme.spacing(3),
    maxWidth:'920px'
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [customers,setCustomers] = useState([]);


  // useEffect(() =>{ async function fetchData(){
  //   const result = await axios({
  //     method: 'get', 
  //     url: `http://${process.env.REACT_APP_SERVER_URI}/api/report`,
  //     //data: {id: varID},
  //     headers: {"Access-Control-Allow-Origin": "*"}
  //   })
  //   return result
  // }

  //   let reportData=fetchData()
  //   setCustomers(reportData.data)
  //   //setData(result);
  // });

  useEffect(() =>{ async function fetchData(){
    const result = await axios({
      method: 'post', 
     // url: 'http://3.15.126.206/api/report',
      url: `http://${process.env.REACT_APP_SERVER_URI}/api/report`,
      //data: {id: varID},
      headers: {"Access-Control-Allow-Origin": "*"}
    })
    var tableData=result.data.filter(x=> x!=null)
    console.log(tableData)
    setCustomers(tableData)
    //return result
  }

    fetchData()
   // console.log(reportData)


    //setData(result);
  },[]);

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
      title="Report"
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
