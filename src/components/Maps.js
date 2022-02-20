import React, {useEffect} from 'react';
import {Map, Marker} from 'pigeon-maps';
import RestaurantModal from './RestaurantModal';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import Overlay from 'pigeon-overlay';
import Card from '@material-ui/core/Card';
import {BrowserView, MobileView} from 'react-device-detect';

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    [theme.breakpoints.up('sm')]: {
      height: 0,
    }
  },
}));

export default function MapContainer(props){
  const classes = useStyles();
  const { restaurantList, latitude, longitude, addRestaurant} = props;
  const [showIndex, setShowIndex] = React.useState(-1);
  const [restaurantFormModalOpen, setRestaurantFormModalOpen] = React.useState(false); //openning modal state 
  const [newLatLng, setNewLatLng] = React.useState([-1, -1]); //latitude and longitude of map onclick
  const [newAddress, setNewAddress] = React.useState("");

  const [screenWidth, setScreenWidth] = React.useState(1360);
  const [screenHeight, setScreenHeight] = React.useState(768);

  const handleScreenChange = (e) => {
      setScreenHeight(window.screen.height);
      setScreenWidth(window.screen.width);
  };

  const mapTilerProvider = function(x, y, z, dpr) {
    return `https://api.maptiler.com/maps/streets/256/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png?key=XxPWB5tvBd4Mzp2yuX69`
  }  
  
  const handleRFMClose = () => {
    setRestaurantFormModalOpen(false);
  };
  
  const handleMapClick = async (event) => {
    setNewLatLng(event.latLng);
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${event.latLng[0]}&lon=${event.latLng[1]}`);
    const data = await response.json();
    setNewAddress(data.display_name);
    setRestaurantFormModalOpen(true);
  }
  
  useEffect(() => {
      console.log(`width: ${screenWidth} height: ${screenHeight}`);
      window.addEventListener("resize" , handleScreenChange);
      
      return _ => {window.removeEventListener("resize", handleScreenChange)}
  });
  return (
    <div className={classes.mapContainer}>
      <BrowserView>    
        <Map  center={[latitude !== 0 ? latitude : 1.304479, longitude !== 0 ? longitude : 103.843144] } zoom={13} width={screenWidth - 420} height={screenHeight - 240} provider={mapTilerProvider} onClick={handleMapClick}>
            <Marker color='green' anchor={[latitude !== 0 ? latitude : 1.304479, longitude !== 0 ? longitude : 103.843144] } payload={1} />

            <RestaurantModal addRestaurant={addRestaurant} newAddress={newAddress} restaurantList={restaurantList} open={restaurantFormModalOpen} handleClose={handleRFMClose} lat={newLatLng[0]} lng={newLatLng[1]}></RestaurantModal>
           
          {/* Markers */}
            {
              restaurantList.length > 0 ? restaurantList.map((index, id) => {
                return <Marker key={id} color='red' anchor={[parseFloat(index.restaurant.location.latitude), parseFloat(index.restaurant.location.longitude)]} payload={1} onClick={({ event, anchor, payload }) => {setShowIndex(id === showIndex ? -1 : id);}} />;
              }) : 0
            }
            
          
          {/* Overlay */}
           {
            restaurantList.length > 0 ? restaurantList.map((index, id) => {
              return( 
              <Overlay key = {id} anchor={[parseFloat(index.restaurant.location.latitude), parseFloat(index.restaurant.location.longitude)]} offset={[0, 0]}>
              <Card style={{display: id === showIndex ? "" : "none", maxWidth: 300}}>
                 <CardContent>
                   <span style={{display: "flex", marginBottom: 10}}>
                      <Typography variant="body2" color="textSecondary" component="p" style={{flex: 1}}>
                          {index.restaurant.name}
                      </Typography>
                      <button style={{flex: -1 }} onClick={() => {setShowIndex(id === showIndex ? -1 : id);}}>
                          X
                      </button>
                   </span>
                   <Divider style={{margin: 10}}/>
                     <span>
                          <Rating name="read-only" value={parseFloat(index.restaurant.user_rating.aggregate_rating)} size="small" readOnly />
                          <Typography variant="body2" color="textSecondary" component="p">{index.restaurant.location.address}</Typography>
                          <Typography variant="body2" color="textSecondary" component="p">{index.restaurant.timings}</Typography>
                      </span>                         
                  </CardContent>
                  </Card>                
             </Overlay>);
            }) : 0
            }

        </Map>
      </BrowserView>
      <MobileView>    
        <Map  center={[latitude !== 0 ? latitude : 1.304479, longitude !== 0 ? longitude : 103.843144] } zoom={13} width={screenWidth} height={screenHeight + 20} provider={mapTilerProvider} onClick={handleMapClick}>
            <Marker color='green' anchor={[latitude !== 0 ? latitude : 1.304479, longitude !== 0 ? longitude : 103.843144] } payload={1} />

            <RestaurantModal addRestaurant={addRestaurant} newAddress={newAddress} restaurantList={restaurantList} open={restaurantFormModalOpen} handleClose={handleRFMClose} lat={newLatLng[0]} lng={newLatLng[1]}></RestaurantModal>
           
          {/* Markers */}
            {
              restaurantList.length > 0 ? restaurantList.map((index, id) => {
                return <Marker key={id} color='red' anchor={[parseFloat(index.restaurant.location.latitude), parseFloat(index.restaurant.location.longitude)]} payload={1} onClick={({ event, anchor, payload }) => {setShowIndex(id === showIndex ? -1 : id);}} />;
              }) : 0
            }
            
          
          {/* Overlay */}
           {
            restaurantList.length > 0 ? restaurantList.map((index, id) => {
              return( 
              <Overlay key = {id} anchor={[parseFloat(index.restaurant.location.latitude), parseFloat(index.restaurant.location.longitude)]} offset={[0, 0]}>
              <Card style={{display: id === showIndex ? "" : "none", maxWidth: 300}}>
                 <CardContent>
                   <span style={{display: "flex", marginBottom: 10}}>
                      <Typography variant="body2" color="textSecondary" component="p" style={{flex: 1}}>
                          {index.restaurant.name}
                      </Typography>
                      <button style={{flex: -1 }} onClick={() => {setShowIndex(id === showIndex ? -1 : id);}}>
                          X
                      </button>
                   </span>
                   <Divider style={{margin: 10}}/>
                     <span>
                          <Rating name="read-only" value={parseFloat(index.restaurant.user_rating.aggregate_rating)} size="small" readOnly />
                          <Typography variant="body2" color="textSecondary" component="p">{index.restaurant.location.address}</Typography>
                          <Typography variant="body2" color="textSecondary" component="p">{index.restaurant.timings}</Typography>
                      </span>                         
                  </CardContent>
                  </Card>                
             </Overlay>);
            }) : 0
            }

        </Map>
      </MobileView>

    </div>
  );

}
 
