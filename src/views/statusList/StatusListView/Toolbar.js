import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  Button
} from '@material-ui/core';

import Autorenew from '@material-ui/icons/Autorenew';

import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Toolbar = ({ className, value, onChange, ...rest }) => {
  console.log(value)
  const classes = useStyles();
  const [state, setState] = useState({
  });
  const [campusData, setCampusData] = useState([]);
  const [venuesData, setVenuesData] = useState([]);
  // const [sectionData, setSectionData] = useState([]);
  const [showVenue, setShowVenue] = useState(false);
  // const [showSection, setShowSection] = useState(false);
  const campusHandleChange = async (event) => {
    console.log(event.target.value)
    //  var name = event.target.name;
    var campus_id = event.target.value;
    setShowVenue(false)
    setVenuesData([])
    onChange({ campus_id })

    setState({
      campus_id: event.target.value
    });
    let venueResult = await axios({
      method: 'get',
      url: `http://${process.env.REACT_APP_SERVER_URI}/api/venues?campus_id=${event.target.value}`,
      headers: { "Access-Control-Allow-Origin": "*" }
    })

    if (venueResult.data[0].venue_id !== 0) {
      // setShowSection(false)
      setShowVenue(true)
      setVenuesData(venueResult.data)
    }
    // else{
    //   setShowVenue(false)
    //  // setShowSection(false)
    //   let roomResult = await axios({
    //     method: 'get',
    //     url: `http://${process.env.REACT_APP_SERVER_URI}/api/rooms?campus_id=${campus_id}&venue_id=0&venue_section_id=0`,
    //     headers: { "Access-Control-Allow-Origin": "*" }
    //   })
    //   //console.log(roomResult.data)
    //  // onChange(roomResult.data)
    // }
  };
  const venueHandleChange = async (event) => {
    //onChange({campus_id:event.target.value})
    // setSectionData([])
    //  var name = event.target.name;
    onChange({
      ...state,
      venue_id: event.target.value,
    })
    setState({
      ...state,
      venue_id: event.target.value,
    });

    console.log(event.target.value)

    // let sectionResult = await axios({
    //   method: 'get',
    //   url: `http://${process.env.REACT_APP_SERVER_URI}/api/venue-sections?campus_id=${state.campus}&venue_id=${event.target.value}`,
    //   headers: { "Access-Control-Allow-Origin": "*" }
    // })
    // if (sectionResult.data[0].venue_section_id !== 0){
    //   setShowVenue(true)
    //  // setShowSection(true)
    // //  setSectionData(sectionResult.data)
    // }
    // else{
    //   setShowVenue(false)
    //   let hubResult = await axios({
    //     method: 'get',
    //     url: `http://${process.env.REACT_APP_SERVER_URI}/api/hubs?campus_id=${state.campus}`,
    //     headers: { "Access-Control-Allow-Origin": "*" }
    //   })
    //   console.log(hubResult.data)
    // }
  };
  console.log(state)
  // const sectionHandleChange = async (event) => {
  //   onChange([])
  //   var name = event.target.name;
  //   setState({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  //   let roomResult = await axios({
  //     method: 'get',
  //     url: `http://${process.env.REACT_APP_SERVER_URI}/api/rooms?campus_id=${state.campus}&venue_id=${state.venue}&venue_section_id=${event.target.value}`,
  //     headers: { "Access-Control-Allow-Origin": "*" }
  //   })
  //   if (roomResult.data[0].room_id !== null){
  //     console.log(roomResult.data)
  //     setShowVenue(true)
  //     setShowSection(true)
  //     onChange(roomResult.data)
  //   }
  //   else{
  //     let hubResult = await axios({
  //       method: 'get',
  //       url: `http://${process.env.REACT_APP_SERVER_URI}/api/hubs?campus_id=${state.campus}`,
  //       headers: { "Access-Control-Allow-Origin": "*" }
  //     })
  //     console.log(hubResult.data)
  //   }
  // };
  useEffect(() => {
    async function fetchData() {
      const result = await axios({
        method: 'get',
        url: `http://${process.env.REACT_APP_SERVER_URI}/api/campus`,
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      console.log(result.data)
      setCampusData(result.data)
    }
    fetchData()
  }, []);
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box >
        <Card>
          <CardContent>
            <Box maxWidth={2500} mt={1}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="campus">Campus</InputLabel>
                <Select
                  native
                  value={state.campus}
                  onChange={campusHandleChange}
                  label="Campus"
                  inputProps={{
                    name: 'campus',
                    id: 'campus',
                  }}
                >
                  <option aria-label="None" value="" />
                  {campusData.map((campus) =>
                    <option value={campus.campus_id} key={campus.campus_id} >{campus.description}</option>
                  )}
                </Select>
              </FormControl>
              {showVenue ? <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="venue">Venue</InputLabel>
                <Select
                  native
                  value={state.venue}
                  onChange={venueHandleChange}
                  label="Venue"
                  inputProps={{
                    name: 'venue',
                    id: 'venue',
                  }}
                >
                  <option aria-label="None" value="" />
                  {venuesData.map((venue, index) =>
                    <option value={venue.venue_id} key={index}>{venue.name}</option>
                  )}
                </Select>
              </FormControl> : null}
              <FormControl variant="outlined" className={classes.formControl} >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<Autorenew />}
                  onClick={() => { onChange(state) }}
                >REFRESH
              </Button>
              </FormControl>

              {/* {showSection ? <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="section">Venue Section</InputLabel>
                <Select
                  native
                  value={state.section}
                  onChange={sectionHandleChange}
                  label="Venue Section"
                  inputProps={{
                    name: 'section',
                    id: 'section',
                  }}
                >
                  <option aria-label="None" value="" />
                  {sectionData.map((section,index) =>
                    <option value={section.venue_section_id} key={index}>{section.section_name}</option>
                  )}
                </Select>
              </FormControl> : null} */}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};
Toolbar.propTypes = {
  className: PropTypes.string
};
export default Toolbar;
