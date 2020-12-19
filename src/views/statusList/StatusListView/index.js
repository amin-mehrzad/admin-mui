import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import StatusTable from './StatusTable';
import Toolbar from './Toolbar';
//import data from './data';

import axios from 'axios'
import queryString from 'querystring'
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
   // maxWidth: '920px'
  }
}));

const StatusListView = () => {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [state, setState] = useState({});

  useEffect(() => {
    async function fetchData() {
      console.log(state)
      var query=queryString.stringify(state)
      console.log(query)
      const result = await axios({
        method: 'get',
        // url: 'http://3.15.126.206/api/report',
        url: `http://${process.env.REACT_APP_SERVER_URI}/api/sensor-status?${query}`,
       // data: state,
        headers: { "Access-Control-Allow-Origin": "*" }
      })
    //  console.log(result)

      var tableData = result.data.filter(x => x != null)
      console.log(tableData)
      setCustomers(tableData)
      //return result
    }

    fetchData()
    // console.log(reportData)


    //setData(result);
  }, [state]);

  const handleChange = (newValue) => {
    console.log(newValue)
    setState(newValue)
  }

  console.log(state)

  return (
    <Page
      className={classes.root}
      title="Report"
    >
      <Container maxWidth={false}>
        <Toolbar value={state} onChange={handleChange} />
        <Box mt={3}>
          <StatusTable customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default StatusListView;
