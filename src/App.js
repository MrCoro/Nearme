import React from 'react';
import './App.css';
import ResponsiveDrawer from './components/ResponsiveDrawer';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          latitude:0,
          longitude:0
        }
    
        this.showPosition = this.showPosition.bind(this); 

    }

    componentDidMount(){
          
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        } else { 
          console.log("Geolcation is not supported on your device");
        }
    }

    
    showPosition(position){
      this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude});
      console.log(`new Long Lat: ${this.state.latitude} ${this.state.longitude}`);
    }

    render(){
        return (
          <div className="App">
            <ResponsiveDrawer latitude={this.state.latitude} longitude={this.state.longitude}>
      
            </ResponsiveDrawer>
          </div>
        ); 
    }
}


export default App;
