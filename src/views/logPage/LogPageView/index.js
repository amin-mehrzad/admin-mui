import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import LogPageView from './LogPageView';
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
  const [hubData, setHubData] = useState([]);
  const [state, setState] = useState({});
  const [change, setChange] = useState(false);


  useEffect(() => {
    async function fetchData() {
      if (change) {
        console.log(state)
        var query = queryString.stringify(state)
        console.log(query)
      /*  const result = await axios({
          method: 'get',
          // url: 'http://3.15.126.206/api/report',
          url: `http://${process.env.REACT_APP_SERVER_URI}/api/sensor-status?${query}`,
          // data: state,
          headers: { "Access-Control-Allow-Origin": "*" }
        })
        //  console.log(result)

        var tableData = result.data.filter(x => x != null)
        console.log(tableData) 
        setHubData(tableData)          */
        setChange(false)
        //return result
      }
    }

    fetchData()
    // console.log(reportData)


    //setData(result);
  }, [state, change]);

  const handleChange = (newValue) => {
    console.log(newValue)
    setChange(true)
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
          <LogPageView hubData={hubData} />
        </Box>
      </Container>
    </Page>
  );
};

export default StatusListView;
