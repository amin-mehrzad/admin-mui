import women_bg from '../../../assets/women_bg.gif'; // with import
import men_bg from '../../../assets/men_bg.gif';

import red_bg from '../../../assets/red_bg.gif';
import orange_bg from '../../../assets/orange_bg.gif';
import blue_bg from '../../../assets/blue_bg.gif';

import women_top_left from '../../../assets/women_top_left.png';
import men_top_left from '../../../assets/men_top_left.png';

import outer_frame from '../../../assets/outer_frame.png';

import inner_frame from '../../../assets/inner_frame.png';

import man from '../../../assets/man.png';
import woman from '../../../assets/woman.png';

import Tooshilights from '../../../assets/Tooshlights.png';
import modular_logo from '../../../assets/modular_logo.png';
import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import axios from 'axios';
// import moment from 'moment';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import {
  // Avatar,
  Box,
  Grid,
  Card,
  Container,
  CardMedia,
  CardActionArea,
  // Checkbox,
  // Table,
  // TableBody,
  // TableCell,
  // TableHead,
  // TablePagination,
  // TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import { palette } from '@material-ui/system';

// import getInitials from 'src/utils/getInitials';
import { Client, Message } from '@stomp/stompjs';

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)


const menBackgroundColor = '#1FB3F1'
const womenBackgroundColor = '#E94A74'
const WS_ENDPOINT = `ws://${process.env.REACT_APP_MESSAGE_BROKER_HOST}:${process.env.REACT_APP_MESSAGE_BROKER_PORT}/ws`


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'

  },
  media: {
    //  minHeight: 40,

    backgroundSize: 'contain',
    margin: '2vh'
  },


}));

