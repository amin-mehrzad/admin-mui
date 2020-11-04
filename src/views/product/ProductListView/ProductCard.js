import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
  Modal,
  Backdrop,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  TextareaAutosize ,
  InputAdornment
} from '@material-ui/core';
// import AccessTimeIcon from '@material-ui/icons/AccessTime';
// import GetAppIcon from '@material-ui/icons/GetApp';
// import WarningIcon from '@material-ui/icons/Warning';
import ColorLensIcon from '@material-ui/icons/ColorLens';

import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '1225ch',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:'800px'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));


const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });


  Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
  };

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <Avatar
            alt="Product"
            src={product.media}
            variant="circle"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.title}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {product.description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            {/* <AccessTimeIcon
              className={classes.statsIcon}
              color="action"
            /> */}
            {/* <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              Updated 2hr ago
            </Typography> */}
            {/* <Button size="large" variant="contained" startIcon={<ColorLensIcon />} color="action" onClick={handleOpen}>{product.button}</Button> */}
            <Button size="large" variant="contained" color="action" onClick={handleOpen}>{product.button}</Button>
            <Modal
             // aria-labelledby="spring-modal-title"
           //  aria-describedby="spring-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  {/* <h2 id="spring-modal-title">Spring modal</h2>
                  <p id="spring-modal-description">react-spring animates me.</p> */}
                  <Box
                    mt={3}
                    display="flex"
                    justifyContent="center"
                  >
                    {/* <FormControl> */}
                      {/* <InputLabel htmlFor="outlined-multiline-static">Email address</InputLabel> */}
                      {/* <Input id="my-input" aria-describedby="my-helper-text" /> */}
                      <TextField
                        id="outlined-multiline-static"
                        //label='Set Status Command '
                        label='Command'
                        multiline
                        rows={1}
                        //defaultValue="Default Value"
                        variant="outlined"
                        fullWidth='true'
                        // helperText="Please enter code here and press submit button"
                        InputProps={{
                          startAdornment: <InputAdornment  >"msg" :</InputAdornment>,
                        }}                      />
                      {/* <FormHelperText id="my-helper-text">Please enter code here and press submit button</FormHelperText> */}
                    {/* </FormControl> */}
                    <Box
                    ml={1}
                    display="flex"
                    justifyContent="center"
                  >
                    <Button size="large" variant="contained"  color="primary" onClick={()=>alert('clicked')}>Submit</Button>

                  </Box>
                  </Box>
                </div>
              </Fade>
            </Modal>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            {/* <GetAppIcon
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {product.totalDownloads}
              {' '}
              Downloads
            </Typography> */}
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
