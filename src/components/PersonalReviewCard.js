import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RatingStar from './RatingStar';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  root: {
    maxWidth: 360,
    margin : 5,
  },
  picture: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  resTitle: {
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    justifyContent: "space-around",
    marginTop: "20px"
  },
  cardContent: {
    textAlign: "justify",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  divider: {
    marginBottom: 10,
    marginTop: 10
  },
  titleText : {
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const {username, profile_pic,rating, review_time, rating_text, user_status} = props;

  return (
    <Card className={classes.root}>
    
      <CardActionArea>
        <div className={classes.resTitle}>
            <CardMedia className={classes.picture}
              image={profile_pic ? profile_pic : require('../assets/aankun.jpg')}
              title="User Review Card"
              >  
            </CardMedia>
            <div className={classes.titleText}>
            <Typography gutterBottom variant="body1" component="p">{username.substring(0, 15)}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">{user_status}</Typography>
            </div>
        </div>

        <CardContent className={classes.cardContent}>
          <RatingStar ratingValue={rating} time={review_time}></RatingStar>
          <Typography variant="body2" color="textSecondary" component="p">
            {rating_text}
          </Typography>
          
        </CardContent>
        
      </CardActionArea>
      
      
    </Card>
  );
}
