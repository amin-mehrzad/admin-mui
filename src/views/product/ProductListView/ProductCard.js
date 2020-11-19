import React, {
  useState,
  // useEffect
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  // Avatar,
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
  // FormControl,
  // InputLabel,
  // Input,
  // FormHelperText,
  TextField,
  // TextareaAutosize,
  InputAdornment,
  IconButton,
  Collapse,
  // Hidden
  // OutlinedInput
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

// import AccessTimeIcon from '@material-ui/icons/AccessTime';
// import GetAppIcon from '@material-ui/icons/GetApp';
// import WarningIcon from '@material-ui/icons/Warning';
//import ColorLensIcon from '@material-ui/icons/ColorLens';

import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support


import axios from 'axios'

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
    width: '800px'
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

  const [open, setOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [commandData, setCommandData] = useState({
    openColor: '',
    closeColor: '',
    sensorId: '',
    eventSensorId: '',
    delay: '',
    repeat: '',
    rate: '',
    color1: '',
    color2: ''

  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    // console.log(event.target.value)
    setCommand(event.target.value);
  };

  const handleChangeCommand = event => {
    // console.log(event.target.value)
    var name = event.target.name;

    setCommandData({
      ...commandData,
      [name]: event.target.value
    })
  };

  const handleSubmit = async () => {
    var commandString
    switch (product.commandType) {
      case 1:
        commandString = `Set Status ${commandData.sensorId} Open ${commandData.openColor} Closed ${commandData.closeColor}`
        break
      case 2:
        commandString = `Clear Notif`
        break
      case 3:
        commandString = `Clear ID`
        break
      case 4:
        commandString = `Set Event ${commandData.eventSensorId} @${commandData.delay}${commandData.repeat !== "" ? ` Rpt ${commandData.repeat}` : ""}${commandData.rate !== "" ? ` Rate ${commandData.rate}` : ""}${commandData.color1 !== "" ? ` Color1 ${commandData.color1}` : ""}${commandData.color2 !== "" ? ` Color2 ${commandData.color2}` : ""}`
        break
      case 5:
        commandString = `Report`
        break
      default:
        commandString = command
    }

    console.log(commandString)
    const result = await axios({
      method: 'post',
      url: `http://${process.env.REACT_APP_SERVER_URI}/api/commands`,
      data: {
        command: commandString,
        commandType: product.commandType,
        hubId: product.hubId
      },
      headers: { "Access-Control-Allow-Origin": "*" }
    })
    console.log(result)
    if (result.status === 200) {
      setSuccess(true)
      setError(false)
      if (product.commandType === 5)
        window.open(`http://${process.env.REACT_APP_SERVER_URI}/api/diagnostics/${product.hubId}`, "_blank");
    }
    else {
      setSuccess(false)
      setError(true)
    }

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
          mt={2}

        >
          {/* <Avatar
            alt="Product"
            // src={product.media}
            variant="circle"> */}
          {product.media}
          {/* </Avatar> */}
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
            <Button size="large" variant="contained" color="default" onClick={product.commandType===5?handleSubmit:handleOpen} disabled={(product.hubId === "")}>{product.button}</Button>
            <Fade in={open}>

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
                <div className={classes.paper}>
                  {/* <h2 id="spring-modal-title">Spring modal</h2>
                  <p id="spring-modal-description">react-spring animates me.</p> */}
                  {product.commandType===6 ? <Box
                    mt={3}
                    mb={1}
                    display="flex"
                    justifyContent="center"
                  >
                    {/* <FormControl> */}
                    {/* <InputLabel htmlFor="outlined-multiline-static">Email address</InputLabel> */}
                    {/* <Input id="my-input" aria-describedby="my-helper-text" /> */}
                    <TextField
                      id="outlined-multiline-static"
                      //label='Set Status Command '
                      value={command}
                      label='Command'
                      multiline
                      rows={10}
                      //rows={1}
                      //defaultValue="Default Value"
                      variant="outlined"
                      fullWidth={true}
                      // helperText="Please enter code here and press submit button"
                      InputProps={{
                        startAdornment: <InputAdornment  >{`"${product.commandKey}" : `}</InputAdornment>,
                      }}
                      onChange={handleChange}
                    // placeholder="Search product"

                    />
                    {/* <FormHelperText id="my-helper-text">Please enter code here and press submit button</FormHelperText> */}
                    {/* </FormControl> */}
                    <Box
                      ml={1}
                     // display="flex"
                      justifyContent="center"
                    >
                      <Button size="large" variant="contained" color="primary" onClick={handleSubmit} >Submit</Button>

                    </Box>

                  </Box> : null}
                  {product.commandType === 1 ? <Box
                    mt={3}
                    mb={1}
                    //  display="flex"
                    justifyContent="center"
                  >
                    <Grid container spacing={3}>
                      {/* <InputLabel htmlFor="my-input" >Email address</InputLabel>
                    <OutlinedInput  id="my-input" aria-describedby="my-helper-text"  variant="outlined" /> */}

                      <Grid item xs={12}>
                        <Typography style={{ marginButtom: '10px' }}>Please enter sensor ID:</Typography>

                        <TextField
                          id="sensorId"
                          name="sensorId"
                          //label='Set Status Command '
                          value={commandData.sensorId}
                          label='Sensor ID'
                          multiline
                          rows={1}
                          //defaultValue="Default Value"
                          variant="outlined"
                          fullWidth={true}
                          // helperText="Please enter code here and press submit button"
                          // InputProps={{
                          //   startAdornment: <InputAdornment  >{`"${product.commandKey}" : `}</InputAdornment>,
                          // }}
                          onChange={handleChangeCommand}
                          placeholder="00"

                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography mb={1}>Please enter color value in RRGGBB hex format:</Typography>

                        <TextField
                          id="openColor"
                          name="openColor"
                          //label='Set Status Command '
                          value={commandData.openColor}
                          label='Open Color'
                          multiline
                          rows={1}
                          //defaultValue="Default Value"
                          variant="outlined"
                          fullWidth={true}
                          // helperText="Please enter code here and press submit button"
                          // InputProps={{
                          //   startAdornment: <InputAdornment  >{`"${product.commandKey}" : `}</InputAdornment>,
                          // }}
                          onChange={handleChangeCommand}
                          placeholder="00FE10"

                        />
                      </Grid>
                      <Grid item xs={12}>

                        <TextField
                          id="closeColor"
                          name="closeColor"
                          //label='Set Status Command '
                          value={commandData.closeColor}
                          label='Close Color'
                          multiline
                          rows={1}
                          //defaultValue="Default Value"
                          variant="outlined"
                          fullWidth={true}
                          // helperText="Please enter code here and press submit button"
                          // InputProps={{
                          //   startAdornment: <InputAdornment  >{`"${product.commandKey}" : `}</InputAdornment>,
                          // }}
                          onChange={handleChangeCommand}
                          placeholder="FF051A"
                        // mt={2}

                        />
                        {/* <FormHelperText id="my-helper-text">Please enter value in RRGGBB HEX format.</FormHelperText> */}

                      </Grid>
                      {/* </Grid> */}
                      {/* <Grid container> */}
                      <Grid item xs={12}>
                        {/* <Box
                        ml={1}
                        // mt={'50%'}
                        display="flex"
                        justifyContent="center"
                      > */}
                        <Button size="large" variant="contained" color="primary" onClick={handleSubmit} >Submit</Button>
                        {/* </Box> */}


                      </Grid>

                    </Grid>
                  </Box> : null}

                  {product.commandType === 2 ? <Box
                    mt={3}
                    mb={1}
                    justifyContent="center"
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant='h4'>Do You Want To Clear Notifications?</Typography>
                      </Grid>
                      <Grid item xs={12} >
                        <Box
                          ml={1}
                          display="flex"
                          justifyContent="center"
                        >
                          <Button size="large" variant="contained" color="primary" onClick={handleSubmit} style={{ marginRight: '70px' }}>Clear</Button>
                          <Button size="large" variant="contained" color="primary" onClick={handleClose} style={{ marginLeft: '70px' }}>Cancel</Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box> : null}

                  {product.commandType === 3 ? <Box
                    mt={3}
                    mb={1}
                    justifyContent="center"
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant='h4'>Do You Want To Clear IDs?</Typography>
                      </Grid>
                      <Grid item xs={12} >
                        <Box
                          ml={1}
                          display="flex"
                          justifyContent="center"
                        >
                          <Button size="large" variant="contained" color="primary" onClick={handleSubmit} style={{ marginRight: '70px' }}>Clear</Button>
                          <Button size="large" variant="contained" color="primary" onClick={handleClose} style={{ marginLeft: '70px' }}>Cancel</Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box> : null}
                  {product.commandType === 4 ? <Box
                    mt={3}
                    mb={1}
                    //  display="flex"
                    justifyContent="center"
                  >
                    <Grid container spacing={3}>
                      {/* <InputLabel htmlFor="my-input" >Email address</InputLabel>
                    <OutlinedInput  id="my-input" aria-describedby="my-helper-text"  variant="outlined" /> */}

                      <Grid item xs={12}>
                        <Typography style={{ marginButtom: '10px' }}>Please enter sensor ID:</Typography>

                        <TextField
                          style={{ marginTop: '10px' }}
                          id="eventSensorId"
                          name="eventSensorId"
                          //label='Set Status Command '
                          value={commandData.eventSensorId}
                          label='Sensor ID'
                          multiline
                          rows={1}
                          //defaultValue="Default Value"
                          variant="outlined"
                          fullWidth={true}
                          // helperText="Please enter code here and press submit button"
                          // InputProps={{
                          //   startAdornment: <InputAdornment  >{`"${product.commandKey}" : `}</InputAdornment>,
                          // }}
                          onChange={handleChangeCommand}
                          placeholder="00"

                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography style={{ marginButtom: '10px' }}>Please enter seconds of delay in hex format:</Typography>

                        <TextField
                          style={{ marginTop: '10px' }}
                          id="delay"
                          name="delay"
                          //label='Set Status Command '
                          value={commandData.delay}
                          label='Delay'
                          multiline
                          rows={1}
                          //defaultValue="Default Value"
                          variant="outlined"
                          fullWidth={true}
                          // helperText="Please enter code here and press submit button"
                          // InputProps={{
                          //   startAdornment: <InputAdornment  >{`"${product.commandKey}" : `}</InputAdornment>,
                          // }}
                          onChange={handleChangeCommand}
                          placeholder="000001"

                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography style={{ marginButtom: '10px' }}>Please enter number of repeat:</Typography>

                        <TextField
                          style={{ marginTop: '10px' }}
                          id="repeat"
                          name="repeat"
                          //label='Set Status Command '
                          value={commandData.repeat}
                          label='Repeat'
                          multiline
                          rows={1}
                          //defaultValue="Default Value"
                          variant="outlined"
                          fullWidth={true}
                          // helperText="Please enter code here and press submit button"
                          // InputProps={{
                          //   startAdornment: <InputAdornment  >{`"${product.commandKey}" : `}</InputAdornment>,
                          // }}
                          onChange={handleChangeCommand}
                          placeholder="3"

                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>Please enter rate in miliseconds:</Typography>

                        <TextField
                          style={{ marginTop: '10px' }}
                          id="rate"
                          name="rate"
                          //label='Set Status Command '
                          value={commandData.rate}
                          label='Rate'
                          multiline
                          rows={1}
                          //defaultValue="Default Value"
                          variant="outlined"
                          fullWidth={true}
                          // helperText="Please enter code here and press submit button"
                          // InputProps={{
                          //   startAdornment: <InputAdornment  >{`"${product.commandKey}" : `}</InputAdornment>,
                          // }}
                          onChange={handleChangeCommand}
                          placeholder="3"

                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography style={{ marginButtom: '10px' }}>Please enter color value in RRGGBB hex format:</Typography>

                        <TextField
                          style={{ marginTop: '10px' }}
                          id="color1"
                          name="color1"
                          //label='Set Status Command '
                          value={commandData.color1}
                          label='Color 1'
                          multiline
                          rows={1}
                          //defaultValue="Default Value"
                          variant="outlined"
                          fullWidth={true}
                          // helperText="Please enter code here and press submit button"
                          // InputProps={{
                          //   startAdornment: <InputAdornment  >{`"${product.commandKey}" : `}</InputAdornment>,
                          // }}
                          onChange={handleChangeCommand}
                          placeholder="00FE10"

                        />
                      </Grid>
                      <Grid item xs={12}>

                        <TextField
                          style={{ marginTop: '10px' }}
                          id="color2"
                          name="color2"
                          //label='Set Status Command '
                          value={commandData.color2}
                          label='Color 2'
                          multiline
                          rows={1}
                          //defaultValue="Default Value"
                          variant="outlined"
                          fullWidth={true}
                          // helperText="Please enter code here and press submit button"
                          // InputProps={{
                          //   startAdornment: <InputAdornment  >{`"${product.commandKey}" : `}</InputAdornment>,
                          // }}
                          onChange={handleChangeCommand}
                          placeholder="FF051A"
                        // mt={2}

                        />
                        {/* <FormHelperText id="my-helper-text">Please enter value in RRGGBB HEX format.</FormHelperText> */}

                      </Grid>
                      {/* </Grid> */}
                      {/* <Grid container> */}
                      <Grid item xs={12}>
                        {/* <Box
                        ml={1}
                        // mt={'50%'}
                        display="flex"
                        justifyContent="center"
                      > */}
                        <Button size="large" variant="contained" color="primary" onClick={handleSubmit} >Submit</Button>
                        {/* </Box> */}


                      </Grid>

                    </Grid>
                  </Box> : null}

                  <Collapse in={success}>
                    <Alert
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setSuccess(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                    >
                      Command Sent Successfully.
                    </Alert>
                  </Collapse>
                  <Collapse in={error}>
                    <Alert
                      severity="error"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setError(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                    >
                      Sending Command Failed.
                    </Alert>
                  </Collapse>
                </div>
              </Modal>
            </Fade>

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
