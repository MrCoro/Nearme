import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  root:{
    display: "flex",
    flexDirection: "column",
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
  },
  input: {
    margin: 15
  }
}));

export default function RestaurantModal(props) {
  const classes = useStyles();
  
  //const [submitRestaurant, setSubmitRestaurant] = React.useState({});
  const [tempFormValue, setTempFormValue] = React.useState({
                                                resName: "",
                                                address: props.newAddress,
                                                cuisines: "",
                                                timings: "",
                                                lat: props.lat,
                                                lng: props.lng
                                            }); 
  
  function handleChange(e) {
      const value = e.target.value;
      setTempFormValue({
        ...tempFormValue,
        [e.target.name]: value
      });
  }

  function handleSubmit(e){
      props.addRestaurant({restaurant: {
                            location: {longitude: props.lng, latitude: props.lat, address: props.newAddress},
                            name: tempFormValue.resName,
                            timings: tempFormValue.timings,
                            cuisines: tempFormValue.cuisines,
                            user_rating: {aggregate_rating: "0"},
                            featured_image: "",
                            deeplink: "user",      
                          }});
      props.handleClose();
      e.preventDefault();
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open ? true : false}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >

        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add New Restaurant</h2>
                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Input name="resName" onChange={handleChange} placeholder="Restaurant Name" className={classes.input} inputProps={{ 'aria-label': 'description' }} />
                    <Input name="cuisines" onChange={handleChange} placeholder="Cuisine" className={classes.input} inputProps={{ 'aria-label': 'description' }} />
                    <Input name="timings" onChange={handleChange} placeholder="Opening Hours" className={classes.input} inputProps={{ 'aria-label': 'description' }} />
                    <Input name="address" disabled={true} placeholder={props.newAddress} className={classes.input} inputProps={{ 'aria-label': 'description' }} />
                    <Input name="lat" disabled={true} placeholder={String(props.lat)} className={classes.input} inputProps={{ 'aria-label': 'description' }} />
                    <Input name="lng" disabled={true} placeholder={String(props.lng)} className={classes.input} inputProps={{ 'aria-label': 'description' }} />
                    <input type="submit" value="Submit" className={classes.input}/>
                </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
