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
import ProductCard from './ProductCard';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const ProductList = () => {
  const classes = useStyles();
  const [commands] = useState(data);
  const [hubId, setHubId] = useState("");

  const handleChange= (newValue) =>{
    setHubId(newValue);
  }

  return (
    <Page
      className={classes.root}
      title="Commands"
    >
      <Container maxWidth={false}>
        <Toolbar value={hubId} onChange={handleChange}/>
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {commands.map((command) => (
              <Zoom in={hubId!=""}>
              <Grid
                item
                key={command.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard
                  className={classes.productCard}
                  product={{hubId:hubId,...command}}
                />
              </Grid>
              </Zoom>
             ))}
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

export default ProductList;
