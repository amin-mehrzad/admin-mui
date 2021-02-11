import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  // TextField,
  // InputAdornment,
  // SvgIcon,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  // CardHeader,
  // Typography
} from '@material-ui/core';
//import { Search as SearchIcon } from 'react-feather';
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
}));

const Toolbar = ({ className, value, onChange, ...rest }) => {
  console.log(value)
  const classes = useStyles();
  const [state, setState] = useState({});
  const [campusData, setCampusData] = useState([]);
  const [venuesData, setVenuesData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [hubsData, setHubsData] = useState([]);
  const [showVenue, setShowVenue] = useState(false);
  const [showHub, setShowHub] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [enableButton, setEnableButton] = useState(false);

  // const [haveVenues, setHaveVenues] = useState(false);

  //const prevState = usePrevious(state);

  const campusHandleChange = async (event) => {
    // onChange("")
    setHubsData([])
    setVenuesData([])
    //var name = event.target.name;
    var campus = event.target.value;
    var selectedIndex = event.target.options.selectedIndex;
    var campus_name= event.target.options[selectedIndex].innerText
    console.log(event.target.options[selectedIndex].innerText);

    //  console.log(event)
    setState({
      //...state,
      campus,
      campus_name
    });
    let venueResult = await axios({
      method: 'get',
      url: `http://${process.env.REACT_APP_SERVER_URI}/api/venues?campus_id=${event.target.value}`,
      //data: {id: varID},
      headers: { "Access-Control-Allow-Origin": "*" }
    })

    if (venueResult.data[0].venue_id !== 0) {
      //console.log(venueResult.data.venue_id)
      setShowHub(false)
      setShowRoom(false)
      setShowVenue(true)
      setShowSection(false)
      setVenuesData(venueResult.data)

    }
    else {
      setShowVenue(false)
      setShowSection(false)
      setShowRoom(false)

      let hubResult = await axios({
        method: 'get',
        url: `http://${process.env.REACT_APP_SERVER_URI}/api/hubs?campus_id=${campus}`,
        //data: {id: varID},
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      console.log(hubResult.data)
      setShowHub(true)
      setHubsData(hubResult.data)


    }

  };

  const venueHandleChange = async (event) => {
    //  onChange("")

    setSectionData([])
    //var name = event.target.name;
    var selectedIndex = event.target.options.selectedIndex;
    var venue_name= event.target.options[selectedIndex].innerText
    console.log(event.target.options[selectedIndex].innerText);
     var venue_id = event.target.value;
    //  console.log(event)
    setState(prevState => {
      let newState = {
        campus: prevState.campus,
        campus_name: prevState.campus_name,
        venue: venue_id,
        venue_name      
      }
      return newState
    });
    let sectionResult = await axios({
      method: 'get',
      url: `http://${process.env.REACT_APP_SERVER_URI}/api/venue-sections?campus_id=${state.campus}&venue_id=${event.target.value}`,
      //data: {id: varID},
      headers: { "Access-Control-Allow-Origin": "*" }
    })

    if (sectionResult.data[0].venue_section_id !== 0) {
      //console.log(venueResult.data.venue_id)
      setShowHub(false)
      setShowRoom(false)
      setShowVenue(true)
      setShowSection(true)
      setSectionData(sectionResult.data)

    }
    else {
      setShowVenue(false)
      let hubResult = await axios({
        method: 'get',
        url: `http://${process.env.REACT_APP_SERVER_URI}/api/hubs?campus_id=${state.campus}`,
        //data: {id: varID},
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      console.log(hubResult.data)
      setShowHub(true)
      setHubsData(hubResult.data)

    }

  };


  const sectionHandleChange = async (event) => {
    //  onChange("")

    setRoomData([])
    //var name = event.target.name;
    var selectedIndex = event.target.options.selectedIndex;
    var section_name= event.target.options[selectedIndex].innerText
    console.log(event.target.options[selectedIndex].innerText);
     var section = event.target.value;
    setState(prevState => {
      let newState = {
        campus: prevState.campus,
        campus_name: prevState.campus_name,
        venue: prevState.venue,
        venue_name: prevState.venue_name,
        section,
        section_name  
      }
      return newState
    });


    let roomResult = await axios({
      method: 'get',
      url: `http://${process.env.REACT_APP_SERVER_URI}/api/rooms?campus_id=${state.campus}&venue_id=${state.venue}&venue_section_id=${event.target.value}`,
      //data: {id: varID},
      headers: { "Access-Control-Allow-Origin": "*" }
    })
console.log(roomResult)
    if (roomResult.data[0].room_id !== null) {
      console.log(roomResult.data)
      setShowHub(false)
      setShowVenue(true)
      setShowSection(true)
      setRoomData(roomResult.data)
      setShowRoom(true)

    }
    else {
      //setShowVenue(false)
      let hubResult = await axios({
        method: 'get',
        url: `http://${process.env.REACT_APP_SERVER_URI}/api/hubs?campus_id=${state.campus}`,
        //data: {id: varID},
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      console.log(hubResult.data)
      setShowHub(true)
      setHubsData(hubResult.data)


    }



  };

  const roomHandleChange = async (event) => {
    //  onChange("")
    setHubsData([])
    //var name = event.target.name;
    var selectedIndex = event.target.options.selectedIndex;
    var room_name= event.target.options[selectedIndex].innerText
    console.log(event.target.options[selectedIndex].innerText);
    var room = event.target.value;

    let roomResult = await axios({
      method: 'get',
      url: `http://${process.env.REACT_APP_SERVER_URI}/api/hubs?campus_id=${state.campus}&venue_id=${state.venue}&venue_section_id=${state.section}&room_id=${event.target.value}`,
      //data: {id: varID},
      headers: { "Access-Control-Allow-Origin": "*" }
    })

    //if (roomResult.data[0].hub_id !== null){
    console.log(roomResult.data)
    setState(prevState => {
      let newState = {
        campus: prevState.campus,
        campus_name: prevState.campus_name,
        venue: prevState.venue,
        venue_name: prevState.venue_name,
        section: prevState.section,
        section_name: prevState.section_name,
        room,
        room_name,
        hub:  roomResult.data[0].hub_id
      }
      console.log(newState)

      return newState
    });
    // setShowHub(true)
    setEnableButton(true)
    setShowVenue(true)
    setShowSection(true)
    // setHubsData(roomResult.data)
    setShowRoom(true)

    // }
    // else{
    //   //setShowVenue(false)
    //   let hubResult = await axios({
    //     method: 'get',
    //     url: `http://${process.env.REACT_APP_SERVER_URI}/api/hubs?campus_id=${state.campus}`,
    //     //data: {id: varID},
    //     headers: { "Access-Control-Allow-Origin": "*" }
    //   })
    //   console.log(hubResult.data)
    //   setShowHub(true)
    //   setHubsData(hubResult.data)


    // }



  };

  const hubHandleChange = (event) => {
    // Here, we invoke the callback with the new value
    var name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    // onChange(event.target.value);
    // onChange({
    //   ...state,
    //   [name]: event.target.value,
    // });
  }


  useEffect(() => {
    //  console.log(props)
    async function fetchData() {
      const result = await axios({
        method: 'get',
        url: `http://${process.env.REACT_APP_SERVER_URI}/api/campus`,
        //data: {id: varID},
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      //var campuseData=result.data
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
      {/* <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button>
        <Button
          color="primary"
          variant="contained"
        >
          Add product
        </Button>
      </Box> */}
      <Box >
        <Card>
          {/* <CardHeader> */}

          {/* </CardHeader> */}
          <CardContent>
            <Box maxWidth={2500} mt={1}>
              {/* <Typography component="h1" variant="h4" color="textPrimary" gutterBottom>
                  Please Select Hub ID :
            </Typography> */}
              {/* <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search product"
                variant="outlined"
              /> */}
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
                    // havevenues:'false'
                  }}
                >
                  <option aria-label="None" value="" />
                  {campusData.map((campus) =>
                    <option value={campus.campus_id} key={campus.campus_id} >{campus.name}</option>
                  )}
                  {/* <option value={30}>Thirty</option> */}
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
              {showSection ? <FormControl variant="outlined" className={classes.formControl}>
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
                  {sectionData.map((section, index) =>
                    <option value={section.venue_section_id} key={index}>{section.section_name}</option>
                  )}
                </Select>
              </FormControl> : null}

              {showRoom ? <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="room">Room</InputLabel>
                <Select
                  native
                  value={state.room}
                  onChange={roomHandleChange}
                  label="Room"
                  inputProps={{
                    name: 'room',
                    id: 'room',
                  }}
                >
                  <option aria-label="None" value="" />
                  {roomData.map((room, index) =>
                    <option value={room.room_id} key={index}>{room.name}</option>
                  )}
                </Select>
              </FormControl> : null}
              {showHub ? <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="hub">Hub</InputLabel>
                <Select
                  native
                  value={state.hub}
                  onChange={hubHandleChange}
                  label="Hub"
                  inputProps={{
                    name: 'hub',
                    id: 'hub',
                  }}
                >
                  <option aria-label="None" value="" />
                  {hubsData.map((hub, index) =>
                    <option value={hub.hub_id} key={index}>{hub.hub_id}</option>
                  )}
                </Select>
              </FormControl> : null}
              <FormControl variant="outlined" className={classes.formControl} >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  //startIcon={<Autorenew />}
                  disabled={enableButton?false:true}
                  onClick={() => { onChange(state) }}
                >Open Display
              </Button>
              </FormControl>
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
