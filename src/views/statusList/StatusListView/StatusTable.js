import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';

// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  Card,
  // Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  // Typography,
  makeStyles
} from '@material-ui/core';
// import getInitials from 'src/utils/getInitials';

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { range } from 'lodash';
dayjs.extend(utc)
dayjs.extend(timezone)




const useStyles = makeStyles((theme) => ({
  root: {

  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  table: {
    width: '50px',
    // height:'100px',
    // padding: '10px',
    // margin:'0'
    borderBottom: "none"

  },
  cell: {
    // width: '50px',
    // height:'100px',
    // padding: '5px',
    // margin:'0'
    borderBottom: "none"
  },
  stall: {
    background: "grey",
    color: "white",
    textAlign: "center",
    height: "60px",
    border: "solid",
    borderColor: "white",
    borderWidth: "15px",
    borderRadius: "60px"
  }
}));

const StatusTable = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  // const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(1000);
  const [page, setPage] = useState(0);
  const [state, setState] = useState([]);
  var hubs = []
  customers.map((hubData) => {
    hubs.push(hubData[0].hub_id)
    return hubData
  })


  const socket = io('http://tr.tooshlights.com');
  socket.on("connect", () => {
    console.log('socket connected')
  });



  useEffect(() => {
    //if (customers.length >= 1 && state.length < 1)
      setState(customers)

    socket.on("connect", () => {
      console.log('socket connected')
    });


    //   var hubs = []
    // customers.map((hubData) => {
    //   hubs.push(hubData[0].hub_id)
    //   return hubData
    // })

    socket.on("hello", (data) => {
      //  if (hubs.includes(data[0].h)&& data.length>0){
       if (data.length>1){


      // let newCustomers = customers.map((hubData) => {
      //   if (hubData[0].hub_id === data[0].h) {
      //     console.log(data)
      //     hubData.map((hub, index) => {
      //       if (index > 0 && index === hub.s){
            
      //         return [...hub,stallStatus:`${hub.e?'C':'O'}`]
      //       }else
      //       else
      //         return hubData
      //     })


      //   } else
      //     return hubData

      // })
      var isChanged=false
      for(let i=0;i<=customers.length-1;i++) {
        if (customers[i][0].hub_id === data[0].h) {
                     console.log(data)
                     customers[i][data[1].s].stallStatus= data[0].s===1?'C':'O'
                     isChanged=true

        //  for(let j=0;j<=customers.length-1;i++) {
          console.log(customers)

        }
      }
if(isChanged){
  console.log(customers)
  //  setState(customers)   // TODO change status based on received data -change structure of table
}

    }
  }
    );




  }, [socket, customers, state]);
  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;

  //   if (event.target.checked) {
  //     newSelectedCustomerIds = customers.map((customer) => customer.id);
  //   } else {
  //     newSelectedCustomerIds = [];
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedCustomerIds.indexOf(id);
  //   let newSelectedCustomerIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
  //   } else if (selectedIndex === selectedCustomerIds.length - 1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(
  //       selectedCustomerIds.slice(0, selectedIndex),
  //       selectedCustomerIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  console.log(customers)
  // setState(customers)
  console.log(state)

  // socket.on("hello", (data) => {
  //   console.log(data)
  //     });

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const stallNum = [...range(1, 31)]
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box
        //style={{ maxWidth: '910px' }} 
        >
          <Table size="medium">
            <TableHead>
              <TableRow margin="0">
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                {/* <TableCell className={classes.table}>
                  Campus
                </TableCell >
                <TableCell className={classes.table}>
                  Venue
                </TableCell>
                <TableCell className={classes.table}>
                  Section
                </TableCell>
                <TableCell className={classes.table}>
                  Gender
                </TableCell> */}
                <TableCell className={classes.table}>
                  Hub Id
                </TableCell>

                {stallNum.map((stall) => (
                  <TableCell
                    key={stallNum.indexOf(stall)}
                    className={classes.table}>
                    {/* {stall} */}
                  </TableCell>))}
                {/* <TableCell className={classes.table}>
                       Stall 2
                      </TableCell>
                      <TableCell className={classes.table}>
                       Stall 3
                      </TableCell>
                      </div> */}

                {/* <TableCell className={classes.table}>
                  Status
                </TableCell>
                <TableCell className={classes.table} style={{ minWidth: '180px' }}>
                  Time Stamp
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {state.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={state.indexOf(customer)}
                //   key={customer.room_id}
                //selected={selectedCustomerIds.indexOf(customer.name) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell> */}
                  {/* <TableCell className={classes.table}>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={customer.avatarUrl}
                      >
                        {getInitials(customer.name)}
                      </Avatar> 
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.campus_name}
                      </Typography>
                    </Box> 
                  </TableCell>
                  {/*<TableCell>
                    {customer.venue_name}
                  </TableCell>
                  <TableCell style={{ width: '10px' }}>
                    {customer.section_name}
                  </TableCell>
                  <TableCell>
                    {customer.room_sub_type}
                  </TableCell> */}
                  <TableCell
                    className={classes.cell}
                  >
                    {customer[0].hub_id}
                  </TableCell>
                  { customer.map((stall, index) => (
                    index > 0 ?
                      <TableCell
                        className={classes.stall}
                        // padding="none"
                        key={index}
                        style={{ background: (stall.stallStatus === "O" || stall.stallStatus === 0) ? 'green' : ((stall.stallStatus === "C" || stall.stallStatus === 1) ? 'red' : 'grey') }}
                      >
                        {/* {stall.stallStatus === 0 ? 'O' :(stall.stallStatus === 1 ? 'C' : stall.stallStatus )} */}
                        {stall.stallNumber}
                      </TableCell>
                      : null
                  ))}
                  {/* <TableCell>
                    {customer.sensor_id}
                  </TableCell>
                  <TableCell>
                    {customer.sensor_id}
                  </TableCell> */}
                  {/* <TableCell style={{ width: '10px' }}>
                    {customer.status}
                  </TableCell>
                  <TableCell>
                    {dayjs(customer.timestamp).tz("America/Chicago").format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={state.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        // count={100}
        rowsPerPage={limit}
        //rowsPerPage={1000}
        rowsPerPageOptions={[100]}
      />
    </Card>
  );
};

StatusTable.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default StatusTable;
