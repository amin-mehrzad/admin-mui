import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    // Avatar,
    Box,
    // Checkbox,
    Paper,
    Typography,
    makeStyles
} from '@material-ui/core';

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { io } from 'socket.io-client';

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
    },

}));
const ENDPOINT = `http://${process.env.REACT_APP_SERVER_URI}`
const hubID = '9A6AFEE80000'


const LogPageView = ({ className, customers, ...rest }) => {
     const classes = useStyles();
    // const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    // const [response, setResponse] = useState("");
    const [theArray, setTheArray] = useState("");


    useEffect(() => {
      const socket = io(ENDPOINT);
      
      socket.on( hubID , data => {
          console.log(data)
      //  setResponse(data);
        setTheArray(oldArray => [...oldArray, data]);

      });

      return () =>  socket.off(hubID);
      
    }, []);



    return (

        <PerfectScrollbar>
            <Box>
                <Paper >
                    <Box p={3}  textAlign={'center'} >
                        <Typography>
                            HUD ID : 9A6AFEE80000
                        </Typography>
                    </Box>
                    <Box p={3} fontWeight={"fontWeightLight"}  >
                        <Typography style={{fontSize:'13px'}}>
                           {JSON.stringify(theArray)}
                        </Typography>
                    </Box>
                </Paper >
            </Box>
        </PerfectScrollbar>

    );
};

LogPageView.propTypes = {
    className: PropTypes.string,
    customers: PropTypes.array.isRequired
};

export default LogPageView;
