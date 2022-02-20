import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { Rating } from '@material-ui/lab';
import CardMedia from '@material-ui/core/CardMedia';

import PersonalReviewCard from './PersonalReviewCard';
import RatingModal from './RatingModal';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    top: 20,
    left: 20,
  },
  resTitle: {
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    left: 20,
  },
  picture: {
    minWidth: 100,
    height: 100,
    marginRight: 20,
  },
  accordionDetails: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    marginBottom: -20,
  },
}));

export default function RestaurantCard(props) {
  const classes = useStyles();
  let {name, formated_address, types, user_rating, featured_image, res_id, phone_numbers, source} = props;
  
  const [reviewerList, setReviewerList] = useState([]);
  
  const getReviewer = () => {   
    
    if(source !== "user"){
    const loadReviewerData = async () => {
      const API_URL = `https://developers.zomato.com/api/v2.1/reviews?res_id=${res_id}&apikey=aff013136b8a3ede3692be7ce8c1f98b`;
      
      console.log("saved restaurant id: " + res_id); //show which restaurant 
      
      if(res_id !== 0){
        const response = await fetch(API_URL);
        const data = await response.json().catch(res => console.log("error cannot use review id" + res));
        if(data){
          setReviewerList(data["user_reviews"]);
        }
      }
    };
      console.log("source: " + source);
    
      loadReviewerData();
    }
  };

  const addReviewer = (review) => {
      setReviewerList([...reviewerList, review]);
  };

  return (
      <Accordion className={classes.root}>
        <AccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
          onClick={getReviewer}
        >
            <div className={classes.resTitle}>
                <CardMedia 
                  className={classes.picture}
                  image = {featured_image ? featured_image : require(`../assets/ramen2.jpg`)}
                  title="Ramen Picture"
                  >

                </CardMedia>
                <div className={classes.info}>
                    <Typography gutterBottom variant="body1" component="h5">{name}</Typography>
                    <Rating name="read-only" value={reviewerList.length > 0 ?  (reviewerList.reduce(function(acc, obj){return (acc + obj.review.rating)}, 0)/reviewerList.length)  : parseFloat(user_rating)} size="small" readOnly />
                    <Typography variant="body2" color="textSecondary" component="p">{formated_address}</Typography>
                </div>
            </div>
        </AccordionSummary>

        <AccordionDetails className={classes.accordionDetails}>
            
            <Typography variant="body2" color="textSecondary" component="p">
              Cuisine: {types}
            </Typography>
            <br/>
            <div>
                <Typography gutterBottom variant="body2" component="p">*Cash Only *Cozy *Casual</Typography>
                <Typography gutterBottom variant="body2">Service Options: Take Away</Typography>
                <Typography gutterBottom variant="body2">Accessibility: No</Typography>
                <Typography gutterBottom variant="body2">Phone : {phone_numbers}</Typography>
            </div>
            <Typography gutterBottom variant="h6" component="h6">Reviews</Typography>
        
            <div className={classes.personalReviewGroup}>
             
              {reviewerList[0] ? reviewerList.map((index, id) => {  
                                
                        return (<div key={id}>
                                <PersonalReviewCard
                                    username = {index.review.user.name}
                                    profile_pic = {index.review.user.profile_image}
                                    rating = {index.review.rating}
                                    review_time = {index.review.review_time_friendly}
                                    rating_text = {index.review.rating_text}
                                    user_status = {index.review.user.foodie_level}
                                >

                                </PersonalReviewCard>
                                </div>);
                        }) : <div>No Reviews</div>
              }   
          </div>
        </AccordionDetails>

        <RatingModal addReviewer={addReviewer}></RatingModal>
      </Accordion>

  );
}