const Display = ({ className, hubInfo, ...rest }) => {
  const classes = useStyles();
  // const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  console.log(hubInfo)

  // const [limit, setLimit] = useState(1000);
  // const [page, setPage] = useState(0);
  // const [refresh, setRefresh ] = useState(hubInfo)
  const [state, setState] = useState({
    cronJob: null,
    hubId: hubInfo.hub,
    version: 3,
    men_count: -1,
    men_counts: [-1, -1, -1],
    men_total: 1,
    women_count: -1,
    women_total: 1,
    current_date: "",
    current_time: "",
    errorMsg: ""
  });

  useEffect(() => {
    const { hubId, version } = state;
    var routingKey = hubInfo.hub

    if (version == 3) {
      console.log(hubInfo.hub)

      async function intializeValues() {
        const result = await axios({
          method: 'get',
          url: `http://${process.env.REACT_APP_SERVER_URI}/api/sensor-status?campus_id=${hubInfo.campus}&hub_id=${hubInfo.hub}`,
          //  data: { campus_id: 4, hub_id: hubId},
          headers: { "Access-Control-Allow-Origin": "*" }
        })
        console.log(result)
        var sensorStatus = result.data[0]

        console.log(sensorStatus[0])
        var womenStalls = sensorStatus.filter(val => val.roomName == 'Women')
        console.log(womenStalls)

        var menStalls = sensorStatus.filter(val => val.roomName == 'Men')
        console.log(menStalls)

        if (hubInfo.room_name == 'Men') {
          var menVacants = menStalls.filter(val => val.stallStatus == 'O')
          setState({
            ...state,
            hubId: hubInfo.hub,
            men_count: menVacants.length,
            // women_count: data.women_count,
            men_total: menStalls.length,
            // women_total: data.women_total,
            //  current_date: feed_datetime[0],
            // current_time: feed_datetime[1],
            errorMsg: ""
          })
        }
        if (hubInfo.room_name == 'Women') {
          var womenVacants = womenStalls.filter(val => val.stallStatus == 'O')
          setState({
            ...state,
            hubId: hubInfo.hub,
            women_count: womenVacants.length,
            // women_count: data.women_count,
            women_total: womenStalls.length,
            // women_total: data.women_total,
            //  current_date: feed_datetime[0],
            // current_time: feed_datetime[1],
            errorMsg: ""
          })
        }

      }

      intializeValues()

      const subscribeURL = (hubInfo.venue > 0) ? `/exchange/${hubInfo.campus_name}/${hubInfo.venue_name}.${hubInfo.section_name}.${hubInfo.room_name}` : `/exchange/${hubInfo.campus_name}/${hubInfo.hub}`
      // subscribe using STOMP
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
        var subscription = client.subscribe(subscribeURL, function (message) {
          // called when the client receives a STOMP message from the server

          if (message.body) {
            console.log(message.body);

            var receivdData = JSON.parse(message.body)
            if (receivdData.roomName == 'Women')
              setState({
                ...state,
                hubId: hubInfo.hub,
                // men_count: receivdData.availableStalls,
                women_count: receivdData.roomAvailableStalls,
                //  women_count: message.body.women_count,
                // men_total: receivdData.totalStalls,
                women_total: receivdData.roomTotalStalls,
                // women_total: message.body.women_total,
                //  current_date: feed_datetime[0],
                //   current_time: feed_datetime[1],
                errorMsg: ""
              })
            else if (receivdData.roomName == 'Men')
              setState({
                ...state,
                hubId: hubInfo.hub,
                men_count: receivdData.roomAvailableStalls,
                //  women_count: message.body.women_count,
                men_total: receivdData.roomTotalStalls,
                // women_total: message.body.women_total,
                //  current_date: feed_datetime[0],
                //   current_time: feed_datetime[1],
                errorMsg: ""
              })

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
      return () => client.deactivate();


    }
  }, [hubInfo])


  console.log(state)
  let { hubId, men_counts, men_count, women_count, men_total, women_total, current_date, current_time, errorMsg } = state;

  const handle = useFullScreenHandle();

  return (
    <div
      style={{ height: '100vh' }}
      id='monitor-wrapper'>
      {/* <button onClick={handle.enter}>
        Enter fullscreen
      </button> */}
      <FullScreen handle={handle}>

        <Grid
          //   style={{height:'100%' }}
          className={classes.root}

        >
          {hubInfo.room_name == 'Men' ? (
            <Grid>
              <Card >
                <CardActionArea
                  style={{ backgroundColor: `${menBackgroundColor}`, alignItems: 'center', justifyContent: 'center' }}
                  onClick={handle.enter}
                // onClick={handleToggleFullscreen()}
                >
                  <Typography
                    style={{
                      color: 'white',
                      fontSize: '4vh',
                      textAlign: 'center',
                      padding: '2vh 40px 0px 40px',
                      borderRadius: '35px',
                      fontWeight: '700'
                    }}
                  >MEN</Typography>
                  <Grid
                    className={classes.media}
                    style={{
                      backgroundColor: `${menBackgroundColor}`,
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center'
                    }}
                  >
                    <img src={man} alt="outer-frame"
                      style={{
                        height: '62vh',
                        border: '10px solid white',
                        borderRadius: '35px',
                        padding: '3vh 17vw'
                      }} />
                  </Grid>
                  <Grid
                    className={classes.media}
                    style={{
                      backgroundColor: `${menBackgroundColor}`,
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      padding: '0',
                      marginBottom: '0'
                    }}
                  >
                    <Typography
                      style={{
                        color: 'white',
                        fontSize: '5vh',
                        backgroundColor: '#343434',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '1vh 3.5vh',
                        width: 'fit-content',
                        fontFamily: 'fantasy',
                        borderRadius: '75px',
                        margin: 'auto'
                      }}
                    >{men_count}</Typography>
                  </Grid>
                  <Grid
                    className={classes.media}
                    style={{
                      backgroundColor: `${menBackgroundColor}`,
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      padding: '3vh 0px',
                      marginTop: '0'
                    }}
                  >
                    <Typography
                      style={{
                        color: 'white',
                        fontSize: '3vh',
                        backgroundColor: '#343434',
                        textAlign: 'center',
                        padding: '2vh 12vw',
                        fontFamily: 'fantasy',
                        borderRadius: '20px',
                        width: 'fit-content',
                        margin: 'auto'
                      }}
                    >STALLS AVAILABLE</Typography>
                  </Grid>
                </CardActionArea>
              </Card>
            </Grid>
          ) : null}
          {hubInfo.room_name == 'Women' ? (
            <Grid>
              <Card >
                <CardActionArea
                  style={{ backgroundColor: `${womenBackgroundColor}`, alignItems: 'center', justifyContent: 'center' }}
                  onClick={handle.enter}
                // onClick={handleToggleFullscreen()}

                >
                  <Typography
                    style={{
                      color: 'white',
                      fontSize: '4vh',
                      textAlign: 'center',
                      padding: '2vh 40px 0px 40px',
                      borderRadius: '35px',
                      fontWeight: '700'
                    }}
                  >WOMEN</Typography>
                  <Grid
                    className={classes.media}
                    style={{
                      backgroundColor: `${womenBackgroundColor}`,
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center'
                    }}
                  >
                    <img src={woman} alt="outer-frame" style={{
                      height: '62vh',
                      border: '10px solid white',
                      borderRadius: '35px',
                      padding: '3vh 17vw'
                    }}
                    />
                  </Grid>
                  <Grid
                    className={classes.media}
                    style={{
                      backgroundColor: `${womenBackgroundColor}`,
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      padding: '0',
                      marginBottom: '0'
                    }}
                  >
                    <Typography
                      style={{
                        color: 'white',
                        fontSize: '5vh',
                        backgroundColor: '#343434',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '1vh 3.5vh',
                        width: 'fit-content',
                        fontFamily: 'fantasy',
                        borderRadius: '75px',
                        margin: 'auto'
                      }}
                    >{women_count}</Typography>
                  </Grid>
                  <Grid
                    className={classes.media}
                    style={{
                      backgroundColor: `${womenBackgroundColor}`,
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      padding: '3vh 0px',
                      marginTop: '0'
                    }}
                  >
                    <Typography
                      style={{
                        color: 'white',
                        fontSize: '3vh',
                        backgroundColor: '#343434',
                        textAlign: 'center',
                        padding: '2vh 12vw',
                        fontFamily: 'fantasy',
                        borderRadius: '20px',
                        width: 'fit-content',
                        margin: 'auto'
                      }}
                    >STALLS AVAILABLE</Typography>
                  </Grid>
                </CardActionArea>
              </Card>
            </Grid>
          ) : null}
        </Grid>
      </FullScreen>
    </div>
  );
}
Display.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.object
};
export default Display;
