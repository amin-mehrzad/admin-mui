import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  // Checkbox,
  Paper,
  Typography,
  makeStyles,
  Divider
} from '@material-ui/core';

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { io } from 'socket.io-client';
//import amqp from 'amqplib'
import { Client, Message } from '@stomp/stompjs';

// var StompJs = require('@stomp/stompjs');

import JSONPretty from 'react-json-pretty';


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
//const ENDPOINT = `http://${process.env.REACT_APP_SERVER_URI}`
//const MASSAGE_BROKER_ENDPOINT = `amqp://${process.env.REACT_APP_MESSAGE_BROKER_USERNAME}:${process.env.REACT_APP_MESSAGE_BROKER_PASSWORD}@${process.env.REACT_APP_MESSAGE_BROKER_HOST}:${process.env.REACT_APP_MESSAGE_BROKER_PORT}/`
const WS_ENDPOINT = `ws://${process.env.REACT_APP_MESSAGE_BROKER_HOST}:${process.env.REACT_APP_MESSAGE_BROKER_PORT}/ws`


// const hubID = '9A6AFEE80000'

//var open = require('amqplib').connect(MASSAGE_BROKER_ENDPOINT);


const LogPageView = ({ className, hubData, ...rest }) => {
  const classes = useStyles();
  console.log(hubData)
  // const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  // const [response, setResponse] = useState("");
  const [theArray, setTheArray] = useState([]);


  useEffect(() => {
    //  const socket = io(ENDPOINT);

    const client = new Client({
      brokerURL: `${WS_ENDPOINT}`,
      connectHeaders: {
        login: process.env.REACT_APP_MESSAGE_BROKER_USERNAME,
        passcode: process.env.REACT_APP_MESSAGE_BROKER_PASSWORD,
      },
      debug: function (str) {
        console.log(str);
      },
      // reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });



    client.onConnect = function (frame) {
      console.log('done')
      // Do something, all subscribes must be done is this callback
      // This is needed because this will be executed after a (re)connect


      // client.publish({
      //   destination: '/topic/general',
      //   body: 'Hello world',
      //   headers: { priority: '9' },
      // });
      var subscription = client.subscribe(`/exchange/${hubData.campus_name}/${hubData.venue_name}.${hubData.section_name}.${hubData.room_name}`, function (message) {
        // called when the client receives a STOMP message from the server
        if (message.body) {
          console.log('got message with body ' + message.body);
          setTheArray(oldArray => {
            // if(oldArray.length==0)
            return [ message.body,...oldArray]
          //   else{
          //   console.log(typeof(message.body))
          //  return oldArray.unshift(message.body)
          //   }
          });

        } else {
          console.log('got empty message');
        }
      });
    };

    client.onStompError = function (frame) {
      // Will be invoked in case of error encountered at Broker
      // Bad login/passcode typically will cause an error
      // Complaint brokers will set `message` header with a brief message. Body may contain details.
      // Compliant brokers will terminate the connection after any error
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };

    client.activate();







    // var q=hubID

    //  open.then(function(conn) {
    //     return conn.createChannel();
    //   }).then(function(ch) {
    //     return ch.assertQueue(q).then(function(ok) {
    //       return ch.consume(q, function(msg) {
    //         if (msg !== null) {

    //           console.log(msg.content.toString());

    //           setTheArray(oldArray => [...oldArray, msg]);

    //           ch.ack(msg);
    //         }

    //       });
    //     });
    //   }).catch(console.warn);

    /*
          socket.on( hubID , data => {
              console.log(data)
          //  setResponse(data);
            setTheArray(oldArray => [...oldArray, data]);
    
          });
    
         return () =>  socket.off(hubID);    */
         return () =>  client.deactivate();    

  }, [hubData]);



  return (

    <PerfectScrollbar>
      <Box>
        <Paper >
          <Box p={3} textAlign={'center'} >
            <Typography>
              HUD ID : {hubData.hub}
                        </Typography>
          </Box>
          <Box p={3} fontWeight={"fontWeightLight"}  >

            {theArray.map((element, index) => <div key={index}>
              {/* <Typography style={{ fontSize: '13px' }}> */}
              <JSONPretty id="json-pretty" data={JSON.parse(element)}>

              </JSONPretty>
 
              {/* </Typography> */}
              <Divider />
            </div>)}

          </Box>
        </Paper >
      </Box>
    </PerfectScrollbar>

  );
};

LogPageView.propTypes = {
  className: PropTypes.string,
  hubData: PropTypes.object
};

export default LogPageView;
