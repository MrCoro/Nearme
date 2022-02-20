import React from 'react';
import { Rating }from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  star: {
    
  },
  time: {

  },
});

export default function SimpleRating(props) {
  const classes = useStyles();
  const {time, ratingValue} = props;

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent"  className={classes.container} style={{display: "flex",  flexDirection: "row"}}>
        <Rating name="read-only" value={ratingValue} size="small" readOnly />
        <Typography variant="body2" color="textSecondary" component="p">{time}</Typography>
      </Box>
    </div>
  );
}