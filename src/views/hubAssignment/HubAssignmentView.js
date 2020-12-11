import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  // Zoom
} from '@material-ui/core';
//import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import RoomsTable from './RoomsTable';
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

  const handleChange= (newValue) =>{
    setRoomData(newValue);
  }

  return (
    <Page
      className={classes.root}
      title="Hub Assignment"
    >
      <Container 
      maxWidth={false}
      spacing={3}>
        <Toolbar value={roomData} onChange={handleChange}/>
        <Box mt={3}>
          <Grid >
            {/* {commands.map((command) => (
              // <Zoom in={roomData!==""}>
              <Grid
                item
                key={command.id}
                lg={4}
                md={6}
                xs={12}
              > */}
                <RoomsTable
                 //className={classes.rooms}
                  roomData={roomData}
                />
              {/* </Grid> */}
               {/* </Zoom> */}
             {/* ))} */}
          </Grid>
        </Box>
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
