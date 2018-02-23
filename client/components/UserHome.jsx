import React, {Component} from 'react';
import { Dropdown, Input, Menu, Grid, Button } from 'semantic-ui-react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, BicyclingLayer,Polyline } from "react-google-maps";
import MarkerComponent from './markerComponent.jsx';
import Cookies from 'universal-cookie';
import GoogleMapSME from './googleMapSME.jsx';
const cookies = new Cookies();
import GoogleMapNavigation from './googleMapNavigation.jsx';

let typeOptions = [
  {key:"places",text:"places",value:"places"},
  {key:"persons",text:"persons",value:"persons"},
  {key:"SME",text:"SME",value:"SME"}
];
var circleIcon = {
    // path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    path:'M -1,0 A 1,1 0 0 0 1,0 1,1 0 0 0 -1,0, z',
    fillColor: 'green',
    fillOpacity: 15,
    scale: 2,
    strokeColor: 'blue',
    strokeWeight: 14
  };
let currentLocation ={}
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    zoom={props.zoom}
    defaultCenter={props.currentLocation}
  >
    {/* <MarkerComponent position={currentLocation} /> */}
    <Marker
      position={props.currentLocation}
      // icon={circleIcon}
    />

  </GoogleMap>
))

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentLocation:{ lat: 12.8367416, lng: 77.6569854},
      contentForDestination: [],
      typeOfDestination: "",
      destinationValue: "",
      latitude: "",
      longitude: "",
      homeView:true,
      placesNavigationView:false,
      personsNavigationView: false,
      SMEView:false
    };
    this.getDestinationCoordinates = this.getDestinationCoordinates.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  componentWillMount() {
    let context = this;
    // console.log("navigator: ", navigator);
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let { latitude, longitude } = position.coords;
        currentLocation = {lat: latitude, lng: longitude};
        context.setState({currentLocation:{ lat: 12.8367416, lng: 77.6569854}});
      });
      // console.log(this.state.currentLocation);
    } else {
      console.log('not available');
    }
  }
  navigate(){
    if(this.state.typeOfDestination == 'SME') {
        this.setState({
          SMEView:true,
          placesNavigationView: false,
          personsNavigationView: false,
          homeView:false
        });
    } else if(this.state.typeOfDestination == 'places') {
      this.setState({
        SMEView: false,
        placesNavigationView: true,
        personsNavigationView: false,
        homeView: false
      });
    } else if(this.state.typeOfDestination == 'persons') {
      this.setState({
        SMEView: false,
        placesNavigationView: false,
        personsNavigationView: true,
        homeView: false
      });
    }
  }
  getLocation() {
    let context = this;
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let { latitude, longitude } = position.coords;
        // console.log("current location captured",latitude, longitude);
        context.setState({ latitude, longitude });
      });
    } else {
      console.log("not available");
    }
  }

  updateContent(e, a) {
    let res = a.value;
    let context = this;
    this.setState({ typeOfDestination: res });
    $.ajax({
      url:"/updateContent",
      type:'POST',
      data: { typeOfDestination: res },
      success: function(data) {
        // console.log(data);
        context.setState({contentForDestination: data});
      }.bind(this),
      error: function(err) {
        console.log('error occurred on AJAX');
      }.bind(this)
    });
  }

  getDestinationCoordinates() {
    let { typeOfDestination, destinationValue } = this.state;
    $.ajax({
      url: "/coordinates",
      type:'POST',
      data: {
        typeOfDestination: typeOfDestination,
        destinationValue: destinationValue
      },
      success: function(data) {
        // console.log(data);
      }.bind(this),
      error: function(err) {
        console.log('error occurred on AJAX');
      }.bind(this)
    });
  }

  render() {
    let currentLocation = this.state.currentLocation;
    // console.log("currentLocation: ",currentLocation);

    // console.log("cookies",cookies.get('type'));
    if(cookies.get('type')=='guest') {
      typeOptions = [
       {key:"places",text:"places",value:"places"},
       {key:"persons",text:"persons",value:"persons"}
     ];
    }

      return (
        <div>

            <div><Input value="Your Current Location" fluid disabled/></div>
            <Menu>
              <Dropdown onChange={this.updateContent} icon='world' pointing className='link item' options={typeOptions} />
              <Dropdown selection fluid placeholder='your Destination' pointing className='link item' options={this.state.contentForDestination} />
            </Menu>
            <Button fluid content='Go' primary style={{float:"right"}} onClick={this.navigate}/>
            <br /><br /><br />
            {this.state.homeView?
              <Grid>
              <Grid.Row only='mobile'>
                  <Grid.Column width={16} >
                    <MyMapComponent
                      isMarkerShown
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDWYd6MmYQML0hfPti_I1H3yP_NY_HvDQE&v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `550px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      currentLocation={currentLocation}
                      zoom={18}
                    />
                  </Grid.Column>
              </Grid.Row>
            </Grid>
            :' '}
            {this.state.SMEView ?
              <GoogleMapSME currentLocation={currentLocation}/>
              :' '}
            {this.state.placesNavigationView ?
              <GoogleMapNavigation source={currentLocation} destination={{ lat: 12.8377777, lng: 77.6564414 }} placeName={"Tower 11, EC, BDC"} />:' '
            }
            {this.state.personsNavigationView ?
              <GoogleMapNavigation source={currentLocation} destination={{  lat: 12.836461, lng:  77.656105 }} placeName={"Tower 11, EC, BDC"} />:' '
            }
        </div>
    );
  }
}
module.exports = App;
