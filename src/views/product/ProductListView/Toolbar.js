import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
 // Button,
  Card,
  CardContent,
 // TextField,
 // InputAdornment,
 // SvgIcon,
  makeStyles,
  FormControl,
  InputLabel,
  Select
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

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    campus: '',
    venue: '',
  });
  const [campusData, setCampusData] = useState([]);
  const [venuesData, setVenuesData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [hubsData, setHubsData] = useState([]);
  const [showVenue, setShowVenue] = useState(false);
  const [showHub, setShowHub] = useState(false);
  const [showSection, setShowSection] = useState(false);
  // const [haveVenues, setHaveVenues] = useState(false);


  const campusHandleChange = async (event) => {
    var name = event.target.name;
    var campus_id = event.target.value;
    //  console.log(event)
    setState({
      ...state,
      [name]: event.target.value,
    });
    let venueResult = await axios({
      method: 'get',
      url: `http://${process.env.REACT_APP_SERVER_URI}/api/venues?campus_id=${event.target.value}`,
      //data: {id: varID},
      headers: { "Access-Control-Allow-Origin": "*" }
    })

    if (venueResult.data[0].venue_id !== 0){
      //console.log(venueResult.data.venue_id)
      setShowHub(false)
      setShowVenue(true)
      setVenuesData(venueResult.data)

    }
    else{
      setShowVenue(false)
      setShowSection(false)
      let hubResult = await axios({
        method: 'get',
        url: `http://${process.env.REACT_APP_SERVER_URI}/api/hubs?campus_id=${campus_id}`,
        //data: {id: varID},
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      console.log(hubResult.data)
      setShowHub(true)
      setHubsData(hubResult.data)


    }

  };

  const venueHandleChange = async (event) => {
    setSectionData([])
    var name = event.target.name;
 ///////   var venue_id = event.target.value;
    //  console.log(event)
    setState({
      ...state,
      [name]: event.target.value,
    });
    let sectionResult = await axios({
      method: 'get',
      url: `http://${process.env.REACT_APP_SERVER_URI}/api/venue-sections?campus_id=${state.campus}&venue_id=${event.target.value}`,
      //data: {id: varID},
      headers: { "Access-Control-Allow-Origin": "*" }
    })

    if (sectionResult.data[0].venue_section_id !== 0){
      //console.log(venueResult.data.venue_id)
      setShowHub(false)
      setShowVenue(true)
      setShowSection(true)
      setSectionData(sectionResult.data)

    }
    else{
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


  useEffect(() => {
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
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={2500}>
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
                    <option value={campus.campus_id} key={campus.campus_id} >{campus.description}</option>
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
                  {venuesData.map((venue) =>
                    <option value={venue.venue_id} key={venue.venue_id}>{venue.name}</option>
                  )}
                </Select>
              </FormControl> : null}
              {showSection ? <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="section">Venue Section</InputLabel>
                <Select
                  native
                  value={state.section}
                  // onChange={handleChange}
                  label="Venue Section"
                  inputProps={{
                    name: 'section',
                    id: 'section',
                  }}
                >
                  <option aria-label="None" value="" />
                  {sectionData.map((section) =>
                    <option value={section.venue_section_id} key={section.venue_section_id}>{section.section_name}</option>
                  )}
                </Select>
              </FormControl> : null}
              {showHub ? <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="hub">Hub</InputLabel>
                <Select
                  native
                  value={state.hub}
                  // onChange={handleChange}
                  label="Hub"
                  inputProps={{
                    name: 'hub',
                    id: 'hub',
                  }}
                >
                  <option aria-label="None" value="" />
                  {hubsData.map((hub) =>
                    <option value={hub.hub_id} key={hub.hub_id}>{hub.hub_id}</option>
                  )}
                </Select>
              </FormControl> : null}
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
