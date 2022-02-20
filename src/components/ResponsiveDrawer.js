import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MapContainer from './Maps';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import logo from '../assets/logo.png';
import RestaurantCard from './RestaurantCard';

const drawerWidth = 400;

//styling css
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#ffe900",
  },
  menuButton: {
    marginRight: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth,
    top: 70
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  customButton: {
    margin: 8,
    backgroundColor: 'white',
  },
  logo: {
    width: 200,
    height: 70,
    margin: 7,
    marginRight: 50,
  },
  rating: {
    marginTop:10,
    marginLeft: 20,
    width: 180,
    color: "black",
  },
  backButton : {
    marginBottom: -20,
    padding: 10,
    fontSize: 18,
  },
}));


//component drawer 
function ResponsiveDrawer(props) {
  const { window, latitude, longitude} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const [ restaurantList, setRestaurantList ] = useState([]);  //list of restaurant object
  const [temporaryRestaurantList, setTemporaryRestaurantList] = useState([]);

  const [ratingValue, setRatingValue] = React.useState([0, 5]); //rating filter button value
  
  const API_KEY = "aff013136b8a3ede3692be7ce8c1f98b";

  //change lat long from props & concat string
  useEffect(() => {
    const API_URL = `https://developers.zomato.com/api/v2.1/search?count=18&lat=1.330930&lon=103.739433&radius=1500&apikey=${API_KEY}`;
    const loadData = async () => {
      const response = await fetch(API_URL);
      const localData = await require("../assets/restaurant.json");
      const data = await response.json();
      setRestaurantList([...data.restaurants, ...localData.restaurants]);
      setTemporaryRestaurantList([...data.restaurants, ...localData.restaurants]);
    };
    loadData();

    
  }, []);

  const ratingChange = (event, newValue) => {
    console.log(newValue)
    setRatingValue(newValue);
    sortMax(newValue[0], newValue[1]);
  };

  const addRestaurant = (restaurant) => {
      setTemporaryRestaurantList([...temporaryRestaurantList, restaurant]);
      console.log(temporaryRestaurantList);
  };

// setRestaurantList(res.restaurants)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  
  const sortMax = (minVar, maxVar) => {
    const restaurantFilterRank = restaurantList.filter((restaurant) => parseFloat(restaurant.restaurant.user_rating.aggregate_rating) >= minVar && parseFloat(restaurant.restaurant.user_rating.aggregate_rating) <= maxVar);
    const restaurantFilterSort = restaurantFilterRank.sort((a, b) => (parseFloat(a.restaurant.user_rating.aggregate_rating) < parseFloat(b.restaurant.user_rating.aggregate_rating)) ? 1 : -1);
    setTemporaryRestaurantList(restaurantFilterSort);    
  };


  const container = window !== undefined ? () => window().document.body : undefined;

  return (

    <div className={classes.root}>
      <CssBaseline />
      
      <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <div style={{display: "flex", flexWrap:"wrap"}}>
                  <img className={classes.logo} src={logo} alt="Main Logo"/>

                  <div className={classes.rating}>
                      <Typography id="range-slider" gutterBottom> <b>Rating</b> </Typography>
                      
                      <Slider
                        value={ratingValue}
                        min={0.0}
                        max={5.0}
                        step={1.0}
                        onChange={ratingChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                      />
                  </div>
              </div>
            
          </Toolbar>
      </AppBar>
      
      <nav className={classes.drawer} aria-label="mailbox folders">

        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
           <div>
                  <List>
                      {temporaryRestaurantList.length > 0 ? temporaryRestaurantList.map((index, id) => {
                        
                        return (
                                <div key={id}
                                >
                                    <RestaurantCard
                                    name = {index.restaurant.name}
                                    formated_address = {index.restaurant.location.address}
                                    opening_hours = {index.restaurant.timings}
                                    types = {index.restaurant.cuisines}
                                    user_rating = {index.restaurant.user_rating.aggregate_rating}
                                    featured_image = {index.restaurant.featured_image}
                                    phone_numbers = {index.restaurant.phone_numbers}
                                    source={index.restaurant.deeplink}
                                    res_id = {index.restaurant.id}
                                    >
                                    </RestaurantCard>
                                    <br/>
                                </div>
                                );
                        }) : <div>No Restaurant</div>
                      }
                      <div style={{height: 100}}></div>
                  </List>
              </div>
          </Drawer>
        </Hidden>

        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
              <div>
                  <List>
                      {temporaryRestaurantList.length > 0 ? temporaryRestaurantList.map((index, id) => {
                        
                        return (
                                <div key={id}
                                >
                                    <RestaurantCard
                                    name = {index.restaurant.name}
                                    formated_address = {index.restaurant.location.address}
                                    opening_hours = {index.restaurant.timings}
                                    types = {index.restaurant.cuisines}
                                    user_rating = {index.restaurant.user_rating.aggregate_rating}
                                    featured_image = {index.restaurant.featured_image}
                                    phone_numbers = {index.restaurant.phone_numbers}
                                    source={index.restaurant.deeplink}
                                    res_id = {index.restaurant.id}
                                    >
                                    </RestaurantCard>
                                    <br/>
                                </div>
                                );
                        }) : <div>No Restaurant</div>
                      }
                      <div style={{height: 100}}></div>
                  </List>
              </div>
          </Drawer>
        </Hidden>
      
      </nav>

      <main className={classes.content}>

        <div className={classes.toolbar}/>

           <MapContainer addRestaurant={addRestaurant} latitude={latitude} longitude={longitude} restaurantList={temporaryRestaurantList}></MapContainer>
        
      </main>

    </div>
  );
}

export default ResponsiveDrawer;
