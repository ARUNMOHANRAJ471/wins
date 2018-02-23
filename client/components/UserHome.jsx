import React, {Component} from 'react';
import { Dropdown, Input, Menu, Grid, Button } from 'semantic-ui-react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, BicyclingLayer,Polyline } from "react-google-maps";
import MarkerComponent from './markerComponent.jsx';

let typeOptions = [{key:"places",text:"places",value:"places"},
{key:"persons",text:"persons",value:"persons"},
{key:"SME",text:"SME",value:"SME"},]
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
      icon={circleIcon}
    />

  </GoogleMap>
))

class App extends Component {
  constructor() {
    super();
    this.state = {
      contentForDestination:[],
      currentLocation:{}
    };
    this.updateContent = this.updateContent.bind(this);
  }
  updateContent(e, a) {
    let res = a.value;
    let context = this;
    $.ajax({
      url:"/updateContent",
      type:'POST',
      data: {
        typeOfDestination: res
      },
      success: function(data)
      {
        console.log(data);
        context.setState({contentForDestination:data});
      }.bind(this),
      error: function(err)
      {
        console.log('error occurred on AJAX');
      }.bind(this)
    });
  }
  componentWillMount() {
    let context = this;
    // console.log("navigator: ", navigator);
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let { latitude, longitude } = position.coords;
        currentLocation = {lat: latitude, lng: longitude};
        context.setState({currentLocation:{lat: latitude, lng: longitude}});
      });
      console.log(this.state.currentLocation);
    } else {
      console.log('not available');
    }
  }
  render() {
    let currentLocation = this.state.currentLocation;
    console.log("currentLocation: ",currentLocation);

      return (
        <div>
          <div><Input value="Your Location" fluid disabled/></div>
          <Menu>
            <Dropdown onChange={this.updateContent} icon='world' pointing className='link item' options={typeOptions} /><Dropdown selection fluid placeholder='your Destination' pointing className='link item' options={this.state.contentForDestination} />
          </Menu>
          <Button content='Go' primary style={{float:"right"}}/>
          <br /><br /><br />
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
                    zoom={17}
                  />
                </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

        );
  }
}
module.exports = App;
