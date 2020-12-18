import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
  Typography,
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
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  table: {
    width: '50px',
    // height:'100px',
    // padding: '10px',
   // margin:'0'

  },
  cell: {
   // width: '50px',
    // height:'100px',
     padding: '5px',
   // margin:'0'

  }
}));

const StatusTable = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  // const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(1000);
  const [page, setPage] = useState(0);

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
          <Table size="large">
            <TableHead>
              <TableRow margin = "0">
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
                key = {stallNum.indexOf(stall)}
                className={classes.table}>
                  Stall {stall}
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
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customers.indexOf(customer)}
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
                  <TableCell>
                    {customer.hub_id}
                  </TableCell>
                  { stallNum.map((stall) => (
                    <TableCell 
                   // className={classes.cell}
                   // padding="none"
                    key = {stallNum.indexOf(stall)}
                      style={{background:"grey",color:"white",textAlign:"center",height:"60px",border:"solid",borderColor: "white",borderWidth: "15px",borderRadius: "60px"}}
                      >
                       {customer.sensor_id}
                    </TableCell>
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
        count={customers.length}
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
