import React, {Component} from 'react';
import { Grid, Card } from 'semantic-ui-react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, BicyclingLayer,Polyline } from "react-google-maps";
import MarkerComponent from './markerComponent.jsx';
import ReactDirectionRender from './reactDirectionRender.jsx';
import GoogleMapNavigation from './googleMapNavigation.jsx';

const locationDetails = {
  source:{},
  destination:{}
}
// icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
let blueIcon = {
  url:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
}

var circleIcon = {
    // path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    path:'M -1,0 A 1,1 0 0 0 1,0 1,1 0 0 0 -1,0, z',
    fillColor: 'green',
    fillOpacity: 15,
    scale: 2,
    strokeColor: 'red',
    strokeWeight: 14
  };
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    zoom={props.zoom}
    defaultCenter={props.currentLocation}
  >
    <MarkerComponent position={props.currentLocation} icon={circleIcon}  />
    {props.SMELocations.map((data, index) =>{
      let label = (index +1)+"";
      return  <MarkerComponent position={data} label={label} key={index} placeName={"Tower 17"} navigateTo={props.navigateTo}/>
    })}
  </GoogleMap>
))

export default class GoogleMapSME extends Component{
  constructor(props){
    super(props);
    this.state = {
      SMELocations:[
        { lat: 12.8377777, lng: 77.6564414 },  //tower 11
        { lat: 12.8377877, lng: 77.6574414  },
        { lat: 12.836461, lng:  77.656105 }
      ],
      currentLocation:{lat: 12.9715987, lng: 77.5945627},
      SMEView:true,
      navigateView:false,
      destination:{}
    }
    this.navigateTo = this.navigateTo.bind(this);
  }

  navigateTo(position,placeName){
    this.setState({
      SMEView:false,
      navigateView:true,
      destination:position,
      placeName:placeName
    });
  }
  render(){
    let SMELocations = this.state.SMELocations;
    let currentLocation = this.props.currentLocation;
    let destination = this.state.destination;
    let placeName = this.state.placeName;
    let { SMEView, navigateView } = this.state;
    return(
      <Grid>
      {SMEView ?
        <Grid.Row only='mobile'>
            <Grid.Column width={16} style={{marginBottom:"30%"}}>
              <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDWYd6MmYQML0hfPti_I1H3yP_NY_HvDQE&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `550px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                SMELocations = {SMELocations}
                currentLocation={currentLocation}
                navigateTo={this.navigateTo}
                zoom={18}
              />
            </Grid.Column>
        </Grid.Row>
      :' '}
      {navigateView ?
        <Grid.Row only='mobile'>
            <Grid.Column width={16} style={{}}>
               <GoogleMapNavigation source={currentLocation} destination={destination} placeName={placeName} />
             </Grid.Column>
         </Grid.Row>
         :' '}
    </Grid>
    );
  }
}
