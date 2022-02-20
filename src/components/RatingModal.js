import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root:{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
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
  },
  ratingInput: {
    margin: 15,
    width: 100
  }
}));

export default function RatingModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [tempFormValue, setTempFormValue] = React.useState({
                                                username: "",
                                                profile_image: "",
                                                rating: 0,
                                                review_time:"",
                                                rating_text:"",
                                                user_status: "",
                                            }); 

  function handleChange(e) {
      const value = e.target.value;
      setTempFormValue({
        ...tempFormValue,
        [e.target.name]: value,
      });
  }

  function handleSubmit(e){
      props.addReviewer({review: {
                            user: {name: tempFormValue.username, profile_image: "", foodie_level: tempFormValue.user_status},       
                            rating: parseFloat(tempFormValue.rating),
                            review_time_friendly: tempFormValue.rating_time,
                            rating_text:tempFormValue.rating_text,
                            id: Date.now().toString()      
                          }});
      
      handleClose();
      e.preventDefault();
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen} style={{margin: 20}}>
        Add New Review +
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
            <h2 id="transition-modal-title">Add New Review</h2>
                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Input name="username" onChange={handleChange} placeholder="Name" className={classes.input} inputProps={{ 'aria-label': 'description' }} />
                    <Input name="user_status" onChange={handleChange} placeholder="Occupation" className={classes.input} inputProps={{ 'aria-label': 'description' }} />
                    <Input name="rating_text" onChange={handleChange} placeholder="Comment" className={classes.input} inputProps={{ 'aria-label': 'description' }} />
                    <FormControl className={classes.ratingInput}>
                      <InputLabel htmlFor="age-native-simple">Rating</InputLabel>
                      <Select
                        native
                        value={tempFormValue.rating}
                        onChange={handleChange}
                        inputProps={{
                          name: 'rating',
                        }}
                      >
                        <option aria-label="None" value={0} />
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </Select>
                    </FormControl>
                    <input type="submit" value="Submit" className={classes.input} />
                </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
