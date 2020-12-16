import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Zoom
} from '@material-ui/core';
//import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import RoomsTable from './RoomsTable';
import SensorRangeTable from './SensorRangeTable';
// import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  rooms: {
    height: '100%'
  }
}));

const HubAssignment = () => {
  const classes = useStyles();
  //const [commands] = useState(data);
  const [roomData, setRoomData] = useState([]);
  //const [sensorTable, setSensorTable] = useState(false);
  const [state, setState] = useState({
    rooms: [],
    sensorRange: [],
    selectedRoom: -1,
   // roomClicked: false
  });

  const handleChange = (newValue) => {
   // setSensorTable(false);
    console.log(newValue)
    setRoomData(newValue);
    //  let obj={rooms:newValue,sensorRange:[...]}
    setState({ selectedRoom: -1, sensorRange: [], rooms: newValue})
  }
  const handleChangeRooms = (newValue) => {
    console.log(newValue)

   // setSensorTable(true);
    //setState({ ...state, sensorRange: newValue })
    setState({ ...state, sensorRange: newValue.sensorRange, selectedRoom: newValue.selectedRoom })
  }
  // console.log(sensorData.length)
  console.log(roomData)
  console.log(state)
  return (
    <Page
      className={classes.root}
      title="Hub Assignment"
    >
      <Container
        maxWidth={false}
        spacing={3}>
        <Toolbar value={state} onChange={handleChange} />
        <Box mt={3}>
          <Grid >
            {/* {commands.map((command) => (
              
              <Grid
                item
                key={command.id}
                lg={4}
                md={6}
                xs={12}
              > */}
            <RoomsTable
              //className={classes.rooms}
              value={state} onChange={handleChangeRooms}
            />
          </Grid>
        </Box>
        <Box mt={3}>
          <Zoom in={state.selectedRoom !== -1}>

            <Grid >
              <SensorRangeTable
                //className={classes.rooms}
                // sensorData={state.sensorRange}
                value={state}
              />

            </Grid>
          </Zoom>

        </Box>
        {/* </Grid> */}
        {/* ))} */}

        {/* <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box> */}
      </Container>
    </Page>
  );
};

export default HubAssignment;
