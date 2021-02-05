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
import React, { useState } from 'react';

import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  Grid,
  Card,
  Container,

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
// import getInitials from 'src/utils/getInitials';
import { Client, Message } from '@stomp/stompjs';

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)



const WS_ENDPOINT = `ws://${process.env.REACT_APP_MESSAGE_BROKER_HOST}:${process.env.REACT_APP_MESSAGE_BROKER_PORT}/ws`

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  table: {
    width: '50px'
  }
}));

const ReportTable = ({ className, hubInfo, ...rest }) => {
  const classes = useStyles();
  // const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  console.log(hubInfo)

  // const [limit, setLimit] = useState(1000);
  // const [page, setPage] = useState(0);
  const [state, setState] = useState( {
    cronJob: null,
    hubId: hubInfo.hub_id,
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
const  handleToggleFullscreen = () => {
    if (window.innerWidth <= 370) {
      var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

      var docElm = document.getElementById("monitor-wrapper");
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
  }

  console.log(state)
  let { hubId, men_counts, men_count, women_count, men_total, women_total, current_date, current_time, errorMsg } = state;
  var has_men = (men_count >= 0 && women_count < 0);
  var has_women = (men_count < 0 && women_count >= 0);
  var has_both = (men_count >= 0 && women_count >= 0);
  var men_ratio = 0
  if (men_count * 2 <= men_total) men_ratio += 1;
  if (men_count === 0) men_ratio += 1;
  var women_ratio = 0
  if (women_count * 2 <= women_total) women_ratio += 1;
  if (women_count === 0) women_ratio += 1;



    return (
        <Container   className={clsx(classes.root, className)}>
{/* <Container maxWidth="sm"> */}
      {/* // //  className={clsx(classes.root, className)} 
      //   */}
      <div >
        <div className="wrapper" id="monitor-wrapper" onClick={handleToggleFullscreen}>
          {has_women && <img src={women_bg} alt="woman" className="bg-img" />}
          {has_men && <img src={men_bg} alt="man" className="bg-img" />}
          {has_both && <img src={men_bg} alt="man" className="bg-img" />}

          {has_women && <img src={women_top_left} alt="top-left" className="top-left" />}
          {has_men && <img src={men_top_left} alt="top-left" className="top-left" />}
          {has_both && <img src={men_top_left} alt="top-left" className="top-left" />}

          <img src={outer_frame} alt="outer-frame"/>

          <div className="content-wrapper">
            <div className="header-row">
              {has_women && <div className="heading" id="womanHeading">WOMEN</div>}
              {has_men && <div className="heading" id="manHeading">MEN</div>}
              {has_both && <div className="heading-both-man" id="manHeading">MEN</div>}
              {has_both && <div className="heading-both-woman" id="manHeading">WOMEN</div>}
            </div>
            <div className="icon-row">
              {has_both && <div className="icon-container-both">
                <img src={inner_frame} alt="inner-frame" className="inner-frame-both" />
                <img src={woman} alt="woman" className="icon-both-man" />
                <img src={man} alt="man" className="icon-both-woman" />
              </div>}
              {has_women && <div className="icon-container">
                <img src={inner_frame} alt="inner-frame" className="inner-frame" />
                <img src={woman} alt="woman" className="icon" />
              </div>}
              {has_men && <div className="icon-container">
                <img src={inner_frame} alt="inner-frame" className="inner-frame" />
                <img src={man} alt="man" className="icon" />
              </div>}
            </div>

            <div className="empty-row-1"></div>

            <div className="num-row">
              <div className="num-container">
                {has_both && <div>
                  {men_ratio === 0 &&
                    <div className="seats-number-container-both-man">
                      <div className="seats-number-both-man" id="MenseatsNumber">{men_count}</div>
                    </div>}

                  {men_ratio === 1 &&
                    <div className="seats-number-container-both-man-low">
                      <div className="seats-number-both-man" id="MenseatsNumber">{men_count}</div>
                    </div>}

                  {men_ratio === 2 &&
                    <div className="seats-number-container-both-man-very-low">
                      <div className="seats-number-both-man" id="MenseatsNumber">{men_count}</div>
                    </div>}

                  {women_ratio === 0 && <div className="seats-number-container-both-woman">
                    <div className="seats-number-both-woman" id="WomanseatsNumber">{women_count}</div>
                  </div>}

                  {women_ratio === 1 && <div className="seats-number-container-both-woman-low">
                    <div className="seats-number-both-woman" id="WomanseatsNumber">{women_count}</div>
                  </div>}

                  {women_ratio === 2 && <div className="seats-number-container-both-woman-very-low">
                    <div className="seats-number-both-woman" id="WomanseatsNumber">{women_count}</div>
                  </div>}
                </div>
                }

                {has_men && men_ratio === 0 && <div className="seats-number-container">
                  <div className="seats-number" id="MenseatsNumber">{men_count}</div>
                </div>
                }

                {has_men && men_ratio === 1 && <div className="seats-number-container-low">
                  <div className="seats-number" id="MenseatsNumber">{men_count}</div>
                </div>
                }

                {has_men && men_ratio === 2 && <div className="seats-number-container-very-low">
                  <div className="seats-number" id="MenseatsNumber">{men_count}</div>
                </div>
                }

                {has_women && women_ratio === 0 && <div className="seats-number-container">
                  <div className="seats-number" id="WomanseatsNumber">{women_count}</div>
                </div>
                }

                {has_women && women_ratio === 1 && <div className="seats-number-container-low">
                  <div className="seats-number" id="WomanseatsNumber">{women_count}</div>
                </div>
                }

                {has_women && women_ratio === 2 && <div className="seats-number-container-very-low">
                  <div className="seats-number" id="WomanseatsNumber">{women_count}</div>
                </div>
                }

              </div>
            </div>

            <div className="empty-row-2"></div>

            <div className="stalls-row">
              <div className="stalls-container">
                {((has_women && women_count > 1) || (has_men && men_count > 1)) && <div className="stalls-text-container">
                  <div className="stalls-text">Stalls Available</div>
                </div>}
                {((has_women && women_count <= 1) || (has_men && men_count <= 1)) && <div className="stalls-text-container">
                  <div className="stalls-text">Stall Available</div>
                </div>}
                {has_both && (women_count + men_count > 1) && <div className="stalls-text-container-both">
                  <div className="stalls-text-both">Stalls Available</div>
                </div>}
                {has_both && (women_count + men_count <= 1) && <div className="stalls-text-container-both">
                  <div className="stalls-text-both">Stall Available</div>
                </div>}
              </div>
            </div>

            <div className="footer-row">
              <div className="date-time-container">
                <div className="date-time-text-container">
                  <div className="date-time-text" id="current_date">{current_time}</div>
                  <div className="date-time-text date-time-text-2" id="current_time">{current_date}</div>
                </div>
              </div>
              <div className="error-msg-container">
                {errorMsg && errorMsg.length > 0 && <span className="error-msg">{errorMsg}</span>}
              </div>
              <div className="footer-logo">
                <img src={Tooshilights} alt="tooshlights logo here" className="footer-logo-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
       </Container >
    );
  }

  //  }
  // return (
  //   <Card
  //     className={clsx(classes.root, className)}
  //     {...rest}
  //   >
  //     <PerfectScrollbar>
  //       <Box style={{maxWidth:'910px'}} >


  //       </Box>
  //     </PerfectScrollbar>

  //   </Card>
  // );
//};

ReportTable.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.object
};

export default ReportTable;
