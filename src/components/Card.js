import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  root: {
    maxWidth: 360,
    minHeight: 190,
    margin : 20,
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 0,
    position: "absolute",
    left: 10,

  },
  resTitle: {
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    marginTop: "20px"
  },
  info: {
    position: "absolute",
    left: 120,

  },
  cardContent: {
    textAlign: "justify",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    position: "absolute",
    top: 120,
  },
  divider: {
    marginBottom: 10,
    marginTop: 10
  }
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  let {name, formated_address, types, user_rating, featured_image} = props;

  return (
    <Card className={classes.root}>
    
      <CardActionArea>
        <div className={classes.resTitle}>
           <CardMedia 
              className={classes.picture}
              image = {featured_image ? featured_image : require(`../assets/ramen2.jpg`)}
              title="Ramen Picture"
              >

            </CardMedia>
            <div className={classes.info}>
                <Typography gutterBottom variant="body1" component="h5">{name}</Typography>
                <Rating name="read-only" value={parseFloat(user_rating)} size="small" readOnly />
                <Typography variant="body2" color="textSecondary" component="p">{formated_address}</Typography>
            </div>
        </div>

        <CardContent className={classes.cardContent}>
          <Typography variant="body2" color="textSecondary" component="p">
            Cuisine: {types}
          </Typography>
          <Divider className={classes.divider}/>
        </CardContent>
        
      </CardActionArea>
      
    </Card>
  );
}
